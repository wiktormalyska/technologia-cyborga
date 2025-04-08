// hooks/useChat.ts
import { useEffect, useRef, useState } from "react";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const abortController = useRef<AbortController | null>(null);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setIsLoading(true);

        abortController.current = new AbortController();

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    messages: [...messages, newMessage],
                }),
                signal: abortController.current.signal,
            });

            if (!response.ok) {
                throw new Error("Błąd sieci");
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error("Brak streama odpowiedzi");

            let assistantMessage: Message = {
                id: Date.now().toString() + "-assistant",
                role: "assistant",
                content: "",
            };

            setMessages((prev) => [...prev, assistantMessage]);

            const decoder = new TextDecoder("utf-8");
            let done = false;

            while (!done) {
                const { value, done: streamDone } = await reader.read();
                done = streamDone;

                const chunk = decoder.decode(value, { stream: true });

                assistantMessage = {
                    ...assistantMessage,
                    content: assistantMessage.content + chunk,
                };

                setMessages((prev) =>
                    prev.map((m) => (m.id === assistantMessage.id ? assistantMessage : m))
                );
            }
        } catch (err: any) {
            if (err.name !== "AbortError") {
                console.error("Błąd czatu:", err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const stop = () => {
        if (abortController.current) {
            abortController.current.abort();
            setIsLoading(false);
        }
    };

    return {
        messages,
        input,
        setInput,
        sendMessage,
        stop,
        isLoading,
    };
};

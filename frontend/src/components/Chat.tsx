import { useState } from "react";

export const Chat = ({ onClose }: { onClose: () => void }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (input.trim() !== "") {
            setMessages([...messages, input]);
            setInput("");
        }
    };

    return (
        <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h2 className="text-lg font-bold">Chat</h2>
                <button onClick={onClose} className="text-red-500 font-bold">X</button>
            </div>
            <div className="flex flex-col gap-2 overflow-auto h-40 p-2 bg-gray-100 rounded">
                {messages.map((msg, index) => (
                    <div key={index} className="p-2 bg-blue-300 rounded-md self-end">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="mt-2 flex">
                <input
                    className="flex-1 border p-1 rounded-l"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-3 rounded-r">
                    Send
                </button>
            </div>
        </div>
    );
};

import {useEffect, useState} from "react";
import { FaArrowLeft, FaEllipsisV, FaPaperclip, FaSmile, FaEye, FaBan, FaPalette, FaVolumeUp } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";
import {useGetUserById} from "../hooks/useUsers";
import {useSendMessage} from "../hooks/useChats";

export const Chat = ({ onClose, chatData }: { onClose: () => void; chatData: any}) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);

    const {decodedToken} = useAuth();
    const currentUserID = decodedToken.userID;

    const {mutate: getUserByID, data: recipientData, isPending: isRecipientPending} = useGetUserById();

    const {mutate: sendChatMessage} = useSendMessage();

    const [recipientUsername, setRecipientUsername] = useState<string | null>(null);

    useEffect(() => {
        if (chatData) {
            console.log("AAAAAAAAAAA" + chatData);
            const recipientUserId =
                chatData.user1 === currentUserID
                    ? chatData.user2
                    : chatData.user1;

            getUserByID({param: recipientUserId.toString()});

            console.log("user1", chatData.user1);
            console.log("user2", chatData.user2);
            console.log("messages", chatData.messages);
            setMessages(chatData.messages);
        }
    }, [chatData, currentUserID, getUserByID]);

    useEffect(() => {
        if (recipientData) {
            setRecipientUsername(recipientData.username);
        }
    }, [recipientData]);


    const sendMessage = () => {
        if (input.trim() !== "") {
            // setInput("");

            sendChatMessage(
                {
                    param: chatData.id,
                    body: {
                        content: input.trim(),
                        sender: currentUserID
                    }
                },
                {
                    onSuccess: () => {
                        setInput("");
                    },
                    onError: (error) => {
                        console.error("Failed to send message:", error);
                    }
                }
            )
        }
    };
    const emojis = ["😳", "😜", "🤯", "🤤", "😩", "💀"];
    const addEmojiToInput = (emoji: string) => {
        setInput(prevInput => prevInput + emoji);
        setIsEmojiOpen(false);
    };
    const EmojiPanel = () => (
        <div className="fixed bottom-4 left-0 w-full bg-secondary rounded-lg p-2 shadow-lg mx-2">
            <div className="flex flex-wrap gap-2 justify-center">
                {emojis.map((emoji, index) => (
                    <div
                        key={index}
                        className="text-2xl bg-secondary/90 rounded-2xl p-1
                        text-text flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-primary/30"
                        onClick={() => addEmojiToInput(emoji)}
                    >
                        {emoji}
                    </div>
                ))}
            </div>
        </div>
    );

    const ChatOptionsMenu = () => {
        const menuItems = [
            {icon: FaEye, text: "View profile" },
            { icon: FaVolumeUp, text: "Mute" },
            { icon: FaPalette, text: "Change theme" },
            { icon: FaBan, text: "Block", className: "text-red-500" }
        ];

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-background w-64 rounded-lg shadow-xl">
                    <div className="text-center py-3 border-b-4 border-secondary/30">
                        <span className="text-text font-bold">OPTIONS</span>
                    </div>
                    <div className="py-2">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center px-4 py-3 hover:bg-secondary/20 cursor-pointer"
                                onClick={() => setIsOptionsOpen(false)}
                            >
                                <item.icon className={`mr-3 text-text ${item.className || ''}`} />
                                <span className="text-text">{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <div
                        className="text-center py-3 border-t-4 border-secondary/30 cursor-pointer hover:bg-secondary/20"
                        onClick={() => setIsOptionsOpen(false)}
                    >
                        <span className="text-text">BACK</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* Chat container */}
            <div className="w-full max-w-md h-[70vh] flex flex-col bg-background rounded-lg shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-secondary border-b border-secondary">
                    <button onClick={onClose} className="text-xl text-text">
                        <FaArrowLeft />
                    </button>
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-text">
                            {isRecipientPending ? "Loading..." : recipientUsername || "User"}
                        </h2>
                        <p className="text-xs text-text/70">Online</p>
                    </div>
                    <button
                        className="text-xl text-text"
                        onClick={() => setIsOptionsOpen(true)}
                    >
                        <FaEllipsisV />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
                    {messages.map((message) => {
                        const sentByCurrentUser = message.sender === currentUserID;

                        return (
                            <div
                                key={message.id}
                                className={`p-3 text-gray-800 rounded-lg max-w-[80%] border-4 border-secondary ${
                                    sentByCurrentUser ? `bg-white ml-auto` : 'bg-gray-300'
                                }`}
                            >
                                <p className="text-sm">{message.content}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-secondary border-t">
                    <div className="flex items-center gap-2">
                        <button
                            className="text-xl text-text"
                            onClick={() => setIsEmojiOpen(!isEmojiOpen)}
                        >
                            <FaSmile/>
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-2 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button className="text-xl text-text">
                            <FaPaperclip />
                        </button>
                    </div>
                    {isEmojiOpen && <EmojiPanel />}
                </div>
            </div>

            {/* Options Menu */}
            {isOptionsOpen && <ChatOptionsMenu />}
        </div>
    );
};
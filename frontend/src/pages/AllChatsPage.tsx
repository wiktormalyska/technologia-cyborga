import {BasePage} from "../components/BasePage";
import {FaMessage} from "react-icons/fa6";
import {FaSearch} from "react-icons/fa";
import {userDto} from "../values/dto/userDto";
import {useFindUserByUsername} from "../hooks/useUsers";
import {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthContext";
import {useNavigate} from "react-router-dom";
import {Chat} from "../components/Chat";
import {useCreateChat, useGetRecipientsByUserId} from "../hooks/useChats";

export const AllChatsPage = () => {
    const [findValue, setFindValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [foundRecipients, setFoundRecipients] = useState<userDto[]>([]);
    const [userCount, setUserCount] = useState(0);

    const [isChatOpen, setIsChatOpen] = useState(false);

    const {decodedToken} = useAuth();
    const currentUserID = decodedToken.userID;

    const navigate = useNavigate();

    const {
        mutate: findUsers,
        data: foundUsers,
        isPending: findingUsers,
        error: findingUsersError
    } = useFindUserByUsername()

    const {
        mutate: getRecipients,
        data: recipients,
        isPending: loadingRecipients,
        error: recipientsError
    } = useGetRecipientsByUserId()

    const {
        mutate: createChat,
        data: chatData
    } = useCreateChat()

    const handleCreateChat = (otherUserId: number) => {
        if (!currentUserID) return;

        createChat({
            body: {
                user1Id: currentUserID,
                user2Id: otherUserId
            }
        }, {
            onSuccess: () => {
                console.log("Created chat");
                setIsChatOpen(true);
            },
            onError: (err) => {
                console.error("Error creating chat:", err);
            }
        });
    }

    useEffect(() => {
        getRecipients({param: decodedToken.userID.toString()})
    }, [decodedToken, getRecipients]);

    useEffect(() => {
        if (recipients) {
            console.log("Recipients:", recipients);
            setUserCount(recipients.length);
        }
    }, [recipients])

    useEffect(() => {
        if (foundRecipients) {
            setUserCount(foundRecipients.length);
        }
    }, [foundRecipients]);

    useEffect(() => {
        if (isSearching && foundUsers && recipients) {
            const users: userDto[] = foundUsers;
            let recipientList: userDto[] = recipients;

            recipientList = recipientList.filter((recipient) => (
                !(recipient.id === currentUserID))
            );

            const foundRecipients = recipientList.filter(recipient =>
                users.some(user => recipient.id === user.id)
            );

            setFoundRecipients(foundRecipients);
        }
    }, [isSearching, foundUsers, recipients, currentUserID]);

    const onFindUser = () => {
        if (!findValue) return;
        setIsSearching(true);
        findUsers({param: findValue});
    }

    const openUserPage = (userId: number) => {
        console.log(userId)
        navigate(`/account/${userId}`);
    }

    const renderUser = (user: userDto) => {
        console.log(user)
        return (
            <div
                key={user.id}
                className="flex items-center gap-4 bg-primary/10 rounded-full p-3 hover:bg-primary/20 transition-all duration-200"
                onClick={() => openUserPage(user.id)}
            >
                <img alt={user.username} src={user.profileImagePath} className="w-12 h-12 rounded-full"/>
                <div className="text-white text-sm">{user.username}</div>

                <button type="button"
                    className="bg-primary/20 hover:bg-primary/30 text-text h-10 w-10 flex ml-auto hover:cursor-pointer justify-center items-center rounded-full transition-all duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCreateChat(user.id);
                    }}
                >
                    <FaMessage/>
                </button>
            </div>
        )
    }

    const showFoundUsers = () => {
        if (!foundUsers) return <p className="text-gray-400">No user found.</p>;
        if (findingUsers) return <p className="text-primary/70">Searching...</p>;
        if (findingUsersError) return <p className="text-red-600">Error searching for a user.</p>;

        return (
            <>
                {foundRecipients.map((recipient) => (
                    renderUser(recipient)
                ))}
            </>
        );
    };

    const showChatList = () => {
        if (loadingRecipients) return <p className="text-primary/70">Loading chats...</p>;
        if (recipientsError) return <p className="text-red-600">Error loading chats.</p>;
        if (!recipients || recipients.length === 0) return <p className="text-gray-400">No chats started.</p>;

        let recipientList: userDto[] = recipients;

        recipientList = recipientList.filter((recipient) => (
            !(recipient.id === currentUserID))
        );

        return (
            <>
                {recipientList.map((recipient) => (
                    renderUser(recipient)
                ))}
            </>
        );
    };

    return (
        <BasePage title={"Chats"} justifyContent={"flex-start"} className={"pl-5 pr-5 pt-5"}>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row gap-2 items-center">
                    <input
                        type="text"
                        onChange={(e) => setFindValue(e.target.value)}
                        className="bg-primary/20 text-white flex-1 p-3 pl-4 pr-4 rounded-full focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                        placeholder="Search for a user"
                    />
                    <button
                        type="button"
                        className="bg-primary/20 text-white hover:bg-primary/30 hover:cursor-pointer h-full w-12 flex justify-center items-center rounded-full transition-all duration-200"
                        onClick={onFindUser}
                    >
                        <FaSearch size={20}/>
                    </button>
                </div>

                <div className="pt-3">
                    <h2 className="text-2xl font-semibold text-white mb-3">
                        {isSearching ? "Search Results" : "Active Chats"}
                    </h2>
                    <div className={`max-h-[56vh] ${
                        userCount > 6
                            ? "overflow-y-auto pr-5 scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-primary/10 scrollbar-track-rounded-full"
                            : ""
                        }`}
                    >
                        <div className="flex flex-col gap-4">
                            {isSearching ? showFoundUsers() : showChatList()}
                        </div>
                    </div>
                </div>
            </div>
            {isChatOpen && chatData !== null && (
                <Chat onClose={() => {
                    setIsChatOpen(false);
                }}
                chatData={chatData}
                />
            )}
        </BasePage>
    )
};
import {BasePage} from "../components/BasePage";
import {FaMessage} from "react-icons/fa6";
import {FaSearch} from "react-icons/fa";
import {userDto} from "../values/dto/userDto";
import {useFindUserByUsername} from "../hooks/useUsers";
import {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthContext";
import {useNavigate} from "react-router-dom";
import {FriendListValueDto} from "../values/dto/friendListValueDto";
import {useGetFriends} from "../hooks/useFriends";
import {FriendListDto} from "../values/dto/friendListDto";
import {Chat} from "../components/Chat";
import {useCreateChat} from "../hooks/useChats";

export const AllChatsPage = () => {
    const [findValue, setFindValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [friendsList, setFriendsList] = useState<FriendListValueDto[]>([])
    const [pendingFriendRequests, setPendingFriendRequests] = useState<FriendListValueDto[]>([])
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<FriendListValueDto[]>([])

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
        mutate: getFriends,
        data: friends,
        isPending: loadingFriends,
        error: friendsError
    } = useGetFriends()

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
                console.log("Created chat:", chatData);
            },
            onError: (err) => {
                console.error("Error creating chat:", err);
            }
        });
    }

    useEffect(() => {
        getFriends({param: decodedToken.userID.toString()});
    }, [decodedToken, getFriends])

    useEffect(() => {
        let friendListDto: FriendListDto = friends;

        if (!friendListDto) return;
        if (friendListDto.acceptedInvites !== undefined && friendListDto.sentPendingInvites !== undefined && friendListDto.receivedPendingInvites !== undefined) {
            console.log(friendListDto);
            setFriendsList(friendListDto.acceptedInvites);
            setPendingFriendRequests(friendListDto.sentPendingInvites);
            setReceivedFriendRequests(friendListDto.receivedPendingInvites);
        }
    }, [friends])


    const onFindUser = () => {
        if (!findValue) return;
        setIsSearching(true);
        findUsers({param: findValue});
    }

    const openUserPage = (userId: number) => {
        console.log(userId)
        navigate(`/account/${userId}`);
    }

    const renderUser = (friend: FriendListValueDto) => {
        console.log(friend)
        return (
            <div
                key={friend.userId}
                className="flex items-center gap-4 bg-primary/10 rounded-full p-3 hover:bg-primary/20 transition-all duration-200"
                onClick={() => openUserPage(friend.userId)}
            >
                <img alt={friend.username} src={friend.profileImagePath} className="w-12 h-12 rounded-full"/>
                <div className="text-white text-sm">{friend.username}</div>

                <button type="button"
                    className="bg-primary/20 hover:bg-primary/30 text-text h-10 w-10 flex ml-auto hover:cursor-pointer justify-center items-center rounded-full transition-all duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCreateChat(friend.userId);
                        setIsChatOpen(true);
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
        if (findingUsersError) return <p className="text-red-600">Error searching for an user.</p>;

        const isAlreadyFriendOrPending = (userId: number): boolean => {
            if (!friends) return false;

            return [...friendsList, ...pendingFriendRequests, ...receivedFriendRequests]
                .some(friend => friend.userId === userId);
        };

        let users: userDto[] = foundUsers;
        users = users.filter(user =>
            user.id !== currentUserID && !isAlreadyFriendOrPending(user.id)
        );

        return users.map(user => (
            <div key={user.id}
                 className="flex items-center gap-4 bg-primary/10 rounded-full p-3 hover:bg-primary/20 transition-all duration-200">
                <img alt={user.username} src={user.profileImagePath} className="w-12 h-12 rounded-full"/>
                <div className="text-white text-sm">{user.username}</div>
            </div>
        ));
    };

    const showFriendList = () => {
        if (loadingFriends) return <p className="text-primary/70">Loading friends...</p>;
        if (friendsError) return <p className="text-red-600">Error loading friends.</p>;
        if (!friends || friends.length === 0) return <p className="text-gray-400">No friends added.</p>;

        return (
            <>
                {friendsList.map((friend) => (
                    renderUser(friend)
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
                    <div className={"max-h-[56vh]" + (
                        friendsList.length > 6
                            ? "overflow-y-auto pr-5 scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-primary/10 scrollbar-track-rounded-full"
                            : ""
                        )}
                    >
                        <div className="flex flex-col gap-4">
                            {isSearching ? showFoundUsers() : showFriendList()}
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
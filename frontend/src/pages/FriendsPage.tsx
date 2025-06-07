import {BasePage} from "../components/BasePage";
import {FaCheck, FaPlusCircle, FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";
import {userDto} from "../values/dto/userDto";
import {useFindUserByUsername} from "../hooks/useUsers";
import {useAuth} from "../auth/AuthContext";
import {useAddFriend} from "../hooks/useFriends";
import {useGetFriends} from "../hooks/useFriends";
import {FriendListValueDto} from "../values/dto/friendListValueDto";
import {FriendListDto} from "../values/dto/friendListDto";
import { useNavigate } from "react-router-dom";
export const FriendsPage = () => {
    const [findValue, setFindValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [friendsList, setFriendsList] = useState<FriendListValueDto[]>([])
    const [pendingFriendRequests, setPendingFriendRequests] = useState<FriendListValueDto[]>([])
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<FriendListValueDto[]>([])

    const [addedUserIds, setAddedUserIds] = useState<number[]>([]);

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

    const {mutate: addFriend} = useAddFriend();

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

    const handleAddFriend = (friendId: number) => {
        addFriend({
            body: {
                userId: currentUserID,
                friendId: friendId
            }
        });
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
            </div>
        )
    }

    const showFoundUsers = () => {
        if (!foundUsers) return <p className="text-gray-400">No user found.</p>;
        if (findingUsers) return <p className="text-primary/70">Searching...</p>;
        if (findingUsersError) return <p className="text-red-600">Error searching for a user.</p>;

        const isAlreadyFriendOrPending = (userId: number): boolean => {
            if (!friends) return false;

            return [...friendsList, ...pendingFriendRequests, ...receivedFriendRequests]
                .some(friend => friend.userId === userId);
        };

        const handleAddFriendAndTrack = (userId: number) => {
            handleAddFriend(userId);
            setAddedUserIds(prev => [...prev, userId]);
        };

        let users: userDto[] = foundUsers;
        users = users.filter(user =>
            user.id !== currentUserID && !isAlreadyFriendOrPending(user.id)
        );

        return users.map(user => (
            <div key={user.id}
                 className="flex items-center gap-4 bg-primary/10 rounded-full p-3 hover:bg-primary/20 transition-all duration-200"
            >
                <img alt={user.username} src={user.profileImagePath} className="w-12 h-12 rounded-full"/>
                <div className="text-white text-sm">{user.username}</div>

                {addedUserIds.includes(user.id) ? (
                    <button type="button"
                            className="bg-primary/20 text-text h-10 w-10 flex ml-auto justify-center items-center rounded-full"
                            disabled>
                        <FaCheck/>
                    </button>
                ) : (
                    <button type="button"
                            className="bg-primary/20 hover:bg-primary/30 text-text h-10 w-10 flex ml-auto hover:cursor-pointer justify-center items-center rounded-full transition-all duration-200"
                            onClick={() => handleAddFriendAndTrack(user.id)}>
                        <FaPlusCircle/>
                    </button>
                )}
            </div>
        ));
    };

    const showFriendList = () => {
        if (loadingFriends) return <p className="text-primary/70">Loading friends...</p>;
        if (friendsError) return <p className="text-red-600">Error loading friends.</p>;
        if (!friends || friends.length === 0) return <p className="text-gray-400">No friends added.</p>;

        return (
            <>
                <h2 className="text-2xl font-semibold text-white">Your Friends</h2>
                {
                    friendsList.map((friend) => (
                        renderUser(friend)
                    ))
                }

                <h2 className="text-2xl font-semibold text-white">Received Invites</h2>
                {
                    receivedFriendRequests.map((friend) => (
                        renderUser(friend)
                    ))
                }

                <h2 className="text-2xl font-semibold text-white">Pending Invites</h2>
                {
                    pendingFriendRequests.map((friend) => (
                        renderUser(friend)
                    ))
                }
            </>
        );
    };

    return (
        <BasePage title={"Friends"} justifyContent={"flex-start"} className={"pl-5 pr-5 pt-5"}>
            <div className="flex flex-col h-full w-full space-y-6">

                <div className="flex flex-row gap-2 items-center">
                    <input
                        type="text"
                        onChange={(e) => setFindValue(e.target.value)}
                        className="bg-primary/20 text-white p-3 pl-4 pr-4 rounded-full focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                        placeholder="Search for new friends"
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
                    {isSearching && (
                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Search Results
                        </h2>
                    )}

                    <div className="max-h-[56vh] overflow-y-auto pr-5 custom-scrollbar">
                        <div className="flex flex-col gap-4">
                            {isSearching ? showFoundUsers() : showFriendList()}
                        </div>
                    </div>
                </div>
            </div>
        </BasePage>
    );
};
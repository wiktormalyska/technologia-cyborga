import {BasePage} from "../components/BasePage";
import {FaCheck, FaPlusCircle, FaSearch} from "react-icons/fa";
import {useState} from "react";
import {userDto} from "../values/dto/userDto";
import {useFindUserByUsername} from "../hooks/useUsers";
import {useAuth} from "../auth/AuthContext";
import {useAddFriend} from "../hooks/useFriends";
import {useGetFriends} from "../hooks/useFriends";

export const FriendsPage = () => {
    const [findValue, setFindValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [addedFriendIds, setAddedFriendIds] = useState<number[]>([]);
    const { decodedToken } = useAuth();
    const currentUserID = decodedToken.userID;

    const {
        mutate: findUsers,
        data: foundUsers,
        isPending: findingUsers,
        error: findingUsersError
    } = useFindUserByUsername()

    const {
        data: friends,
        isLoading: loadingFriends,
        error: friendsError
    } = useGetFriends()

    const { mutate: addFriend } = useAddFriend();

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
        }, {
            onSuccess: () => {
                setAddedFriendIds(prev => [...prev, friendId]);
            }
        });
    }


    const showFoundUsers = () => {
        if (!foundUsers) return <p className="text-gray-400">No user found.</p>;
        if (findingUsers) return <p className="text-primary/70">Searching...</p>;
        if (findingUsersError) return <p className="text-red-600">Error searching for an user.</p>;

        let users: userDto[] = foundUsers;
        users = users.filter(user => user.id !== currentUserID);

        console.log(users);

        return users.map(user => (
            <div key={user.id} className="flex items-center gap-4 bg-primary/10 rounded-full p-3 hover:bg-primary/20 transition-all duration-200 mb-4">
                <img alt={user.username} src={user.profileImagePath} className="w-12 h-12 rounded-full" />
                <div className="text-white text-sm">{user.username}</div>
                {!friends.some(friend => friend.friendId === user.id) &&
                    (addedFriendIds.indexOf(user.id) !== -1 ? (
                        <button type="button" className={"bg-primary/20 text-text " +
                            "h-10 w-10 flex ml-auto " +
                            "justify-center items-center rounded-full"}
                                disabled>
                            <FaCheck/>
                        </button>
                    ) : (
                        <button type={"button"} className={"bg-primary/20 hover:bg-primary/30 text-text " +
                            "h-10 w-10 flex ml-auto hover:cursor-pointer " +
                            "justify-center items-center rounded-full " +
                            "transition-all duration-200"}
                                onClick={() => handleAddFriend(user.id)}>
                            <FaPlusCircle/>
                        </button>
                    ))
                }
            </div>
        ));
    };

    const showFriendList = () => {
        if (isSearching) return null;


        console.log("Friends Data:", friends)
        if (loadingFriends) return <p className="text-primary/70">Loading friends...</p>;
        if (friendsError) return <p className="text-red-600">Error loading friends.</p>;
        if (!friends || friends.length === 0) return <p className="text-gray-400">No friends added.</p>;


        return friends.map((friend) => (
            <div key={friend.id} className="flex items-center gap-4 bg-primary/10 rounded-full p-3 hover:bg-primary/20 transition-all duration-200 mb-4">
                <img alt={friend.username} src={friend.profileImagePath} className="w-12 h-12 rounded-full" />
                <div className="text-white text-sm">{friend.username}</div>
            </div>
        ));
    };

    return (
        <BasePage title={"Friends"} justifyContent={"flex-start"}>
            <div className="flex flex-col space-y-6">

                <div className="flex flex-row gap-2 items-center">
                    <input
                        type="text"
                        onChange={(e) => setFindValue(e.target.value)}
                        className="bg-primary/20 text-white p-3 pl-4 pr-4 rounded-full focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                        placeholder="Search for a friend"
                    />
                    <button
                        type="button"
                        className="bg-primary/20 text-white hover:bg-primary/30 h-full w-12 flex justify-center items-center rounded-full transition-all duration-200"
                        onClick={onFindUser}
                    >
                        <FaSearch size={20} />
                    </button>
                </div>

                {!isSearching && (
                    <div className="pt-3">
                        <h2 className="text-2xl font-semibold text-white mb-3">Your Friends</h2>
                        {showFriendList()}
                    </div>
                )}

                <div className="pt-5">
                    {isSearching && (
                        <>
                            <h2 className="text-2xl font-semibold text-white mb-3">Search Results</h2>
                            {showFoundUsers()}
                        </>
                    )}
                </div>
            </div>
        </BasePage>
    );
};
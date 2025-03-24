import {BasePage} from "../components/BasePage";
import {FaSearch} from "react-icons/fa";
import {useState} from "react";
import {userDto} from "../values/dto/userDto";
import {useFindUserByUsername} from "../hooks/useUsers";
import {useGetFriends} from "../hooks/useFriends";

export const FriendsPage = () => {
    const [findValue, setFindValue] = useState("")

    const {
        mutate: findUsers,
        data: foundUsers,
        isPending: findingUsers,
        error: findingUsersError
    } = useFindUserByUsername()

    const {
        //mutate: findFriends,
        data: foundFriends,
        isPending: loadingFriends,
        error: friendsError
    } = useGetFriends()

    const onFindUser = () => {
        if (!findValue) return
        findUsers({param: findValue})
    }


    const showFoundUsers = () => {
        if (!foundUsers) return null;
        if (findingUsers) return "Searching...";
        if (findingUsersError) return findingUsersError;

        const users: userDto[] = foundUsers;
        console.log(users);

        return users.map(user => (
            <div key={user.id} className="flex items-center gap-2 bg-secondary/40 rounded-full p-2">
                <img alt={user.username} src={user.profileImagePath}
                     className="w-10 h-10 rounded-full"/>
                <div className={"text-text"}>{user.username}</div>
            </div>
        ));
    };

    const showFriendList = () => {
        console.log("Friends Data:", foundFriends)
        if (loadingFriends) return "Loading friends...";
        if (friendsError) return "Error loading friends.";
        if (!foundFriends || foundFriends.length === 0) return "No friends added.";


        return friends.map((friend) => (
            <div key={friend.id} className="flex items-center gap-2 bg-secondary/40 rounded-full p-2">
                <img alt={friend.username} src={friend.profileImagePath} className="w-10 h-10 rounded-full" />
                <div className={"text-text"}>{friend.username}</div>
            </div>
        ));
    };

    return (
        <BasePage title={"Friends"} justifyContent={"flex-start"}>
            <div className={"flex flex-col"}>
                <div className={"text-text flex flex-row gap-1"}>
                    <input type={"text"}
                           onChange={(e) => setFindValue(e.target.value)}
                           className={"bg-primary/20 hover:bg-primary/30 p-2 pl-4 pr-4 rounded-full " +
                               "transition-all duration-200"}/>
                    <button type={"button"} className={"bg-primary/20 hover:bg-primary/30 " +
                        "h-full w-10 flex " +
                        "justify-center items-center rounded-full " +
                        "transition-all duration-200"}
                            onClick={onFindUser}>
                        <FaSearch/>
                    </button>
                </div>

                <div className={"pt-5"}>
                    <h2 className="text-lg font-bold text-text">Your Friends</h2>
                    {showFriendList()}
                </div>

                <div className={"pt-5"}>
                    {showFoundUsers()}
                </div>
            </div>
        </BasePage>
    )
};
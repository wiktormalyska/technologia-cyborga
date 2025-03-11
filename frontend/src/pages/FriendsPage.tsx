import {BasePage} from "../components/BasePage";
import {FaPlus, FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";
import {userDto} from "../values/dto/userDto";
import {useFindUserByUsername, useGetAllUserFriends} from "../hooks/useUsers";
import {useAuth} from "../auth/AuthContext";
import {friendListDto} from "../values/dto/friendListDto";

export const FriendsPage = () => {
    const [findValue, setFindValue] = useState("")
    const {decodedToken} = useAuth()

    const {
        mutate: findUsers,
        data: foundUsers,
        isPending: findingUsers,
        error: findingUsersError
    } = useFindUserByUsername()

    const {
        mutate: getAllUserFriends,
        data: allUserFriends,
        isPending: isUserFriendsPending,
        error: userError
    } = useGetAllUserFriends()

    const onFindUser = () => {
        if (!findValue) return
        findUsers({param: findValue})
    }

    useEffect(() => {
        getAllUserFriends({param: decodedToken.userID.toString()})
    }, [decodedToken]);

    const inviteUser = (user: userDto) => {

    }

    const showAllUserFriends = () => {
        if (!allUserFriends) return null
        if (isUserFriendsPending) return "Getting all friends..."
        if (userError) return userError

        console.log(allUserFriends)
        const userFriendList: friendListDto = allUserFriends;
        console.log(userFriendList)

        if (userFriendList.friends.length === 0) {
            return (
                <span className={"text-xs opacity-50"}>No friends found...</span>
            )
        }

        return userFriendList.friends.map(friend => (
            <>
                {friend}
            </>
        ))
    }


    const showFoundUsers = () => {
        if (!foundUsers) return null
        if (findingUsers) return "Searching..."
        if (findingUsersError) return findingUsersError

        const users: userDto[] = foundUsers;
        console.log(users);

        return users.map(user => (
            <div key={user.id} className="flex items-center gap-2 bg-secondary/40 rounded-full p-2">
                <img alt={user.username} src={user.profileImagePath}
                     className="w-10 h-10 rounded-full"/>
                <div className={"text-text"}>{user.username}</div>
                <div className={"justify-end w-full text-end pr-2 flex "}>
                    <div className={"rounded-full p-2 " +
                        "bg-secondary/80 hover:bg-secondary transition-all duration-200"}
                         onClick={() => inviteUser(user)}>
                        <FaPlus/>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <BasePage title={"Friends"} justifyContent={"flex-start"}>
            <div className={"flex flex-row text-text p-2 gap-10"}>
                <div className={"pl-2"}>
                    <span>Your Friends</span>
                    <div>
                        {showAllUserFriends()}
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    <span className={"w-full text-center pb-2"}>Find Friends</span>
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
                    <div className={"pt-5 gap-2 flex flex-col"}>
                        {showFoundUsers()}
                    </div>
                </div>
            </div>
        </BasePage>
    )
};
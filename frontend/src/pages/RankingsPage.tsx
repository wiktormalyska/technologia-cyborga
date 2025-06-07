import {BasePage} from "../components/BasePage";
import {FaSearch} from "react-icons/fa";
import {useState} from "react";
import {useAuth} from "../auth/AuthContext";
import {useFindUserByUsername, useGetAllUsers} from "../hooks/useUsers";
import {userDto} from "../values/dto/userDto";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import pointsIcon from "../assets/icons/points-icon.svg"
// @ts-ignore
import leaderIcon from "../assets/icons/leader-icon.svg"

export const RankingsPage = () => {
    const [findValue, setFindValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);
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
        data: allUsers,
        isLoading: loadingUsers,
        error: usersError
    } = useGetAllUsers()

    const onFindUser = () => {
        if (!findValue) return;
        setIsSearching(true);
        findUsers({param: findValue});
    }
    const openUserPage = (userId: number) => {
        console.log("Clicked user ID:", userId);
        navigate(`/account/${userId}`);
    }

    const renderUser = (user: userDto, index: number) => {
        return (
            <div key={user.id}
                 className="flex items-center gap-4 bg-primary/10 rounded-full p-3 hover:bg-primary/20 transition-all duration-200"
                 onClick={() => openUserPage(user.id)}>
                <div className="text-white text-lg flex ml-5 font-bold">{index + 1}.</div>
                <img alt={user.username} src={user.profileImagePath} className="w-12 h-12 rounded-full"/>
                <div className="text-white text-sm flex gap-2">
                    {index === 0 && (
                        <img src={leaderIcon} alt="Leader" className="w-5 h-5"/>
                    )}
                    {user.username}
                    {user.id === currentUserID && (
                        <span>(You)</span>
                    )}
                </div>
                <div className="flex gap-1 ml-auto mr-5">
                    <img className={"h-6 w-6"} src={pointsIcon} alt="Points"/>
                    <div className="text-white text-sm">{user.points}</div>
                </div>
            </div>
        )
    }

    const showFoundUsers = () => {
        if (findingUsers) return <p className="text-primary/70">Searching...</p>;
        if (findingUsersError) return <p className="text-red-600">Error searching for an user.</p>;
        if (!foundUsers || foundUsers.length === 0) return <p className="text-gray-400">No user found.</p>;

        let users: userDto[] = foundUsers;
        users = [...users].sort((a, b) => b.points - a.points);

        return users.map((user, index) => (
            renderUser(user, index)
        ));
    };

    const showUserList = () => {
        if (isSearching) return null;

        console.log("Users Data:", allUsers)
        if (loadingUsers) return <p className="text-primary/70">Loading users...</p>;
        if (usersError) return <p className="text-red-600">Error loading users.</p>;
        if (!allUsers || allUsers.length === 0) return <p className="text-gray-400">No users present.</p>;

        let users: userDto[] = allUsers;
        users = [...users].sort((a, b) => b.points - a.points);

        return users.map((user, index) => (
            renderUser(user, index)
        ));
    };

    return (
        <BasePage title={"Rankings"} justifyContent={"flex-start"} className={"pl-5 pr-5 pt-5"}>
            <div className="flex flex-col h-full w-full space-y-6">
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
                        {isSearching ? "Search Results" : "Top scores"}
                    </h2>
                    <div className="max-h-[56vh] overflow-y-auto pr-5 scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-primary/10 scrollbar-track-rounded-full">
                        <div className="flex flex-col gap-4">
                            {isSearching ? showFoundUsers() : showUserList()}
                        </div>
                    </div>
                </div>
            </div>
        </BasePage>
    )
};
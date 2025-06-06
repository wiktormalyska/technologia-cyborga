import {BasePage} from "../components/BasePage";
import {FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthContext";
import {useFindUserByUsername} from "../hooks/useUsers";
import {useGetAllUsers} from "../hooks/useUsers";
import {userDto} from "../values/dto/userDto";
import {useNavigate} from "react-router-dom";

export const AdminPage = () => {
    const [findValue, setFindValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [userCount, setUserCount] = useState(0);

    const { decodedToken } = useAuth();
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

    useEffect(() => {
        if (allUsers) {
            setUserCount(allUsers.length);
        }
    }, [userCount, allUsers])

    useEffect(() => {
        if (foundUsers) {
            setUserCount(foundUsers.length);
        }
    }, [userCount, foundUsers])

    const openUserPage = (userId: number) => {
        console.log("Clicked user ID:", userId);
        navigate(`/account/${userId}`);
    }

    const renderUser = (user: userDto) => {
        return (
            <div key={user.id}
                 className="flex items-center gap-4 bg-primary/10 rounded-full p-3 hover:bg-primary/20 transition-all duration-200"
                 onClick={() => openUserPage(user.id)}
            >
                <img alt={user.username} src={user.profileImagePath} className="w-12 h-12 rounded-full" />
                <div className="text-white text-sm">{user.username}</div>
            </div>
        )
    }

    const showFoundUsers = () => {
        if (!foundUsers) return <p className="text-gray-400">No user found.</p>;
        if (findingUsers) return <p className="text-primary/70">Searching...</p>;
        if (findingUsersError) return <p className="text-red-600">Error searching for a user.</p>;

        let users: userDto[] = foundUsers;
        users = users.filter(user => user.id !== currentUserID);

        console.log(users);

        return users.map(user => (
            renderUser(user)
        ));
    };

    const showUserList = () => {
        if (isSearching) return null;

        console.log("Users Data:", allUsers)
        if (loadingUsers) return <p className="text-primary/70">Loading users...</p>;
        if (usersError) return <p className="text-red-600">Error loading users.</p>;
        if (!allUsers || allUsers.length === 0) return <p className="text-gray-400">No users present.</p>;

        let users: userDto[] = allUsers;
        users = users.filter(user => user.id !== currentUserID);

        return users.map((user) => (
            renderUser(user)
        ));
    };

    return (
        <BasePage title={"Admin Panel"} justifyContent={"flex-start"} className={"pl-5 pr-5 pt-5"}>
            <div className="flex flex-col space-y-6">

                <div className="flex flex-row gap-2 items-center">
                    <input
                        type="text"
                        onChange={(e) => setFindValue(e.target.value)}
                        className="bg-primary/20 text-white p-3 pl-4 pr-4 rounded-full focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                        placeholder="Search for a user"
                    />
                    <button
                        type="button"
                        className="bg-primary/20 text-white hover:bg-primary/30 hover:cursor-pointer h-full w-12 flex justify-center items-center rounded-full transition-all duration-200"
                        onClick={onFindUser}
                    >
                        <FaSearch size={20} />
                    </button>
                </div>

                <div className="pt-3">
                    <h2 className="text-2xl font-semibold text-white mb-3">
                        {isSearching ? "Search Results" : "Registered Users"}
                    </h2>

                    <div className={`max-h-[56vh] ${
                        userCount > 6
                            ? "overflow-y-auto pr-5 scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-primary/10 scrollbar-track-rounded-full"
                            : ""
                        }`}
                    >
                        <div className="flex flex-col gap-4">
                            {isSearching ? showFoundUsers() : showUserList()}
                        </div>
                    </div>
                </div>
            </div>
        </BasePage>
    );
}
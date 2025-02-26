import {useGetUserById} from "../hooks/useUsers";
import {useEffect} from "react";
import {useAuth} from "../auth/AuthContext";
import {BasePage} from "../components/BasePage";

export const ProfilePage = () => {
    const badges = ["🏆", "🎖️", "🎯"];
    const emojis = ["😳", "😜", "🤯", "🤤", "😩", "💀"];
    const {mutate: getUserByID, isPending, data, error} = useGetUserById()
    const {decodedToken} = useAuth()

    useEffect(() => {
        getUserByID({param: decodedToken.userID.toString()})
    }, [decodedToken, getUserByID]);

    if (isPending) return (
        <BasePage title={"Loading..."} justifyContent={"flex-start"}></BasePage>
    );
    if (error) return (
        <BasePage title={"Error loading user data!"} justifyContent={"flex-start"}></BasePage>
    );
    if (!data) return (
        <BasePage title={"No user data found."} justifyContent={"flex-start"}></BasePage>
    );
    const actions = ["Message", "Invite to Friends", "Trade", "Invite to Play"]
    return (
        <BasePage title={"Account Info"} justifyContent={"flex-start"}>
            <div className={"flex flex-col w-full h-full p-1 box-border" +
                " overflow-hidden items-center justify-start bg-pageBackground"}>
                <div className={"flex flex-col items-center mb-2"}>
                    <div className={"w-[120px] h-[120px] rounded-2xl bg-neutral-800 " +
                        "border-2 border-solid border-primary" +
                        "mb-1"}/>
                    <div className={"text-xl text-text text-center"}>{data.username}</div>
                </div>

                <div className={"flex flex-wrap gap-1 justify-center w-full mb-10"}>
                    {
                        actions.map(action => {
                            return (
                                <div className={"bg-border border-none p-1 border-r-4 text-xl cursor-pointer " +
                                    "transition-colors duration-300 hover:bg-primary"}>
                                    {action}
                                </div>)
                        })
                    }
                </div>

                <div className={"w-full p-1 bg-primary border-r-2 box-border mb-2"}>
                    <div className={"text-2xl text-text mb-1.5 text-center"}>
                        Badges
                    </div>
                    <div className={"flex gap-1 flex-wrap justify-center"}>
                        {badges.map((badge, index) => (
                            <div key={index}
                                 className={"text-2xl bg-neutral-700 rounded-2xl p-1 " +
                                     "text-text flex items-center justify-center w-10 h-10"}
                            >
                                {badge}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={"w-full p-1 bg-primary border-r-2 box-border mb-2"}>
                    <div className={"text-2xl text-text mb-1.5 text-center"}>
                        Unlocked emoji
                    </div>
                    <div className={"flex gap-1 flex-wrap justify-center"}>
                        {emojis.map((emoji, index) => (
                            <div key={index}
                                 className={"text-2xl bg-neutral-700 rounded-2xl p-1 " +
                                     "text-text flex items-center justify-center w-10 h-10"}
                            >
                                {emoji}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BasePage>
    );
};
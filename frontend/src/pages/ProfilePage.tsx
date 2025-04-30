import {useGetUserById, useGetUserPoints} from "../hooks/useUsers";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthContext";
import {BasePage} from "../components/BasePage";
import {userDto} from "../values/dto/userDto";
import {FaArrowsRotate, FaMessage} from "react-icons/fa6";
import {IconType} from "react-icons";
import {FaPlayCircle, FaPlusCircle} from "react-icons/fa";
import { Chat } from "../components/Chat";

export const ProfilePage = () => {
    const badges = ["🏆", "🎖️", "🎯"];
    const emojis = ["😳", "😜", "🤯", "🤤", "😩", "💀"];
    const {mutate: getUserByID, isPending: isUserPending, data: userData, error: userError} = useGetUserById();
    //const { data: points, isPending: isPointsPending, error: pointsError } = useGetUserPoints({ param: "1" });

    const {decodedToken} = useAuth()
    const { mutate: getUserPoints, isPending: isPointsPending, data: pointsData, error: pointsError } = useGetUserPoints();

    const [user, setUser] = useState<userDto>()

    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        getUserByID({param: decodedToken.userID.toString()})
    }, [decodedToken, getUserByID]);

    useEffect(() => {
        getUserPoints({param: decodedToken.userID.toString()})
    }, [decodedToken, getUserPoints]);

    useEffect(() => {
        if (userData) {
            setUser(userData)
        }
    }, [userData]);

    if (isUserPending || isPointsPending) return (
        <BasePage title={"Loading..."} justifyContent={"flex-start"}></BasePage>
    );
    if (userError || pointsError) return (
        <BasePage title={"Error loading user data!"} justifyContent={"flex-start"}></BasePage>
    );
    if (!userData || !user) return (
        <BasePage title={"No user data found."} justifyContent={"flex-start"}></BasePage>
    );

    interface actionInterface {
        name: string,
        icon: IconType
        onClick?: () => void
    }

    const actions: actionInterface[] = [
        {
            name: "Message",
            icon: FaMessage,
            onClick: () => setIsChatOpen(true),
        },
        {
            name: "Invite",
            icon: FaPlusCircle
        }, {
            name: "Trade",
            icon: FaArrowsRotate
        }, {
            name: "Play",
            icon: FaPlayCircle
        }
    ]
    return (
        <BasePage title={"Account Info"} justifyContent={"flex-start"} className={"pl-15 pr-15 pt-5"}>
            <div className={"flex flex-col w-full h-full p-1 box-border " +
                "overflow-hidden items-center justify-start " +
                "bg-pageBackground"}>
                <div className={"flex flex-col items-center gap-5 pb-5"}>
                    <div>
                        <img className={"w-[120px] h-[120px] rounded-full bg-secondary/50 p-2" +
                            ""} src={user.profileImagePath || ""} alt={"Missing Pic"}/>
                    </div>
                    <div className={"text-3xl text-text text-center font-bold tracking-wide"}>{userData.username}</div>
                </div>

                <div className={"flex flex-wrap gap-2 justify-between w-full mb-4"}>
                    {
                        actions.map(action => {
                            return (
                                <div key={action.name}
                                     className={"p-1 cursor-pointer text-text flex flex-col items-center text-center"}
                                     onClick={action.onClick}>
                                    <div
                                        className={"text-lg bg-secondary w-[40px] h-[40px] rounded-full items-center justify-center flex"}>
                                        {React.createElement(action.icon)}
                                    </div>
                                    <div className={"text-sm font-bold tracking-wider"}>
                                        {action.name}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex justify-center mb-5">
                    <div className="text-text bg-secondary/90 text-sm px-4 py-2 rounded-full font-semibold">
                        Points: {pointsData.points || 0} {/* Wyświetl punkty użytkownika */}
                    </div>
                </div>
                <div className={"flex flex-col gap-5"}>
                    <div className={"bg-secondary/60 border-r-2 box-border rounded-2xl p-5"}>
                        <div className={"text-2xl text-text mb-1.5 text-center"}>
                            Badges
                        </div>
                        <div className={"flex gap-1 flex-wrap justify-center"}>
                            {badges.map((badge, index) => (
                                <div key={index}
                                     className={"text-2xl bg-secondary/90 rounded-2xl p-1 " +
                                         "text-text flex items-center justify-center w-10 h-10"}
                                >
                                    {badge}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={"bg-secondary/60 border-r-2 box-border rounded-2xl p-5"}>
                        <div className={"text-2xl text-text mb-1.5 text-center"}>
                            Unlocked emoji
                        </div>
                        <div className={"flex gap-1 flex-wrap justify-center"}>
                            {emojis.map((emoji, index) => (
                                <div key={index}
                                     className={"text-2xl bg-secondary/90 rounded-2xl " +
                                         "text-text flex items-center justify-center w-10 h-10"}
                                >
                                    {emoji}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isChatOpen && <Chat onClose={() => setIsChatOpen(false)}/>}
        </BasePage>
    );
};
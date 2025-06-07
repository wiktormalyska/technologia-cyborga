import {useGetUserById, useGetUserPoints} from "../hooks/useUsers";
import {useGetUserEmojis} from "../hooks/useEmojis";
import { useGetAllEmojis } from "../hooks/useEmojis";
import { useParams } from 'react-router-dom';
// @ts-ignore
import React, {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthContext";
import {BasePage} from "../components/BasePage";
import {userDto} from "../values/dto/userDto";
import {FaArrowsRotate, FaMessage} from "react-icons/fa6";
import {IconType} from "react-icons";
import {FaPlayCircle, FaPlusCircle} from "react-icons/fa";
import { Chat } from "../components/Chat";
import {useAddFriend} from "../hooks/useFriends";
import {useCreateChat} from "../hooks/useChats";

interface ProfilePagePropsType {
    isFriend?: boolean | false;
    friendID?: string | null;
}

export const ProfilePage = ({isFriend, friendID}: ProfilePagePropsType) => {
    const badges = ["🏆", "🎖️", "🎯"];
    const {mutate: getUserByID, isPending: isUserPending, data: userData, error: userError} = useGetUserById();
    //const { data: points, isPending: isPointsPending, error: pointsError } = useGetUserPoints({ param: "1" });

    const {decodedToken} = useAuth()
    const currentUserID = decodedToken.userID;

    const { mutate: getUserPoints, isPending: isPointsPending, data: pointsData, error: pointsError } = useGetUserPoints();

    const [lockedEmojis, setLockedEmojis] = useState<string[]>([]);

    const { mutate: getAllEmojis } = useGetAllEmojis();

    const [user, setUser] = useState<userDto>()

    const [emojis, setEmojis] = useState<{id: number, emoji: string }[]>([]);

    const [allEmojis, setAllEmojis] = useState<{id: number, emoji: string }[]>([]);

    const { mutate: getUserEmojis} = useGetUserEmojis();

    const { mutate: addFriend} = useAddFriend()

    const targetUserId = isFriend && friendID ? friendID.toString() : decodedToken.userID.toString();

    const [isChatOpen, setIsChatOpen] = useState(false);

    const {
        mutate: createChat,
        data: chatData
    } = useCreateChat()

    const handleCreateChat = (otherUserId: string) => {
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
        getUserEmojis(
            { param: targetUserId },
            {
                onSuccess: (data) => {
                    //console.log("User emojis:", data);
                    //const extractedEmojis = data.map((entry: any) => entry.emoji.emoji);
                    const extracted = data.map((entry: any) => ({
                        id: entry.emoji.id,
                        emoji: entry.emoji.emoji
                    }));
                    setEmojis(extracted);
                },
                onError: (err) => {
                    console.error("Error fetching user emojis", err);
                }
            }
        );
    }, [decodedToken, getUserEmojis]);

    useEffect(() => {
        getAllEmojis({ param: "" }, {
            onSuccess: (data) => {
                //console.log("User emojis:", data);
                //const allExtractedEmojis = data.map((entry: any) => entry.emoji); // <-- poprawione
                const extracted = data.map((entry: any) => ({
                    id: entry.id,
                    emoji: entry.emoji
                }));
                setAllEmojis(extracted);
            },
            onError: (err) => {
                console.error("Error fetching all emojis", err);
            }
        });
    }, [getAllEmojis]);

    useEffect(() => {
        if (allEmojis.length > 0 && emojis.length >= 0) {
            const unlockedIds = new Set(emojis.map(e => e.id));
            const locked = allEmojis.filter(e => !unlockedIds.has(e.id));
            setLockedEmojis(locked.map(e => e.emoji)); // tylko emoji stringi
        }
    }, [allEmojis, emojis]);


    useEffect(() => {
        if (!isFriend) getUserByID({param: targetUserId})
    }, [decodedToken, getUserByID]);

    useEffect(() => {
        if (!isFriend) getUserPoints({param: targetUserId})
    }, [decodedToken, getUserPoints]);

    useEffect(() => {
        if (isFriend && friendID != null) getUserByID({param: friendID})
    }, [friendID, getUserByID]);

    useEffect(() => {
        if (isFriend && friendID != null) getUserPoints({param: friendID})
    }, [friendID, getUserPoints]);

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
            onClick: () => handleCreateChat(targetUserId),
        },
        {
            name: "Trade",
            icon: FaArrowsRotate
        }, {
            name: "Play",
            icon: FaPlayCircle
        }
    ]

    if (isFriend) {
        actions.push(
        {
            name: "Invite",
            icon: FaPlusCircle,
            onClick: () => handleAddFriend(friendID),
        })
    }

    const handleAddFriend = (friendId: string) => {
        addFriend({
            body: {
                userId: decodedToken.userID,
                friendId: friendId
            }
        });
    }
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
                                     className={"p-2 w-[80px] h-[80px] hover:bg-secondary/50 hover:cursor-pointer " +
                                         "text-text flex flex-col items-center text-center rounded-xl " +
                                         "transition-all duration-150"}
                                     onClick={action.onClick}
                                >
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
                        Points: {pointsData.points || 0}
                    </div>
                </div>
                <div className={"flex flex-col gap-5"}>
                    <div className={"bg-secondary/60 border-r-2 box-border rounded-2xl p-5"}>
                        <div className={"text-xl text-text mb-2.5 text-center"}>
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

                    <div className="bg-secondary/60 border-r-2 box-border rounded-2xl p-5">
                        <div className="text-xl text-text mb-2.5 text-center">Unlocked emoji</div>
                        <div
                            className={
                                "max-h-[130px] " + (
                                    allEmojis.length > 24
                                        ? "overflow-y-auto pr-2 custom-scrollbar"
                                        : ""
                                )
                            }
                        >
                            <div className="grid grid-cols-6 gap-1 justify-center">
                                {emojis.map((emoji, index) => (
                                    <div
                                        key={`unlocked-${index}`}
                                        className="text-2xl bg-secondary/90 rounded-2xl text-text flex items-center justify-center w-10 h-10"
                                    >
                                        {emoji.emoji}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {lockedEmojis.length > 0 && (
                            <>
                                <div className="text-xl text-text/60 mb-2.5 text-center">Locked emoji</div>
                                <div
                                    className={
                                        "max-h-[130px] " + (
                                            allEmojis.length > 24
                                                ? "overflow-y-auto pr-2 custom-scrollbar"
                                                : ""
                                        )
                                    }
                                >
                                    <div className="grid grid-cols-6 gap-1 justify-center">
                                        {lockedEmojis.map((emoji, index) => (
                                            <div
                                                key={`locked-${index}`}
                                                className="text-2xl bg-secondary/40 rounded-2xl text-text/40 flex items-center justify-center w-10 h-10 relative"
                                            >
                                                {emoji}
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center text-xs text-text/60 font-bold">
                                                    🔒
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
            {isChatOpen && <Chat onClose={() => setIsChatOpen(false)} chatData={chatData}/>}
        </BasePage>
    );
};

export const ProfilePageWrapper = () => {
    const { friendID } = useParams();
    const isFriend = true;

    return <ProfilePage isFriend={isFriend} friendID={friendID!} />;
};
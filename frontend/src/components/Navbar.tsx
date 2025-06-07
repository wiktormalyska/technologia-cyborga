import {Link} from "react-router-dom";
import * as React from "react";
// @ts-ignore
import robotIcon from '../assets/icons/robot.svg'
// @ts-ignore
import chatsIcon from '../assets/icons/chats-icon.svg'
// @ts-ignore
import friendsIcon from '../assets/icons/friends-icon.svg'
// @ts-ignore
import gamesIcon from '../assets/icons/games-icon.svg'
// @ts-ignore
import lootboxesIcon from '../assets/icons/lootboxes-icon.svg'
// @ts-ignore
import rankingsIcon from '../assets/icons/rankings-icon.svg'
// @ts-ignore
import accountIcon from '../assets/icons/account-icon.svg'
// @ts-ignore
import settingsIcon from '../assets/icons/settings-icon.svg'
// @ts-ignore
import logoutIcon from '../assets/icons/logout-icon.svg'
// @ts-ignore
import adminIcon from '../assets/icons/admin-icon.svg'
import {useCurrentUser} from "../hooks/useAuth";

const Navbar = () => {
    const menuOptions = [
        {name: 'All chats', icon: chatsIcon, path: '/'},
        {name: 'Friends', icon: friendsIcon, path: '/friends'},
        {name: 'Games', icon: gamesIcon, path: '/games'},
        {name: 'Lootboxes', icon: lootboxesIcon, path: '/lootboxes'},
        {name: 'Rankings', icon: rankingsIcon, path: '/rankings'},
        {name: 'Account', icon: accountIcon, path: '/account'},
        {name: 'Settings', icon: settingsIcon, path: '/settings'},
        {name: 'Admin Panel', icon: adminIcon, path: '/admin'},
    ];

    const showAdmin = useCurrentUser().isAdmin

    return (
        <div className={"flex flex-col justify-start items-center bg-primary/5 p-5" +
            "h-full w-[250px]"}>
            <div className={"flex w-full justify-center text-center gap-2 pb-4 pt-4"}>
                <div className={"flex flex-row items-center"}>
                    <img className={"h-[40px] w-[40px]"}
                         src={robotIcon} alt="Robot"/>
                    <p className={"pl-2 text-text text-xl tracking-wide"}>Cyborg App</p>
                </div>
            </div>
            <div className={"w-full flex flex-col gap-5 p-5 overflow-y-auto custom-scrollbar"}>
                {menuOptions.filter(option => {
                    return option.name !== 'Admin Panel' || showAdmin}
                ).map((option, index) => (
                    <Link className={"flex flex-row w-full items-center gap-4"}
                          key={index} to={option.path}>
                        <div className={"flex flex-row items-center justify-center " +
                            "w-full h-full rounded-2xl " +
                            "bg-primary/10 hover:bg-primary/20 transition-all duration-200 " +
                            "pt-2 pb-2"}>
                            <img className={"h-[40px] w-[40px]" +
                                "transition-all duration-300"}
                                 src={option.icon} alt={option.name}/>
                            <p>{option.name}</p>
                        </div>

                    </Link>
                ))}
            </div>
            <div className={"mt-auto w-full p-5"}>
                <Link className={"w-full flex flex-col justify-center items-center " +
                    "bg-primary/10 hover:bg-primary/20 duration-200 transition-all " +
                    "rounded-lg " +
                    "p-5"}
                      key={"logout"} to={"/logout"}>
                    <img
                        className={"h-[30px] w-[30px] "}
                        src={logoutIcon}
                        alt="logout"
                    />
                    <p className={"text-lg text-text"}>Logout</p>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
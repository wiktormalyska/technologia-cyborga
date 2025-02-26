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

const Navbar = () => {
    const menuOptions = [
        {name: 'All chats', icon: chatsIcon, path: '/'},
        {name: 'Friends', icon: friendsIcon, path: '/friends'},
        {name: 'Games', icon: gamesIcon, path: '/games'},
        {name: 'Lootboxes', icon: lootboxesIcon, path: '/lootboxes'},
        {name: 'Rankings', icon: rankingsIcon, path: '/rankings'},
        {name: 'Account', icon: accountIcon, path: '/account'},
        {name: 'Settings', icon: settingsIcon, path: '/settings'},
    ];

    return (
        <div className={"flex flex-col justify-start items-center " +
            "pt-3 pb-3 pl-4 pr-4 bg-neutral-900 h-full w-[250px]"}>
            <div className={"flex flex-row items-center text-center gap-2 mb-4 mt-4"}>
                <img className={"h-[40px] w-[40px] bg-neutral-900"}
                     src={robotIcon} alt="Robot"/>
                <p className={"pl-2 text-text text-2xl tracking-wide"}>Cyborg App</p>
            </div>
            <div className={"w-full h-[1px] bg-neutral-600 mt-4 mb-4 m-0"}/>
            <div className={"flex flex-col gap-5"}>
                {menuOptions.map((option, index) => (
                    <Link className={"flex flex-row items-center p-2 gap-4 cursor-pointer " +
                        "hover:bg-neutral-800 bg-neutral-900 duration-200 " +
                        "w-full rounded-lg"}
                          key={index} to={option.path}>
                        <img className={"h-[40px] w-[40px]" +
                            "transition-all duration-300"}
                             src={option.icon} alt={option.name}/>
                        <p>{option.name}</p>
                    </Link>
                ))}
            </div>
            <Link className={"flex items-center flex-col content-center " +
                "justify-end flex-nowrap font-bold mt-auto w-[50%] p-4 " +
                " bg-neutral-900 hover:bg-neutral-800 duration-200 rounded-lg" +
                " transition-all"}
                  key={"logout"} to={"/logout"}>
                <img
                    className={"h-[30px] w-[30px] "}
                    src={logoutIcon}
                    alt="logout"
                />
                <p className={"text-lg text-text"}>Logout</p>
            </Link>
        </div>
    );
};

export default Navbar;
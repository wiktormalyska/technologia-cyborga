import styled from 'styled-components';
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
        { name: 'All chats', icon: chatsIcon , path: '/'},
        { name: 'Friends', icon: friendsIcon, path: '/friends'},
        { name: 'Games', icon: gamesIcon, path: '/games'},
        { name: 'Lootboxes', icon: lootboxesIcon, path: '/lootboxes'},
        { name: 'Rankings', icon: rankingsIcon, path: '/rankings'},
        { name: 'Account', icon: accountIcon, path: '/account'},
        { name: 'Settings', icon: settingsIcon, path: '/settings'},
    ];

    return (
        <NavbarContainer>
            <AppName>
                <img src={robotIcon} alt="Robot"/>
                <p>Cyborg App</p>
            </AppName>
            <Divider/>
            <Menu>
                {menuOptions.map((option, index) => (
                    <MenuItem key={index} to={option.path}>
                        <img src={option.icon} alt={option.name}/>
                        <p>{option.name}</p>
                    </MenuItem>
                ))}
            </Menu>
            <Logout key={"logout"} to={"/logout"}>
                    <img src={logoutIcon} alt={"logout"}/>
                    <p>Logout</p>
            </Logout>
        </NavbarContainer>
    );
};

export default Navbar;

const Logout = styled(Link)`
    display: flex;
    align-items: center;
    flex-direction: column;
    align-content: center;
    justify-content: flex-end;
    flex-wrap: nowrap;
    font-weight: 400;
    margin-top: auto;
    width: 50%;
    padding: 10px;

    &:hover {
        background-color: #2c2a2f;
        border-radius: 0.8rem;

        img {
            background-color: #2c2a2f;
        }
        
    }

    img {
        height: 30px;
        width: 30px;
        background-color: #1d1b20;
        border-radius: 0.5rem;
        transition: background-color;
    }

    p {
        font-size: 17px;
        font-family: 'Josefin Sans', sans-serif;
        color: #ffffff;
    }

`

const NavbarContainer = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 0.65rem 1rem;
      background-color: #1d1b20;
      height: 100%;
      width: 250px;
    
    
`;

const AppName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 0.4rem;
    margin-bottom: 1rem;
    margin-top: 1rem;

    img {
        height: 40px;
        width: 40px;
        background-color: #1d1b20;
    }

    p {
        padding-left: 10px;
        font-size: 28px;
        color: white;
    }
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: grey;
    opacity: 1;
    margin: 1rem 0;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

const MenuItem = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem;
    gap: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #2c2a2f; 
        border-radius: 0.8rem;
        width: 100%;
        
        img {
            background-color: #2c2a2f; 
        }
    }

    img {
        height: 40px;
        width: 40px;
        background-color: #1d1b20;
        border-radius: 0.5rem;
        transition: background-color; 
        
    }

    p {
        font-size: 18px;
        font-family: 'Josefin Sans', sans-serif;
        color: #ffffff;
    }
`;

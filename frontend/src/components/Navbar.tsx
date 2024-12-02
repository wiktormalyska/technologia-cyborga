import styled from 'styled-components';
import * as React from "react";
import robotIcon from '../assets/Icons/robot.svg';
import chatsIcon from '../assets/Icons/chats-icon.svg';
import friendsIcon from '../assets/Icons/friends-icon.svg';
import gamesIcon from '../assets/Icons/games-icon.svg';
import lootboxesIcon from '../assets/Icons/lootboxes-icon.svg';
import rankingsIcon from '../assets/Icons/rankings-icon.svg';
import accountIcon from '../assets/Icons/account-icon.svg';
import settingsIcon from '../assets/Icons/settings-icon.svg';


const NavbarContainer = styled.div`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.65rem 1rem;
  background-color: #1d1b20;
  height: 100vh;
  width: 250px;
`;

const AppName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1rem;

    img {
        height: 52px;
        width: 52px;
        background-color: #1d1b20;
    }

    p {
        font-size: 27px;
        font-family: 'Josefin Sans', sans-serif;
        color: #ffffff;
    }
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

const MenuItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.8rem;
    gap: 1.5rem;
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
        height: 52px;
        width: 52px;
        background-color: #1d1b20;
        border-radius: 0.5rem;
        transition: background-color; /* Smooth background change */
        
    }

    p {
        font-size: 18px;
        font-family: 'Josefin Sans', sans-serif;
        color: #ffffff;
    }
`;

const Navbar: React.FC = () => {
    const menuOptions = [
        { name: 'All chats', icon: chatsIcon },
        { name: 'Friends', icon: friendsIcon },
        { name: 'Games', icon: gamesIcon },
        { name: 'Lootboxes', icon: lootboxesIcon },
        { name: 'Rankings', icon: rankingsIcon },
        { name: 'Account', icon: accountIcon },
        { name: 'Settings', icon: settingsIcon },
    ];

    return (
        <NavbarContainer>
            <AppName>
                <img src={robotIcon} alt="Robot"/>
                <p>Cyborg App</p>
            </AppName>
            <Menu>
                {menuOptions.map((option, index) => (
                    <MenuItem key={index}>
                        <img src={option.icon} alt={option.name}/>
                        <p>{option.name}</p>
                    </MenuItem>
                ))}
            </Menu>
        </NavbarContainer>
    );
};

export default Navbar;

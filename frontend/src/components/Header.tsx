import * as React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
    background-color: #6200ea;
    color: white;
    padding: 1rem;
`;

const Title = styled.h1`
    margin: 0;
`;

const Nav = styled.nav`
    margin-top: 1rem;
`;

const NavList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1rem;
`;

const NavLink = styled.a`
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Games', path: '/games' },
    { name: 'Lootboxes', path: '/lootboxes' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
];

const Header = () => (
    <HeaderWrapper>
        <Title>Cyborg App</Title>
        <Nav>
            <NavList>
                {navItems.map((item) => (
                    <li key={item.path}>
                        <NavLink href={item.path}>{item.name}</NavLink>
                    </li>
                ))}
            </NavList>
        </Nav>
    </HeaderWrapper>
);

export default Header;
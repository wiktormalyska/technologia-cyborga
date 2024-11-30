import * as React from 'react';
import './layout.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>Cyborg App</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
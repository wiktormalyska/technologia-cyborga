import * as React from 'react';
import './layout.css';

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/settings">Settings</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </aside>
    );
};

export default Sidebar;

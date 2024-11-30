import * as React from 'react';
import { ReactNode } from 'react';
import './layout.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="main-layout">
            <Header />
            <div className="main-content">
                <Sidebar />
                <div className="page-content">{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
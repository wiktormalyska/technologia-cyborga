import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Navbar from "./Navbar";

interface MainLayoutProps {
    children: ReactNode;
}

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const MainContent = styled.div`
    display: flex;
    height: 100%;
`;

const PageContent = styled.div`
    padding: 1rem;
    background-color: #ffffff;
`;

const MainLayout = ({ children }: MainLayoutProps) => (
    <LayoutWrapper>

        <MainContent>
            <Navbar />
            <PageContent>
                {children}
            </PageContent>
        </MainContent>
        <Footer />
    </LayoutWrapper>
);

export default MainLayout;
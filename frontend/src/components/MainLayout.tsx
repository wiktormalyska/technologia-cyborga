import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
    children: ReactNode;
}

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.div`
    display: flex;
    flex: 1;
`;

const PageContent = styled.div`
    flex: 1;
    padding: 1rem;
    background-color: #ffffff;
`;

const MainLayout = ({ children }: MainLayoutProps) => (
    <LayoutWrapper>
        <Header />
        <MainContent>
            <PageContent>{children}</PageContent>
        </MainContent>
        <Footer />
    </LayoutWrapper>
);

export default MainLayout;
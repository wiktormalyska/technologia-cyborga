import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";



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

const MainLayout = () => (
    <LayoutWrapper>
        <MainContent>
            <Navbar />
            <PageContent>
                <Outlet />
            </PageContent>
        </MainContent>
        <Footer />
    </LayoutWrapper>
);

export default MainLayout;
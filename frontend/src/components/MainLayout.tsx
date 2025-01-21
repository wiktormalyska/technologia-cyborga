import * as React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";
import colorPalette from "../values/colorPalette";



const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const MainContent = styled.div`
    display: flex;
    height: 100%;
    background-color: ${colorPalette.pageBackground.hex};
`;

const PageContent = styled.div`
    padding: 1rem;
    background-color: ${colorPalette.pageBackground.hex};
    width: 100%;
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
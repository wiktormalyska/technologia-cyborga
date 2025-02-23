import * as React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";


const MainLayout = () => (
    <div className={"flex flex-col h-full"}>
        <div className={"flex h-full bg-pageBackground"}>
                <Navbar />
            <div className={"p-4 bg-pageBackground w-full"}>
                <Outlet />
            </div>
        </div>
        <Footer />
    </div>
);

export default MainLayout;
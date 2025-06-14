import * as React from 'react';
import Footer from './Footer';
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";


const MainLayout = () => (
    <div className={"flex flex-col h-full"}>
        <div className={"flex flex-1 overflow-y-auto bg-background"}>
                <Navbar />
            <div className={"p-4 mb-4 flex-1 overflow-y-auto bg-background w-full flex justify-center " +
                "custom-scrollbar-wide"
            }>
                <Outlet />
            </div>
        </div>
        <Footer />
    </div>
);

export default MainLayout;
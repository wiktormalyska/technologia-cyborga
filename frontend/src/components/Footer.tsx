import * as React from 'react';
import {Link} from "react-router-dom";
import {useState} from "react";

const authorLink = "https://docusaurus.wiktormalyska.ovh/docs/it/projekt-zespolowy-technologia-cyborga/intro#-contributors"
const docsLink = "https://docusaurus.wiktormalyska.ovh/docs/category/technologia-cyborga"

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={" bg-neutral-900 text-text text-center p-0 pt-4 pb-4"}>
            <div className={"flex flex-row justify-center gap-5"}>
                <div className={"flex flex-col"}
                     onClick={() => {
                         isOpen ? setIsOpen(false) : setIsOpen(true)
                     }}>
                    <div className={"text-xl font-bold text-text"}>
                        Contact Information
                    </div>
                    <div className={`text-xl text-left text-text overflow-hidden` +
                        `transition-all duration-300 ease-in-out ${
                            isOpen
                                ? 'opacity-100 translate-y-0 max-h-[100px] pt-2'
                                : 'opacity-0 -translate-y-5 max-h-0 pt-0'
                        }`}
                    >
                        Tel.: 123 456 789<br/>
                        E-mail: cyborg@sigma.com
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    <div className={"text-xl font-bold text-text"}>
                        <Link to={"/policy"}>Privacy Policy</Link>
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    <div className={"text-xl font-bold text-text"}>
                        <Link to={authorLink} target={"_blank"} rel={"noopener noreferrer"}>Authors</Link>
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    <div className={"text-xl font-bold text-text"}>
                        <Link to={docsLink} target={"_blank"} rel={"noopener noreferrer"}>Documentation</Link>
                    </div>
                </div>
                <div className={"flex flex-col"}><p>&copy; Cyborg 2024 | All rights reserved</p></div>
            </div>
        </div>
    )
};

export default Footer;
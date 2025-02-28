import * as React from "react";
import { motion } from "motion/react"

interface BasePageProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
    maximum_width?: string;
    maximum_height?: string;
    side_spacing?: string;
    justifyContent?: string;
}

export const BasePage =
    ({children, title, description, maximum_width, maximum_height, side_spacing, justifyContent, ...props}:
         BasePageProps & React.HTMLAttributes<HTMLDivElement>) => {
        const header = () => {
            if (!title) return null;
            return (
                <div className={"w-full text-center bg-secondary/50 rounded-full mb-1 p-3 pl-10 pr-10"}>
                    <div className={"text-2xl text-center font-bold text-text"}
                    >
                        {title}
                    </div>

                    {description && <div className={"text-xl text-center text-secondaryText"}
                    >
                        {description}
                    </div>}
                </div>
            );
        };

        return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                className={"h-full flex flex-col items-center" +
                    justifyContent || "center" +
                    side_spacing || "0"
                }
            >
                {header()}
                <div className={props.className+ " flex flex-wrap gap-1 w-full justify-center"}>{children}</div>
            </motion.div>
        );
    };

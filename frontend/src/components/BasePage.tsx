import styled from "styled-components"

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
                <div className={"w-full p-1 text-center bg-primary rounded-xl mb-1"}>
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
            <div className={"w-full h-full flex flex-col items-center " +
                    justifyContent || "center" +
                    side_spacing || "0"
                }
            >
                {header()}
                <div className={props.className+ " flex flex-wrap gap-1 w-full justify-center"}>{children}</div>
            </div>
        );
    };

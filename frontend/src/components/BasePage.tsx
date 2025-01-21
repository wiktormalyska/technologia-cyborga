import styled from "styled-components"
import colorPalette from "../values/colorPalette";

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
    ({ children, title, description, maximum_width, maximum_height, side_spacing, justifyContent,  ...props }:
                             BasePageProps & React.HTMLAttributes<HTMLDivElement>) => {
    const header = () => {
        if (!title) return null;
        return (
            <Header>
                <Title>{title}</Title>
                {description && <Description>{description}</Description>}
            </Header>
        );
    };

    return (
        <PageBody maximum_width={maximum_width} maximum_height={maximum_height} side_spacing={side_spacing} justify_content={justifyContent}>
            {header()}
            <Body className={props.className}>{children}</Body>
        </PageBody>
    );
};

interface PageBodyProps {
    maximum_width?: string;
    maximum_height?: string;
    side_spacing?: string;
    justify_content? : string;
}

const PageBody = styled.div<PageBodyProps>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${(props) => props.justify_content || "center"};
    padding: ${(props) => props.side_spacing || "0"};
    @media (max-width: ${(props) => props.maximum_width || "768px"}) {
        padding: 1rem;
    }
`;

const Title = styled.h1`
    font-size: 2.5rem;
    text-align: center;
    font-weight: bold;
    color: ${colorPalette.text.hex};
`;

const Description = styled.p`
    font-size: 1.2rem;
    text-align: center;
    color: ${colorPalette.secondaryText.hex};
`;

const Header = styled.div`
    width: 100%;
    padding: 1rem;
    text-align: center;
    background-color: ${colorPalette.primary.hex};
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const Body = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    justify-content: center;
`;

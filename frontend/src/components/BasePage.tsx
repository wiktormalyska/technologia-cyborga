import styled from "styled-components";

interface BasePageProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
    maximum_width?: string;
    maximum_height?: string;
    side_spacing?: string;
}

export const BasePage = ({ children, title, description, maximum_width, maximum_height, side_spacing }: BasePageProps) => {
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
        <PageBody maximum_width={maximum_width} maximum_height={maximum_height} side_spacing={side_spacing}>
            {header()}
            <Body>{children}</Body>
        </PageBody>
    );
};

interface PageBodyProps {
    maximum_width?: string;
    maximum_height?: string;
    side_spacing?: string;
}

const PageBody = styled.div<PageBodyProps>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${(props) => props.side_spacing || "0"};

    @media (max-width: ${(props) => props.maximum_width || "768px"}) {
        padding: 1rem;
    }
`;

const colorPalette = {
    primary: { hex: "#2C2333" }, // Dominujący fioletowy
    secondary: { hex: "#383040" }, // Tło dla elementów
    accent: { hex: "#FFFFFF" }, // Kolor tekstu i ikon
    text: { hex: "#D0D0D0" }, // Jasnoszary tekst
    secondaryText: { hex: "#D0D0D0" },
    inputBackground: { hex: "#31293A" }, // Pole wyszukiwania
    buttonBackground: { hex: "#453651" }, // Tło przycisków
    border: { hex: "#5C4D6A" }, // Obwódki
    highlight: { hex: "#100F10" }, // Dolny pasek i cienie
};

const Title = styled.h1`
    font-size: 2.5rem;
    text-align: center;
    font-weight: bold;
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

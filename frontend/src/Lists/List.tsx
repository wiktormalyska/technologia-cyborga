import styled from "styled-components";

interface ListProps {
    children: React.ReactNode;
    view?: "grid" | "list";
}

const List = ({ children, view = "list" }: ListProps) => {
    return (
        <ListContainer view={view}>
            {children}
        </ListContainer>
    );
};

const ListContainer = styled.div<{ view: "grid" | "list" }>`
    display: ${(props) => (props.view === "grid" ? "grid" : "block")};
    grid-template-columns: ${(props) =>
            props.view === "grid"
                    ? "repeat(auto-fill, minmax(250px, 1fr))" // Dynamiczna liczba kolumn
                    : "none"};
    grid-gap: 1rem; /* Gap między elementami */

    /* Zastosowanie dla grid: */
    /* W momencie, kiedy masz więcej niż 5 elementów, zacznie dodawać kolumny */
    & > * {
        margin-bottom: 1rem;
    }

    /* Wersja na większe ekrany */
    @media (min-width: 800px) {
        grid-template-columns: repeat(4, 1fr); /* 3 kolumny na większym ekranie zmienić wdg uznania */
    }

    /* Wersja na mniejsze ekrany */
    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr); /* 2 kolumny na małym ekranie zmienić wdg uznania */
    }
`;

export default List;

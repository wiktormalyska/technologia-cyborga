import { BasePage } from "../components/BasePage";
import styled from "styled-components";
import ListGames from "../Lists/ListGames";
import ListFriends from "../Lists/ListFriends";
import ListMarketplaceItems from "../Lists/ListMarketplaceItems";

const HomePage = () => {
    return (
        <BasePage
            title="Welcome to the Home Page"
            description="Explore our features and have fun!"
            maximum_width="1200px"
            side_spacing="0rem"
        >
            <Column>
                <Tile>
                    <h3>Friends List</h3>
                    <ListFriends />
                </Tile>
            </Column>
            <Column>
                <Tile>
                    <h3>Games List</h3>
                    <ListGames />
                </Tile>
            </Column>
            <Column>
                <Tile>
                    <h3>Marketplace</h3>
                    <ListMarketplaceItems />
                </Tile>
            </Column>
        </BasePage>
    );
};

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 350px;
`;

const Tile = styled.div`
    padding: 1rem;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;

    h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
    }

    p {
        font-size: 1rem;
        color: #555;
    }
`;

export default HomePage;

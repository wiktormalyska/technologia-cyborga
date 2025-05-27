import { BasePage } from "../components/BasePage";
import GameComponent from "../components/Game";

export const GamesPage = () => {
    return (
        <BasePage title="Games" justifyContent="flex-start">
            <GameComponent />
        </BasePage>
    );
};
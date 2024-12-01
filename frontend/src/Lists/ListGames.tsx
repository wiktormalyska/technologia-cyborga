import List from "./List";

const ListGames = () => {
    const games = ["Game 1", "Game 2", "Game 3", "Game 4"]; // zmockowane

    return (
        <List view="list"> {/* Tutaj przekazujemy widok listy */}
            {games.map((game, index) => (
                <div key={index} style={{ padding: "1rem", background: "#ddd", borderRadius: "5px" }}>
                    {game}
                </div>
            ))}
        </List>
    );
};

export default ListGames;

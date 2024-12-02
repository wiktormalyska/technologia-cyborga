
import List from "./List";

const ListFriends = () => {
    const friends = ["Friend 1", "Friend 2", "Friend 3", "Friend 4", "Friend 5"]; // zmockowane

    return (
        <List> {/* Tutaj przekazujemy widok listy */}
            {friends.map((friend, index) => (
                <div key={index} style={{ padding: "1rem", background: "#ddd", borderRadius: "5px" }}>
                    {friend}
                </div>
            ))}
        </List>
    );
};

export default ListFriends;

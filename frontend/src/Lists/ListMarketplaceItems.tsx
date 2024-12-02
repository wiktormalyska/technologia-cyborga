import List from "./List";

const ListMarketplaceItems = () => {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 4"]; // zmockowane

    return (
        <List view="grid"> {/* Możemy też zastosować widok gridu */}
            {items.map((item, index) => (
                <div key={index} style={{ padding: "1rem", background: "#ddd", borderRadius: "5px" }}>
                    {item}
                </div>
            ))}
        </List>
    );
};

export default ListMarketplaceItems;

import * as React from "react";

interface ListProps {
    children: React.ReactNode;
    view?: string;
}

const List = ({children, view = "list"}: ListProps) => {
    return (
        <div
            className={`
        ${view === 'grid' ? 'grid grid-cols-auto-fill gap-4' : 'block'}
      `}
            style={{
                gridTemplateColumns:
                    view === 'grid' ? 'repeat(auto-fill, minmax(250px, 1fr))' : 'none',
            }}
        >
            {React.Children.map(children, (child) => (
                <div className="mb-4">{child}</div>
            ))}
        </div>
    );
};

export default List;

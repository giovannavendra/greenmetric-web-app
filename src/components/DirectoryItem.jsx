import React, { useMemo, useState, useContext } from "react";
import { Icon } from "semantic-ui-react";

const DirectoryItem = ({ item, path = "" }) => {
    const [open, setOpen] = useState(false);
    const id = useMemo(() => (path === "" ? item.name : `${path}/${item.name}`));

    if (item.hasOwnProperty("children"))
        return (
            <div className="directory" id={id}>
                <div onClick={() => setOpen(!open)} className="clickable">
                    <Icon color='blue' name="folder" />
                    <p>{item.name}</p>
                </div>
                {open &&
                    item.children.map((el) => (
                        <DirectoryItem item={el} key={el.name} path={id} />
                    ))}
            </div>
        );

    return (
        <div className="metric clickable" id={id}>
            <Icon color='grey' name="file" />
            <p>{item.name}</p>
        </div>
    );
};

export default DirectoryItem;

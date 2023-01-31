import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemText } from "@mui/material";
import React, { useState } from "react";
import MenuItemBox from "./index";
import List from "UIComponents/List";
import Menu from "UIComponents/Menu";

const DropdownMenu = ({ item, id, menuKey }) => {
    const { items: children } = item;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <List.Item
            disableRipple={true}
            className="posrel"
            key={menuKey}
            onClick={handleClick}
        >
            <ListItemText
                className="text-capitalize des_typography"
                primary={item.title}
                primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#3B4468",
                }}
            ></ListItemText>
            <Menu
                id={id}
                open={open}
                onClickOutside={() => setOpen(false)}
                className="menulist_position"
            >
                <Menu.MenuList className="w150">
                    {children.map((child, key) => (
                        <MenuItemBox
                            key={key}
                            item={child}
                            id={item.id}
                            menuKey={key}
                            showDivider={key < children.length - 1}
                        />
                    ))}
                </Menu.MenuList>
            </Menu>
            {open ? (
                <ExpandLess fontSize="small" />
            ) : (
                <ExpandMore fontSize="small" />
            )}
        </List.Item>
    );
};

export default DropdownMenu;

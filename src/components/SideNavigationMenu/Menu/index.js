import IconText from "UIComponents/IconText";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../IconComponent";
import { Collapse, ListItemButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import List from "UIComponents/List";

const Menu = ({ data, defaultSelected, onClose }) => {
    // console.log("data: ", data);
    const [menuData, setMenuData] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        let hasDefaultSelectedChild = false;
        const createMenuData = (data = [], level = 0) => {
            return data.map((data) => {
                const children = createMenuData(data.items, level + 1);
                let isSelected = false;
                if (data.id === defaultSelected) {
                    isSelected = true;
                    hasDefaultSelectedChild = true;
                }
                const item = {
                    data,
                    isOpen: hasDefaultSelectedChild || false,
                    isSelected,
                    children,
                };
                if (level === 0) {
                    hasDefaultSelectedChild = false;
                }
                return item;
            });
        };
        const items = createMenuData(data);
        setMenuData(items);
    }, [data, defaultSelected]);

    const handleMenuToggle = useCallback(
        (indexStack, currentLevel) => {
            let modifiedMenuData = [...menuData];
            const toggleMenu = (menuData = modifiedMenuData, level = 0) =>
                menuData.forEach((data, index) => {
                    data.isOpen =
                        indexStack.split("_")[level] === `${index}`
                            ? level < currentLevel
                                ? true
                                : !data.isOpen
                            : false;
                    if (data.children.length > 0)
                        toggleMenu(data.children, level + 1);
                });
            toggleMenu();
            setMenuData(modifiedMenuData);
        },
        [menuData]
    );
    const handleMenuSelect = useCallback(
        (selectedItemIndexStack) => {
            let modifiedMenuData = [...menuData];
            const selectMenu = (menuData = modifiedMenuData, indexStack = "") =>
                menuData.forEach((data, index) => {
                    const idxStack =
                        indexStack + (indexStack.length > 0 ? "_" : "") + index;
                    data.isSelected =
                        selectedItemIndexStack === idxStack ? true : false;
                    if (data.children.length > 0)
                        selectMenu(data.children, idxStack);
                });
            selectMenu();
            setMenuData(modifiedMenuData);
            onClose?.();
        },
        [menuData, onClose]
    );

    const getMenu = useCallback(
        (items = menuData, indexStack = "", level = 0) =>
            items.map(({ data, isSelected, isOpen, children }, index) => {
                const idxStack =
                    indexStack + (indexStack.length > 0 ? "_" : "") + index;
                if (children?.length === 0) {
                    return (
                        <ListItemButton
                            key={data.title}
                            component={NavLink}
                            to={data?.path ?? ""}
                            sx={{ pl: `${10 * (level + 1)}px` }}
                            className={isSelected ? "selected" : ""}
                            onClick={() => handleMenuSelect(idxStack)}
                        >
                            <IconText>
                                <Icon type={data?.icon} />
                                <span>{data.title}</span>
                            </IconText>
                        </ListItemButton>
                    );
                }
                let childrenItems = getMenu(children, idxStack, level + 1);
                return (
                    <React.Fragment key={data.title}>
                        <ListItemButton
                            sx={{ pl: `${10 * (level + 1)}px` }}
                            onClick={() => handleMenuToggle(idxStack, level)}
                        >
                            <IconText className="fgrow">
                                <Icon type={data?.icon} />
                                <span>{data.title}</span>
                            </IconText>
                            {isOpen ? (
                                <ExpandLess sx={{ fontSize: "20px" }} />
                            ) : (
                                <ExpandMore sx={{ fontSize: "20px" }} />
                            )}
                        </ListItemButton>
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {childrenItems}
                            </List>
                        </Collapse>
                    </React.Fragment>
                );
            }),
        [handleMenuSelect, handleMenuToggle, menuData]
    );

    useEffect(() => {
        setMenuItems(getMenu());
    }, [getMenu, menuData]);

    return (
        <List
            component="nav"
            className="menu overflow-auto"
            aria-labelledby="Side Navigation Menu"
        >
            {menuItems}
        </List>
    );
};

export default Menu;

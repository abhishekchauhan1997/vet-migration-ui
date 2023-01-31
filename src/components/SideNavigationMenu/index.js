import { useEffect, useState, useRef, useContext } from "react";
import Drawer from "UIComponents/Drawer";
import SideMenu from "dummyData/menubar.json";
import { Divider, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import List from "UIComponents/List";
import { Close } from "@mui/icons-material";
import Icon from "../IconComponent";
import Menu from "./Menu";
import "./sideNavigationMenu_styles.scss";
import useGetPageDataContext from "hooks/usePageDataContext";
import { PermissionContext } from "context/permissionContext";

export const MenuHeader = ({ title, onClose, onClick, ...props }) => {
    return (
        <>
            <ListItem
                className="w100"
                disablePadding
                secondaryAction={
                    <Close
                        edge="end"
                        style={{ color: "#616886" }}
                        className="curP"
                        onClick={() => onClose()}
                    />
                }
            >
                <List.Item
                    onClick={
                        onClick &&
                        (() => {
                            onClose();
                            onClick();
                        })
                    }
                    disabled={props.disabled}
                >
                    <ListItemText
                        primary={title}
                        primaryTypographyProps={{
                            color: "#3b4468",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                        }}
                    />
                </List.Item>
            </ListItem>
        </>
    );
};

const MenuFooter = () => {
    return (
        <div className="menu_footer">
            <List>
                <List.Item className="menu_footer_header">Vetport</List.Item>
                <List.Item className="menu_footer_item">
                    <ListItemIcon className="minW25">
                        <Icon type="help" />
                    </ListItemIcon>
                    <ListItemText
                        primary=" Vetport help centre"
                        primaryTypographyProps={{
                            color: "#3b4468",
                            fontSize: "15px",
                        }}
                    />
                </List.Item>
            </List>
            <div
                className="menu_footer_cont"
                style={{ padding: "10px 20px 0px" }}
            >
                <div> Terms of service</div>
                <div style={{ flexBasis: "144px" }}> Privacy Policy</div>
            </div>
            <div
                className="menu_footer_cont"
                style={{ padding: "10px 20px 20px" }}
            >
                <div> Sales Policy</div>
                <div> Licence Acknowledgement</div>
            </div>
        </div>
    );
};

const SideNavigationMenu = ({ onClose, openDrawer, title, openClinic }) => {
    const { loggedInUser } = useGetPageDataContext();
    const { permissions } = useContext(PermissionContext);

    const [menu] = useState(SideMenu);
    const dataRef = useRef();
    const [menuStackUrls, setMenuStackUrls] = useState([]);

    useEffect(() => {
        // for filtering a module/submodule/page from all the page urls
        const filteredArray = (element) => {
            let urlArray = [...menuStackUrls];
            let result = urlArray?.filter((data) => {
                return data?.path === element?.path && data?.allow;
            });
            return result;
        };

        if (menuStackUrls?.length > 0) {
            let items = [];
            // loop through menubar json and filter it's path from the array of menu stack urls
            for (var i in menu) {
                let module = menu[i];
                // module level
                // if module has no sub modules then,
                // check if it exists menu stack urls and it is checked or allowed
                // if allowed then push into items array along with its module
                if (
                    module?.path &&
                    (!module?.items || module?.items?.length === 0)
                ) {
                    let filteredModule = filteredArray(module);
                    if (filteredModule?.length > 0) {
                        items.push({ ...filteredModule[0], icon: module.icon });
                    }
                } else {
                    // if module has sub modules
                    let module_items = [];
                    //loop through sub modules
                    for (let b = 0; b < module.items.length; b++) {
                        const sub_module = module.items[b];
                        // if sub_module has no pages then,
                        // check if it exists menu stack urls and it is checked or allowed
                        // if allowed then push into items array along with its module
                        if (
                            sub_module?.path &&
                            (!sub_module?.items ||
                                sub_module?.items?.length === 0)
                        ) {
                            let filteredSubmodule = filteredArray(sub_module);

                            if (filteredSubmodule?.length > 0) {
                                module_items.push({
                                    ...filteredSubmodule[0],
                                    icon: sub_module.icon,
                                });
                            }
                        } else {
                            // if sub modules has pages loop through them and
                            // check if it exists menu stack urls and it is checked or allowed
                            // if allowed then push into items array along with its sub modules
                            let sub_module_items = [];

                            for (let b = 0; b < sub_module.items.length; b++) {
                                const page = sub_module.items[b];
                                let filteredPage = filteredArray(page);
                                if (filteredPage?.length > 0) {
                                    sub_module_items.push({
                                        ...filteredPage[0],
                                        icon: page.icon,
                                    });
                                }
                            }

                            module_items.push({
                                ...sub_module,
                                items: sub_module_items,
                            });
                        }
                    }
                    items.push({ ...module, items: module_items });
                }
            }
            if (items?.length > 0) {
                let finalData = items.filter(function f(o) {
                    if (o.items) {
                        return (o.items = o.items.filter(f)).length > 0;
                    } else {
                        return true;
                    }
                });
                // setData(menu);
                // dataRef.current = menu;
                dataRef.current = finalData;
            }
        }
    }, [menuStackUrls, menu]);

    useEffect(() => {
        const updateUrls = (permissions) => {
            // console.log("permissions: ", permissions);
            if (permissions.length > 0) {
                let perms = [...permissions];
                let urls = [];
                //loop through the permissions to create urls array from modules, sub modules and pages
                for (let i = 0; i < perms.length; i++) {
                    const elem = perms[i];
                    // if modules has sub modules
                    if (
                        elem?.hasOwnProperty("items") &&
                        elem.items.length > 0
                    ) {
                        elem.items.forEach(async (child, n) => {
                            // if submodules has no pages
                            if (!child?.items || child?.items?.length === 0) {
                                urls.push(child);
                            } else {
                                // if sub modules has pages
                                child.items.forEach(async (child_item, p) => {
                                    if (
                                        !child_item?.items ||
                                        child_item?.items?.length === 0
                                    ) {
                                        urls.push(child_item);
                                    }
                                });
                            }
                        });
                    } else {
                        // if modules has no sub modules
                        urls.push(elem);
                    }
                }
                // setMenuStack(urls);
                setMenuStackUrls(urls);
                // console.log("urls: ", urls);
            } else {
                // console.log("loggedInUser: ", loggedInUser);
                if (loggedInUser?.userGroup) {
                    if (loggedInUser?.userGroup) {
                        dataRef.current = [];
                    } else {
                        dataRef.current = menu;
                    }
                }
            }
        };
        if (process.env.NODE_ENV !== "development") {
            updateUrls(permissions);
        }
    }, [loggedInUser, menu, permissions]);

    return (
        <Drawer
            isOpen={openDrawer}
            onClose={onClose}
            className="sideNavigationMenu"
        >
            <MenuHeader title={title} onClose={onClose} onClick={openClinic} />
            <Divider />
            <Menu
                data={dataRef.current ?? menu}
                defaultSelected="facility Management"
                onClose={onClose}
            />
            <Divider />
            <MenuFooter />
        </Drawer>
    );
};

export default SideNavigationMenu;

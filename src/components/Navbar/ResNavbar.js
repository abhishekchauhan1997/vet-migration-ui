import React from "react";
import { NavLink } from "react-router-dom";
import { Divider, ListItem, ListItemText } from "@mui/material";
import List from "UIComponents/List";
import { useState } from "react";
import { Close, MenuOpen } from "@mui/icons-material";
import resNavs from "dummyData/responsiveHeader.json";
import Drawer from "UIComponents/Drawer";
import { screens } from "utils/constants";

const ResNavbar = ({ width }) => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const toggleDrawer = () => {
        setToggleMenu((currOpenState) => !currOpenState);
    };

    return (
        <nav className="flexC" id="sm_screen_navbar">
            {width >= screens.tablet && width < screens.desktop && (
                <List className="padding-none" id="sm_navlinks">
                    {resNavs.map((nav) => {
                        return (
                            nav.isAppIntegrated && (
                                <List.Item
                                    component={NavLink}
                                    to={nav?.path ?? ""}
                                    disableGutters={true}
                                    key={nav.title}
                                    className="posrel list_item_padd text-ellipsis"
                                >
                                    <ListItemText
                                        className="text-capitalize"
                                        primary={nav.title}
                                        primaryTypographyProps={{
                                            fontSize: "13px",
                                            fontWeight: "600",
                                            color: "#3B4468",
                                        }}
                                    ></ListItemText>
                                </List.Item>
                            )
                        );
                    })}
                </List>
            )}
            {width < screens.tablet && (
                <div className="posrel">
                    {!toggleMenu && (
                        <MenuOpen
                            id="sm_screen_menbar"
                            onClick={toggleDrawer}
                            className="font_clrTheme bold"
                        />
                    )}
                    <Drawer
                        isOpen={toggleMenu}
                        onClose={toggleDrawer}
                        className="overflow-auto maxVH"
                        isPositionRight={true}
                    >
                        <List>
                            <ListItem
                                className="w100 pt8"
                                secondaryAction={
                                    <Close
                                        edge="end"
                                        style={{ color: "#616886" }}
                                        className="curP"
                                        onClick={toggleDrawer}
                                    />
                                }
                            ></ListItem>
                            {resNavs.map((nav, index) => {
                                return (
                                    nav.isAppIntegrated && (
                                        <React.Fragment key={nav.title}>
                                            <List.Item
                                                component={NavLink}
                                                to={nav?.path ?? ""}
                                                className="posrel"
                                            >
                                                <ListItemText
                                                    className="text-capitalize"
                                                    primary={nav.title}
                                                    primaryTypographyProps={{
                                                        fontSize: "13px",
                                                        fontWeight: "600",
                                                        color: "#3B4468",
                                                    }}
                                                ></ListItemText>
                                            </List.Item>
                                            {resNavs.length ===
                                            index + 1 ? null : (
                                                <Divider />
                                            )}
                                        </React.Fragment>
                                    )
                                );
                            })}
                        </List>
                    </Drawer>
                </div>
            )}
        </nav>
    );
};
export default ResNavbar;

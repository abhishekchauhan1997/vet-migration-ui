import { ListItemText } from "@mui/material";
import List from "UIComponents/List";
import navlinks from "dummyData/header.json";
import MenuItemBox from "../DropdownMenus/index";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <List
            id="lg_screen_navbar"
            component="nav"
            className="navbar padding-none"
        >
            {navlinks.map((nav, index) => {
                if (nav.isDropdownMenu && nav.isAppIntegrated) {
                    return (
                        <MenuItemBox
                            item={nav}
                            id={nav.id}
                            key={nav?.title}
                            menuKey={nav?.title}
                            showDivider={index < navlinks.length - 1}
                        />
                    );
                }
                return (
                    nav.isAppIntegrated && (
                        // <NavLink to={nav?.path} key={nav?.title}>
                        <List.Item
                            to={nav?.path}
                            key={nav?.title}
                            component={NavLink}
                            disableRipple={true}
                            className="posrel text-ellipsis"
                        >
                            <ListItemText
                                className="text-capitalize"
                                primary={nav.title}
                                primaryTypographyProps={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#3B4468",
                                }}
                            ></ListItemText>
                        </List.Item>
                        // </NavLink>
                    )
                );
            })}
        </List>
    );
};
export default Navbar;

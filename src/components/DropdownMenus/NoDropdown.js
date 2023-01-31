import { Divider } from "@mui/material";
import Icon from "components/IconComponent";
import { NavLink } from "react-router-dom";
import Menu from "UIComponents/Menu";

const NoDropdown = ({ item, menukey, showDivider = true, showIcon }) => {
    return (
        <>
            {item.length === menukey + 1 ? (
                <NavLink style={{ fontSize: "14px" }} to={item?.path ?? ""}>
                    <Menu.MenuItem className="justifyC font_clrTheme medium">
                        <div>
                            {showIcon && <Icon type={item?.icon} />}
                            {item?.title}
                        </div>
                    </Menu.MenuItem>
                </NavLink>
            ) : (
                <>
                    <NavLink style={{ fontSize: "14px" }} to={item?.path ?? ""}>
                        <Menu.MenuItem className="justifyC font_clrTheme medium">
                            <div>
                                {showIcon && <Icon type={item?.icon} />}
                                {item?.title}
                            </div>{" "}
                        </Menu.MenuItem>
                    </NavLink>
                    {showDivider && <Divider />}
                </>
            )}
        </>
    );
};

export default NoDropdown;

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import Icon from "components/IconComponent";

export const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

export default function CustomizedMenus({
    id,
    items,
    showIcon = false,
    component,
    children,
    endIcon = false,
    multiplier = 4.5,
    width = "20ch",
    handleItemClick,
    ...props
}) {
    const Tag = component;
    let ITEM_HEIGHT = 32;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (item) => {
        handleItemClick?.(item, id);
        handleClose();
    };

    return (
        <Box>
            <Tag
                id={props.id}
                aria-controls={open ? "customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                // disableElevation
                onClick={handleClick}
                {...(endIcon && {
                    endIcon: (
                        <KeyboardArrowDownIcon style={{ marginTop: "-1px" }} />
                    ),
                })}
                {...(props?.color && {
                    style: {
                        color: props?.color,
                    },
                })}
                {...(props?.style && {
                    style: {
                        ...props?.style,
                    },
                })}
                {...props}
            >
                {children ?? null}
            </Tag>
            <StyledMenu
                id="customized-menu"
                MenuListProps={{
                    "aria-labelledby": "customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * multiplier,
                        width: width,
                    },
                }}
            >
                {items?.length !== 0 ? (
                    items?.map((item, index) => (
                        <Box key={item._id ?? index} sx={{ height: "32px" }}>
                            <MenuItem
                                dense={true}
                                onClick={() => handleMenuItemClick(item)}
                                disableRipple
                                disableGutters
                                disabled={item?.disabled}
                                component={NavLink}
                                to={item?.path ?? ""}
                                state={item.state ?? null}
                            >
                                {showIcon && <Icon type={item?.icon} />}
                                <span
                                    style={{
                                        marginLeft: "8px",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {item.name ?? item.title}
                                </span>
                            </MenuItem>
                            {index < items.length - 1 && (
                                <Divider
                                    style={{
                                        marginBottom: 0,
                                        marginTop: 0,
                                    }}
                                />
                            )}
                        </Box>
                    ))
                ) : (
                    <MenuItem onClick={handleClose} disableRipple>
                        No Results
                    </MenuItem>
                )}
            </StyledMenu>
        </Box>
    );
}

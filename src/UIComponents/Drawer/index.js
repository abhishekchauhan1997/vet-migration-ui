import React from "react";
import classnames from "classnames";
import { Drawer as MuiDrawer } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./drawer_styles.scss";

const theme = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                root: {
                    "& .MuiDrawer-paper": {
                        width: "inherit",
                    },
                },
            },
        },
    },
});

const Drawer = ({
    children,
    className,
    isOpen = false,
    onClose = () => {},
    isPositionRight = false,
}) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiDrawer
                anchor={isPositionRight ? "right" : "left"}
                open={isOpen}
                onClose={onClose}
                className={classnames("des_drawer", className)}
            >
                {children}
            </MuiDrawer>
        </ThemeProvider>
    );
};

Drawer.Head = ({ children, className }) => (
    <div className={classnames("des_drawerHeader", className)}>{children}</div>
);

Drawer.Body = ({ children, className }) => (
    <div className={classnames("des_drawerBody", className)}>{children}</div>
);

Drawer.Footer = ({ children, className }) => (
    <div className={classnames("des_drawerFooter", className)}>{children}</div>
);

export default Drawer;

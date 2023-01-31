import React from "react";
import classnames from "classnames";
import { IconButton as MuiIconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "#3b4468",
                    "&:not(.defaultColor) .icon": {
                        color: "inherit",
                    },
                },
            },
        },
    },
});
const IconButton = (
    { children, className, defaultColor = false, ...props },
    ref
) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiIconButton
                {...props}
                ref={ref}
                className={classnames("des_iconbutton", className, {
                    defaultColor,
                })}
            >
                {children}
            </MuiIconButton>
        </ThemeProvider>
    );
};

export default React.forwardRef(IconButton);

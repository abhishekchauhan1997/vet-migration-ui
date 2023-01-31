import React from "react";
import classnames from "classnames";
import { Paper as MuiPaper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    color: "#3b4468",
                },
                elevation1: {
                    boxShadow: " 0px 0px 10px rgba(0, 0, 0, 0.15)",
                },
            },
        },
    },
});

const Paper = ({ children, className, ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiPaper {...props} className={classnames("des_paper", className)}>
                {children}
            </MuiPaper>
        </ThemeProvider>
    );
};

export default Paper;

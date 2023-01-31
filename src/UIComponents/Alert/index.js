import { Alert as MuiAlert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
    components: {
        MuiAlert: {
            styleOverrides: {
                root: {
                    "&.MuiAlert-root": {},
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    color: "#3b4468",
                },
                elevation5: {
                    boxShadow: " 0px 0px 10px rgba(0, 0, 0, 0.35)",
                },
            },
        },
    },
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return (
        <ThemeProvider theme={theme}>
            <MuiAlert
                elevation={5}
                ref={ref}
                // variant="filled"
                sx={{ width: "100%" }}
                {...props}
            />
        </ThemeProvider>
    );
});

export default Alert;

import React from "react";
import {
    Dialog as MuiDialog,
    DialogContent as MuiDialogContent,
    DialogActions as MuiDialogActions,
    DialogTitle as MuiDialogTitle,
    DialogContentText as MuiDialogContentText,
    useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classnames from "classnames";
const theme = createTheme({
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    padding: 0,
                    "& .dialogHeader": {
                        display: "flex",
                        color: "#3b4468",
                        alignItems: "center",
                        padding: "15px 20px",
                        "& .MuiDialogActions-root": {
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                            ".icon": {
                                width: "18px",
                                height: "18px",
                            },
                        },
                        "& .MuiDialogActions-root, & .MuiDialogTitle-root": {
                            padding: 0,
                        },
                    },
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: "1rem",
                    fontWeight: "bold",
                    lineHeight: "1.875",
                    padding: "15px 20px",
                    textTransform: "capitalize",
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: "20px",
                    color: "#3B4468",
                    scrollBehavior: "smooth",
                },

                dividers: {
                    borderTop: "1px solid #E5E8F5",
                    borderBottom: "1px solid #E5E8F5",
                },
            },
        },
        MuiDialogContentText: {
            styleOverrides: {
                root: {
                    color: "#3B4468",
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: "15px 20px",
                },
            },
        },
    },
});

const Dialog = ({
    fullWidth = true,
    maxWidth = "md",
    scroll = "paper",
    fullScreen,
    children,
    ...props
}) => {
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <ThemeProvider theme={theme}>
            <MuiDialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                scroll={scroll}
                fullScreen={fullScreen ?? fullScreenDialog}
                {...props}
            >
                {children}
            </MuiDialog>
        </ThemeProvider>
    );
};
Dialog.DialogHeader = ({ className = "", children, ...props }) => {
    return (
        <div {...props} className={classnames("dialogHeader", className)}>
            {children}
        </div>
    );
};

Dialog.DialogTitle = ({ ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiDialogTitle {...props} />
        </ThemeProvider>
    );
};
Dialog.DialogContent = ({ ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiDialogContent dividers {...props} />
        </ThemeProvider>
    );
};
Dialog.DialogContentText = ({ ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiDialogContentText {...props} />
        </ThemeProvider>
    );
};
Dialog.DialogActions = ({ ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiDialogActions {...props} />
        </ThemeProvider>
    );
};

// TODO: make all as named export
// export { Dialog, DialogHeader, DialogTitle, DialogContent, DialogContentText, DialogActions };

export default Dialog;

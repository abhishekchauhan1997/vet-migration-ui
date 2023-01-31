import React from "react";
import classnames from "classnames";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiLoadingButton: {
            styleOverrides: {
                root: {
                    cursor: "pointer",
                    padding: "8px 10px",
                    lineHeight: " 14px",
                    borderRadius: " 3px",
                    fontSize: " 0.875rem",
                    fontFamily: " inherit",
                    letterSpacing: " 0.05em",
                    textTransform: "initial",
                    minWidth: "68px",
                    "&.Mui-disabled": {
                        "&.Mui-disabled": {
                            color: "#fff",
                            opacity: 0.65,
                            cursor: "not-allowed",
                        },
                    },
                },
                textSizeMedium: {
                    "&:not(.defaultColor)": {
                        fontWeight: 600,
                        color: "#3b4468",
                    },
                },
                textSizeSmall: {
                    "&:not(.defaultColor)": {
                        color: "#3b4468",
                    },
                    padding: "2px 5px",
                },
                contained: {
                    color: "#fff",
                    border: "none",
                    boxShadow:
                        "0px 3px 1px -2px rgb(32 75 226 / 20%), 0px 2px 2px 0px rgb(32 75 226 / 14%), 0px 1px 5px 0px rgb(32 75 226 / 12%)",
                    background:
                        "linear-gradient(85.97deg, #6e8dfb 0%, #52a3ff 100%)",
                    "&:hover": {
                        boxShadow:
                            "0px 2px 4px -1px rgb(32 75 226 / 30%), 0px 4px 5px 0px rgb(32 75 226 / 14%), 0px 1px 10px 0px rgb(32 75 226 / 12%)",
                    },
                    "&.Mui-focusVisible": {
                        boxShadow:
                            "0px 3px 5px -1px rgb(32 75 226 / 20%), 0px 6px 10px 0px rgb(32 75 226 / 14%), 0px 1px 18px 0px rgb(32 75 226 / 12%)",
                    },
                    "&:active": {
                        boxShadow:
                            "0px 5px 5px -3px rgb(32 75 226 / 20%), 0px 8px 10px 1px rgb(32 75 226 / 14%), 0px 3px 14px 2px rgb(32 75 226 / 12%)",
                    },
                },
                containedWarning: {
                    background:
                        "linear-gradient(85.97deg, #ff571a 0%, #ff7f00 100%)",
                    boxShadow:
                        "0px 3px 1px -2px rgb(230 61 0 / 20%), 0px 2px 2px 0px rgb(230 61 0 / 14%), 0px 1px 5px 0px rgb(230 61 0 / 12%)",

                    "&:hover": {
                        boxShadow:
                            "0px 2px 4px -1px rgb(230 61 0 / 20%), 0px 4px 5px 0px rgb(230 61 0 / 14%), 0px 1px 10px 0px rgb(230 61 0 / 12%)",
                    },
                    "&.Mui-focusVisible": {
                        boxShadow:
                            "0px 3px 5px -1px rgb(230 61 0 / 20%), 0px 6px 10px 0px rgb(230 61 0 / 14%), 0px 1px 18px 0px rgb(230 61 0 / 12%)",
                    },
                    "&:active": {
                        boxShadow:
                            "0px 5px 5px -3px rgb(230 61 0 / 20%), 0px 8px 10px 1px rgb(230 61 0 / 14%), 0px 3px 14px 2px rgb(230 61 0 / 12%)",
                    },
                },

                containedError: {
                    background:
                        "linear-gradient(85.97deg, #d42811 0%, #f05742 100%)",
                    boxShadow:
                        "0px 3px 1px -2px rgb(165 31 13 / 20%), 0px 2px 2px 0px rgb(165 31 13 / 14%), 0px 1px 5px 0px rgb(165 31 13 / 12%)",

                    "&:hover": {
                        boxShadow:
                            "0px 2px 4px -1px rgb(165 31 13 / 20%), 0px 4px 5px 0px rgb(165 31 13 / 14%), 0px 1px 10px 0px rgb(165 31 13 / 12%)",
                    },
                    "&.Mui-focusVisible": {
                        boxShadow:
                            "0px 3px 5px -1px rgb(165 31 13 / 20%), 0px 6px 10px 0px rgb(165 31 13 / 14%), 0px 1px 18px 0px rgb(165 31 13 / 12%)",
                    },
                    "&:active": {
                        boxShadow:
                            "0px 5px 5px -3px rgb(165 31 13 / 20%), 0px 8px 10px 1px rgb(165 31 13 / 14%), 0px 3px 14px 2px rgb(165 31 13 / 12%)",
                    },
                },
                startIcon: {
                    "&.MuiButton-startIcon": {
                        marginTop: "-2px",
                    },
                },
                outlinedSecondary: {
                    color: "#3b4468",
                    fontWeight: "bold",
                    borderColor: "#d8dae1",
                    "&:hover": {
                        borderColor: "#d8dae1",
                        backgroundColor: "#fff",
                        boxShadow:
                            "0px 2px 4px -1px rgb(194 198 208 / 30%), 0px 4px 5px 0px rgb(194 198 208 / 14%), 0px 1px 10px 0px rgb(194 198 208 / 12%)",
                    },
                    "&.Mui-focusVisible": {
                        boxShadow:
                            "0px 3px 5px -1px rgb(194 198 208 / 20%), 0px 6px 10px 0px rgb(194 198 208 / 14%), 0px 1px 18px 0px rgb(194 198 208 / 12%)",
                    },
                    "&:active": {
                        boxShadow:
                            "0px 5px 5px -3px rgb(194 198 208 / 20%), 0px 8px 10px 1px rgb(194 198 208 / 14%), 0px 3px 14px 2px rgb(194 198 208 / 12%)",
                    },
                },
            },
        },
    },
});

const LoadingButton = ({
    children,
    variant,
    className,
    defaultColor = false,
    ...props
}) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiLoadingButton
                {...props}
                variant={variant ?? "contained"}
                className={classnames("des_button", className, {
                    defaultColor,
                })}
            >
                {children}
            </MuiLoadingButton>
        </ThemeProvider>
    );
};

export default LoadingButton;

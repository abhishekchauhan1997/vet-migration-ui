import React from "react";
import {
    Input as MuiInput,
    InputLabel as MuiInputLabel,
    TextField as MuiTextField,
    FormControl as MuiFormControl,
    FormLabel as MuiFormLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classnames from "classnames";

const theme = createTheme({
    components: {
        MuiFormControl: {
            styleOverrides: {
                root: {
                    "&.MuiFormControl-root": {
                        color: "#3B4468",
                        whiteSpace: " break-spaces",
                        gridRowGap: "10px",
                        alignItems: "baseline",
                        justifyContent: "center",
                        padding: " 8px 0px",
                        "&.textFieldFullWidth": {
                            width: "100%",
                            ".MuiInputBase-root": {
                                width: "100%",
                            },
                        },
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    paddingBlock: "8px",
                    "&.MuiFormLabel-root": {
                        color: "#3B4468",
                    },
                    "&.Mui-error": {
                        "&.Mui-error": {
                            color: "#DF514C",
                        },
                    },
                },
                asterisk: {
                    "&.MuiFormLabel-asterisk": {
                        color: "#DF514C",
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    "&.MuiInput-root": {
                        width: "100%",
                        minHeight: "30px",
                        border: "1px solid #DADFF1",
                        background: "#F5F6FA",
                        color: "#3b4468",
                        borderRadius: "3px",
                        marginTop: "0px",
                    },
                    "&.Mui-error": {
                        "&.Mui-error": {
                            border: "1px solid #DF514C",
                        },
                    },
                },
                fullWidth: {
                    "&.MuiInput-fullWidth": {
                        width: "100%",
                    },
                },
                input: {
                    "&.MuiInput-input": {
                        padding: "3.5px 8px",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.MuiInputLabel-root": {
                        color: "#3B4468",
                        whiteSpace: " break-spaces",
                    },
                    "&.Mui-required": {
                        color: "#3B4468",
                    },
                },
                asterisk: {
                    "&.MuiInputLabel-asterisk": {
                        color: "#DF514C",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "&.MuiTextField-root": {
                        // width: "100%",
                        color: "#3b4468",
                        borderRadius: "3px",
                    },
                    "&.MuiFormControl-root": {
                        padding: "0px 0px",
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                    },
                    "& label.Mui-focused": {},
                    "& .MuiInput-underline:after": {
                        borderBottomColor: "",
                    },
                    "& .MuiOutlinedInput-root": {
                        color: "#3b4468",
                        padding: "3.5px 8px",
                        background: "#F5F6FA",
                        minHeight: "30px",
                        "& fieldset": {
                            border: "1px solid #DADFF1",
                            borderRadius: "3px",
                        },
                        "&:hover fieldset": {
                            borderColor: "#DADFF1",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#DADFF1",
                        },
                        "&.Mui-error fieldset": {
                            // borderColor: "#DADFF1",
                        },
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-input": {
                        paddingBlock: "0px",
                        padding: "0px",
                    },
                    "&.MuiOutlinedInput-notchedOutline": {
                        borderColor: "none",
                    },
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    "&.MuiInputAdornment-root": {
                        color: "#3b4468",
                    },
                },
            },
        },
    },
});

const Input = ({ _testingClassName_, inputProps, ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiInput
                {...props}
                fullWidth
                disableUnderline={true}
                inputProps={{
                    autoComplete: "off",
                    ...inputProps,
                    className: classnames(
                        _testingClassName_
                            ? `Sel-${_testingClassName_}-input`
                            : "",
                        inputProps?.className
                    ),
                }}
            />
        </ThemeProvider>
    );
};
Input.InputLabel = ({ ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiInputLabel {...props} />
        </ThemeProvider>
    );
};

Input.TextField = ({ className, textFieldFullWidth, ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiTextField
                {...props}
                className={classnames(className, { textFieldFullWidth })}
            />
        </ThemeProvider>
    );
};
Input.FormControl = ({ ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiFormControl {...props} />
        </ThemeProvider>
    );
};
Input.FormLabel = ({ ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiFormLabel {...props} />
        </ThemeProvider>
    );
};

export default Input;

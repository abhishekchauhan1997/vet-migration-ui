import React from "react";
import { CircularProgress, TextField as MuiTextField } from "@mui/material/";
import { Autocomplete as MuiAutocomplete } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "../Paper";

const theme = createTheme({
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    "&.MuiAutocomplete-root": {
                        width: "100%",
                        minHeight: "30px",
                        background: "#F5F6FA",
                    },
                },
                input: {
                    "&.MuiAutocomplete-input": {
                        padding: "3.5px 16px",
                        color: "#3b4468",
                        borderBottom: "none",
                        height: "100%",
                        textTransform: "capitalize",
                    },
                },
                option: {
                    "&.MuiAutocomplete-option": {
                        color: "#3b4468",
                        textTransform: "capitalize",
                    },
                },
                loading: {
                    "&.MuiAutocomplete-loading": {
                        color: "#3b4468",
                    },
                },
                noOptions: {
                    "&.MuiAutocomplete-noOptions": {
                        color: "#3b4468",
                    },
                },
                hasClearIcon: {
                    "&.MuiAutocomplete-hasClearIcon": {
                        color: "rgb(97, 104, 134)",
                    },
                },
                hasPopupIcon: {
                    "&.MuiAutocomplete-hasPopupIcon": {
                        color: "rgb(97, 104, 134)",
                    },
                },
                popupIndicatorOpen: {
                    "&.MuiAutocomplete-popupIndicatorOpen": {
                        color: "rgb(97, 104, 134)",
                    },
                },
                clearIndicator: {
                    "&.MuiAutocomplete-clearIndicator": {
                        color: "rgb(97, 104, 134)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& label.Mui-focused": {},
                    "& .MuiInput-underline:after": {
                        borderBottomColor: "",
                    },
                    "& .MuiOutlinedInput-root": {
                        color: "#3b4468",
                        padding: "2px !important",
                        paddingLeft: "0",
                        textTransform: "capitalize",
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
                    },
                },
            },
        },
    },
});

const Autocomplete = ({
    options,
    id,
    className = "",
    handleChange,
    ...props
}) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiAutocomplete
                {...props}
                className={className}
                id={id}
                options={options}
                fullWidth
                PaperComponent={Paper}
                renderInput={(params) => (
                    <MuiTextField
                        {...params}
                        placeholder={props.placeholder}
                        name={props.name}
                        error={props.error ? true : false}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: "off",
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {props?.loading ? (
                                        <CircularProgress
                                            size={16}
                                            style={{
                                                position: "absolute",
                                                right: "38px",
                                                color: "#3b4468",
                                            }}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                value={props.value}
                onChange={handleChange}
                noOptionsText="No results found"
                multiple={props.multiple}
                getOptionLabel={
                    props.getOptionLabel ??
                    ((option) => {
                        if (typeof option === "string") return option;
                        if (option.inputValue) return option.inputValue;
                        return option.title;
                    })
                }
                getOptionDisabled={
                    props.getOptionDisabled ??
                    ((option) => option.id === "no_results")
                }
            />
        </ThemeProvider>
    );
};

export default Autocomplete;

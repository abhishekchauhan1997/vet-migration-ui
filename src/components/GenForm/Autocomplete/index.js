import React, { useEffect, useRef } from "react";
import {
    CircularProgress,
    FormHelperText,
    TextField as MuiTextField,
    useFormControl,
} from "@mui/material/";
import { Autocomplete as MuiAutocomplete } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "UIComponents/Paper";
import { useFormContext } from "context/FormContext";
import { useFormControlErrorContext } from "context/FormControlErrorContext";

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
                inputRoot: {
                    paddingBlock: "3px",
                    minHeight: "30px",
                },
                input: {
                    "&.MuiAutocomplete-input": {
                        padding: "0.5px 16px",
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
                        paddingBlock: "2px",
                        // paddingLeft: "0",
                        textTransform: "capitalize",
                        "& fieldset": {
                            border: "1px solid #e1e6ea",
                            borderRadius: "3px",
                        },
                        "&:hover:not(.Mui-error) fieldset": {
                            borderColor: "#d0d7de",
                        },
                        "&.Mui-focused:not(.Mui-error) fieldset": {
                            borderColor: "#d0d7de",
                        },
                        "&.Mui-focused.Mui-error fieldset": {
                            borderWidth: 1,
                        },
                    },
                },
            },
        },
    },
});

const Autocomplete = ({
    id,
    value,
    multiple,
    onChange,
    helperText,
    options = [],
    className = "",
    useValueAsIs = false,
    ...props
}) => {
    const autocompleteRef = useRef([]);
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    // const error = errorFields.includes(id);
    const error = errorFields.some((item) => item.id === id);

    const handleAutocompleteChange = (_e, values) => {
        autocompleteRef.current = values.map((value) => value._id ?? value);
    };

    useEffect(() => {
        fieldCollector((getElement) => ({
            id: id,
            required,
            value: useValueAsIs
                ? value
                : value ??
                  (multiple ? autocompleteRef.current : getElement(id).value),
        }));
    }, [id, fieldCollector, multiple, value, required, useValueAsIs]);

    useEffect(() => {
        if (multiple && props?.defaultValue?.length > 0) {
            autocompleteRef.current = [...props.defaultValue];
        }
    }, [multiple, props?.defaultValue]);

    useEffect(() => {
        if (required) {
            setError(error);
        }
    }, [required, error, setError]);

    return (
        <ThemeProvider theme={theme}>
            <MuiAutocomplete
                className={className}
                id={id}
                options={options}
                fullWidth
                selectOnFocus
                clearOnBlur
                clearOnEscape
                PaperComponent={Paper}
                renderInput={(params) => (
                    <MuiTextField
                        {...params}
                        placeholder={props.placeholder}
                        name={props.name}
                        error={error}
                        inputProps={{
                            ...params.inputProps,
                            required: false,
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
                value={value}
                onChange={
                    onChange ?? (multiple ? handleAutocompleteChange : null)
                }
                noOptionsText="No results found"
                multiple={multiple}
                getOptionLabel={(option) => {
                    // ** e.g value selected with enter, right from the input,  freesolo
                    if (typeof option === "string") {
                        return option ? option : "";
                    }
                    if (option.inputValue) {
                        return option.inputValue; //** on input change
                    }
                    return option.title ?? option.name; // ** options selected
                }}
                {...props}
            />
            {error && <FormHelperText error>{helperText}</FormHelperText>}
        </ThemeProvider>
    );
};

export default Autocomplete;

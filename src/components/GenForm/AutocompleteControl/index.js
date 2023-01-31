import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    CircularProgress,
    // createFilterOptions,
    FormHelperText,
    TextField as MuiTextField,
    useFormControl,
} from "@mui/material";
import { Autocomplete as MuiAutocomplete } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "UIComponents/Paper";
import { useFormContext } from "context/FormContext";
import { useFormControlErrorContext } from "context/FormControlErrorContext";
import axios from "axios";
import { debounce } from "utils/appUtils";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import classNames from "classnames";

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
                        padding: "0.5px 0px",
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
                        textTransform: "capitalize",
                        "& fieldset": {
                            border: "1px solid #e1e6ea",
                            borderRadius: "3px",
                        },
                        "&.Mui-error fieldset": {
                            border: "1px solid #DF514C",
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
                        // "&:hover fieldset": {
                        //     borderColor: "#d0d7de",
                        // },
                        // "&.Mui-focused fieldset": {
                        //     borderColor: "#d0d7de",
                        // },
                    },
                },
            },
        },
    },
});

//Todo : Unique key issue for same same even if id different inside options

const AutocompleteControl = ({
    id,
    value,
    optionUrl,
    defaultOpts,
    multiple,
    freeSolo,
    onChange,
    helperText,
    className = "",
    inputRef,
    parentElement = null,
    _testingClassName_,
    bottomReachedOffset = 100,
    onScrolledToBottom = () => {},
    ...props
}) => {
    const autocompleteRef = useRef(multiple ? [] : null);
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    // const error = errorFields.includes(id);
    const error = errorFields.some((item) => item.id === id);

    // const [openSelectState, setOpenSelectState] = useState(false);
    const [options, setOptions] = useState([]);

    // const filter = createFilterOptions();

    const handleAutocompleteChange = (_e, value) => {
        onChange?.(_e, value);
        if (Array.isArray(value)) {
            return (autocompleteRef.current = value?.map(
                (value) => value._id ?? value
            ));
        } else {
            autocompleteRef.current = value?._id ?? value;
        }
    };

    const fetchOptions = useCallback(async () => {
        const { data } = await axios.get(
            `${API_BASEURL}${API_BASENAME}/${optionUrl}`
        );
        setOptions(data);
    }, [optionUrl]);

    useEffect(() => {
        if (API_ENABLED && optionUrl) fetchOptions();
    }, [fetchOptions, optionUrl]);

    useEffect(() => {
        fieldCollector((getElement) => ({
            id: id,
            required,
            value: autocompleteRef.current,
        }));
    }, [id, fieldCollector, multiple, value, required, freeSolo]);

    useEffect(() => {
        if (multiple && props?.defaultValue?.length > 0) {
            autocompleteRef.current = [...props.defaultValue]?.map(
                (val) => val?._id ?? null
            );
        } else if (props?.defaultValue) {
            autocompleteRef.current =
                props.defaultValue?._id ?? props.defaultValue;
        } else if (multiple && value?.length > 0) {
            autocompleteRef.current = [...value]?.map(
                (val) => val?._id ?? null
            );
        } else if (value) {
            autocompleteRef.current = value?._id ?? value;
        }
    }, [multiple, props.defaultValue, value]);

    useEffect(() => {
        if (required) setError(error);
    }, [required, error, setError]);

    const onListBoxScroll = debounce((ev) => {
        const elem = ev.target;

        const currHeight = elem.scrollTop + elem.clientHeight;
        const fullHeight = elem.scrollHeight;
        const hasAlmostScrolledToBottom =
            currHeight >= fullHeight - bottomReachedOffset;

        if (hasAlmostScrolledToBottom) onScrolledToBottom();
    }, 200);

    return (
        <ThemeProvider theme={theme}>
            <MuiAutocomplete
                {...props}
                className={className}
                id={id}
                options={props?.options ?? options}
                fullWidth
                PaperComponent={Paper}
                selectOnFocus
                clearOnBlur
                clearOnEscape
                value={value}
                onChange={handleAutocompleteChange}
                noOptionsText="No results found"
                multiple={multiple}
                freeSolo={freeSolo}
                filterSelectedOptions={multiple ? true : false}
                size={multiple && "small"}
                ListboxProps={{
                    ...props.ListboxProps,
                    onScroll: (ev) => {
                        props?.ListboxProps?.onScroll(ev);
                        onListBoxScroll(ev);
                    },
                }}
                getOptionLabel={
                    props.getOptionLabel ??
                    ((option) => {
                        if (typeof option === "string") return option;
                        if (option.inputValue) return option.inputValue;
                        return option?.title ?? option?.name;
                    })
                }
                {...(props.disablePortal && {
                    componentsProps: {
                        popper: {
                            placement: "bottom",
                            disablePortal: true,
                            modifiers: [
                                {
                                    name: "preventOverflow",
                                    enabled: true,
                                    options: {
                                        altAxis: false,
                                        altBoundary: false,
                                        tether: true,
                                        boundary: parentElement ?? "viewport",
                                    },
                                },
                            ],
                        },
                    },
                })}
                renderInput={({ inputProps, ...params }) => (
                    <MuiTextField
                        autoFocus={props?.autoFocus}
                        {...params}
                        placeholder={props.placeholder}
                        name={props.name}
                        error={error}
                        inputProps={{
                            ...inputProps,
                            required: false,
                            autoComplete: "off",
                            className: classNames(
                                _testingClassName_
                                    ? `Sel-${_testingClassName_}-input`
                                    : "",
                                inputProps.className
                            ),
                        }}
                        inputRef={inputRef}
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
            />
            {error && <FormHelperText error>{helperText}</FormHelperText>}
        </ThemeProvider>
    );
};

export default AutocompleteControl;

// const handleFilterOptions = (options, params) => {
//     if (freeSolo) {
//         const filtered = filter(options, params);
//         if (params.inputValue !== "") {
//             filtered.push({
//                 inputValue: params.inputValue,
//                 title: params.inputValue,
//             });
//         }
//         return filtered;
//     }
//     return options;
// };

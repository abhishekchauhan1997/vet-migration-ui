import React, { useCallback, useEffect, useState } from "react";
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
import axios from "axios";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import useDebounce from "hooks/useDebounce";
import Icon from "components/IconComponent";
import { debounce } from "utils/appUtils";
import useGetPageDataContext from "hooks/usePageDataContext";

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
                        marginRight: "16px",
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
                        paddingRight: "8px !important",
                        textTransform: "capitalize",
                        "& fieldset": {
                            border: "1px solid #e1e6ea",
                            borderRadius: "3px",
                        },
                        "&:hover fieldset": {
                            borderColor: "#d0d7de",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#d0d7de",
                        },
                    },
                },
            },
        },
    },
});

const AutocompleteSearch = ({
    formattingOpts,
    id,
    optionUrl,
    defaultOpts,
    onChange,
    helperText,
    className = "",
    inputRef,
    endAdornmentIcon = "search",
    parentElement = null,
    bottomReachedOffset = 100,
    onScrolledToBottom = () => {},
    ...props
}) => {
    // hooks
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    const { setAlert } = useGetPageDataContext();

    // const error = errorFields.includes(id);
    const error = errorFields.some((item) => item.id === id);

    // loacl state
    const [options, setOptions] = useState([]);
    const [newInputValue, setNewInputValue] = useState("");
    const [isLoading, setIsLoading] = useState({
        [id]: false,
    });

    // hooks
    let debouncedVal = useDebounce(newInputValue, 500);

    const alert = useCallback(
        ({ message = "", severity = "success" }) => {
            setAlert({ open: true, message, severity });
        },
        [setAlert]
    );

    const setLoader = useCallback((type, loading = false) => {
        setIsLoading((currState) => ({ ...currState, [type]: loading }));
    }, []);

    const handleChange = (_e, value) => {
        onChange?.(value);
        setOptions([]);
        setNewInputValue("");
    };

    const fetchOptions = useCallback(
        (debouncedVal, url) => {
            setLoader(id, true);
            const errMessage = "Error fetching options";
            axios
                .get(`${API_BASEURL}${API_BASENAME}/${url}=${debouncedVal}`)
                .then(({ data }) => {
                    let results = formattingOpts?.(data);
                    if (results?.length > 0) setOptions(results ?? []);
                    else setOptions(data ?? []);
                })
                .catch(({ response: { data } }) =>
                    alert({
                        severity: "error",
                        message: data?.message ?? errMessage,
                    })
                )
                .finally(() => setLoader(id, false));
        },
        [alert, formattingOpts, id, setLoader]
    );

    useEffect(() => {
        if (API_ENABLED && optionUrl && debouncedVal?.length > 1)
            fetchOptions(debouncedVal, optionUrl);
    }, [debouncedVal, fetchOptions, optionUrl]);

    useEffect(() => {
        fieldCollector((getElement) => ({
            id: id,
            required,
            value: getElement(id).value,
        }));
    }, [id, fieldCollector, required]);

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
                className={className}
                id={id}
                options={options}
                filterOptions={(x) => x}
                fullWidth
                PaperComponent={Paper}
                onChange={handleChange}
                popupIcon={null}
                clearOnBlur
                clearOnEscape
                loading={isLoading[id] ?? false}
                noOptionsText="No results found"
                onInputChange={(_e, value) => setNewInputValue(value)}
                getOptionLabel={(option) => {
                    if (typeof option === "string") return option;
                    if (option.inputValue) return option.inputValue;
                    return option.name ?? option;
                }}
                {...props}
                ListboxProps={{
                    ...props.ListboxProps,
                    onScroll: (ev) => {
                        props?.ListboxProps?.onScroll(ev);
                        onListBoxScroll(ev);
                    },
                }}
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
                renderInput={(params) => (
                    <MuiTextField
                        autoFocus={props?.autoFocus}
                        {...params}
                        placeholder={props.placeholder}
                        name={props.name}
                        error={props.error ? true : false}
                        inputProps={{
                            ...params.inputProps,
                            required: false,
                            autoComplete: "off",
                        }}
                        inputRef={inputRef}
                        InputProps={{
                            ...params.InputProps,
                            // type: "search",
                            endAdornment: (
                                <>
                                    {props?.loading || isLoading[id] ? (
                                        <CircularProgress
                                            size={16}
                                            style={{
                                                position: "absolute",
                                                right: "38px",
                                                color: "#3b4468",
                                            }}
                                        />
                                    ) : (
                                        <Icon type={endAdornmentIcon} />
                                    )}
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

export default AutocompleteSearch;

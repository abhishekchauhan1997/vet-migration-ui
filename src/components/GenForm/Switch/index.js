import {
    FormHelperText,
    Switch as MuiSwitch,
    useFormControl,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import { useFormContext } from "context/FormContext";
import { useFormControlErrorContext } from "context/FormControlErrorContext";

const theme = createTheme({
    components: {
        MuiSwitch: {
            styleOverrides: {
                root: {
                    "&.MuiRadio-root": {
                        color: "#3b4468",
                    },
                    "&.Mui-checked": {
                        "&.Mui-checked": {
                            color: "#3b4468",
                        },
                    },
                },
            },
        },
    },
});

const Switch = ({ checked, id, className, helperText, ...props }) => {
    const focusRef = useRef();
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    // const error = errorFields.includes(id);
    const error = errorFields.some((item) => item.id === id);

    useEffect(() => {
        fieldCollector((getElement) => ({
            id: id,
            required,
            value: checked ?? getElement(id).checked,
            onFocus: () => {
                getElement(id).focus();
                focusRef.current.focusVisible();
            },
        }));
    }, [id, fieldCollector, checked, required]);

    useEffect(() => {
        if (required) {
            setError(error);
        }
    }, [required, error, setError]);

    return (
        <ThemeProvider theme={theme}>
            <MuiSwitch
                {...props}
                id={id}
                action={focusRef}
                checked={checked}
                inputProps={{
                    "aria-label": "controlled",
                }}
            />
            {error && <FormHelperText error>{helperText}</FormHelperText>}
        </ThemeProvider>
    );
};

export default Switch;

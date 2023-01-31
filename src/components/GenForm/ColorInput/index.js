import React, { useEffect } from "react";
import {
    Input as MuiInput,
    useFormControl,
    FormHelperText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classnames from "classnames";
import { useFormContext } from "context/FormContext";
import { useFormControlErrorContext } from "context/FormControlErrorContext";

const theme = createTheme({
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    "&.MuiInput-root": {
                        width: "100%",
                        minHeight: "30px",
                        border: "0px solid #DADFF1",
                        background: "#FFF",
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

                input: {
                    "&.MuiInput-input": {
                        padding: "4px 8px",
                    },
                },
            },
        },
    },
});

const ColorInput = ({ id, value, inputProps = {}, helperText, ...props }) => {
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    // const error = errorFields.includes(id);
    const error = errorFields.some((item) => item.id === id);

    useEffect(() => {
        fieldCollector((getElement) => ({
            id,
            required,
            value: value ?? getElement(id).value,
        }));
    }, [id, fieldCollector, value, required]);

    useEffect(() => {
        if (required) {
            setError(error);
        }
    }, [required, error, setError]);

    return (
        <ThemeProvider theme={theme}>
            <MuiInput
                {...props}
                id={id}
                fullWidth
                value={value}
                disableUnderline={true}
                inputProps={{
                    ...inputProps,
                    required: false,
                    autoComplete: "off",
                    className: classnames({ required }, inputProps.className),
                }}
            />
            {helperText && error && (
                <FormHelperText error>{helperText}</FormHelperText>
            )}
        </ThemeProvider>
    );
};

export { ColorInput };

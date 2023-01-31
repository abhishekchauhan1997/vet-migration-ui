import { Checkbox as MuiCheckbox, useFormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import { useFormContext } from "context/FormContext";
import { useFormControlErrorContext } from "context/FormControlErrorContext";
import classNames from "classnames";

const theme = createTheme({
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: "5px",
                    color: "#d0d7de",
                    "&.Mui-checked": {
                        "&.Mui-checked": {
                            color: "#3b4468",
                        },
                    },
                    "&.Mui-disabled": {
                        "&.Mui-disabled": {
                            cursor: "not-allowed",
                        },
                    },
                },
            },
        },
    },
});

const Checkbox = ({ id, _testingClassName_, className, checked, ...props }) => {
    const focusRef = useRef();
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    // const error = errorFields.includes(id);
    const error = errorFields.some((item) => item.id === id);

    useEffect(() => {
        fieldCollector((getElement) => ({
            id,
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
            <MuiCheckbox
                {...props}
                checked={checked}
                action={focusRef}
                size="small"
                inputProps={{
                    id,
                    className: classNames(
                        _testingClassName_
                            ? `Sel-${_testingClassName_}-input`
                            : "",
                        className
                    ),
                }}
            />
        </ThemeProvider>
    );
};

export default Checkbox;

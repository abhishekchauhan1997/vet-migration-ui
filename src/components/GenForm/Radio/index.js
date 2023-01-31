import {
    createTheme,
    FormHelperText,
    RadioGroup as MuiRadioGroup,
    ThemeProvider,
    useFormControl,
} from "@mui/material";
import {
    cloneElement,
    Children,
    forwardRef,
    Fragment,
    useEffect,
    useRef,
} from "react";
import { useFormContext } from "context/FormContext";
import Radio from "UIComponents/Radio";
import { useFormControlErrorContext } from "context/FormControlErrorContext";
import FormControlLabel from "../FormControlLabel";
import classNames from "classnames";

const theme = createTheme({
    components: {
        MuiRadio: {
            styleOverrides: {
                root: {
                    padding: "5px",
                    color: "#3b4468",
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

const RadioGroup = ({ children, name, value, helperText, ...props }) => {
    const focusRef = useRef();
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    // const error = errorFields.includes(name);
    const error = errorFields.some((item) => item.id === name);

    useEffect(() => {
        fieldCollector((getElement) => ({
            id: name,
            required,
            value: value ?? getElement(name).value,
            onFocus: () => {
                getElement(name)[0].focus();
                focusRef.current.focusVisible();
            },
        }));
    }, [name, fieldCollector, value, required]);

    useEffect(() => {
        if (required) {
            setError(error);
        }
    }, [required, error, setError]);

    return (
        <>
            <MuiRadioGroup id={name} name={name} value={value} {...props}>
                {Children.map(children, (child, index) => {
                    if (index === 0) {
                        return (
                            <Fragment key={index}>
                                {cloneElement(child, { ref: focusRef })}
                            </Fragment>
                        );
                    }
                    return <Fragment key={index}>{child}</Fragment>;
                })}
            </MuiRadioGroup>
            {error && <FormHelperText error>{helperText}</FormHelperText>}
        </>
    );
};

const RadioControlLabel = forwardRef(
    ({ _testingClassName_, className, ...props }, ref) => {
        return (
            <ThemeProvider theme={theme}>
                <FormControlLabel
                    sx={{ color: props.color ?? "#3b4468" }}
                    className={classNames(
                        "genForm-label",
                        className,
                        _testingClassName_
                            ? `Sel-${_testingClassName_}-label`
                            : ""
                    )}
                    {...props}
                    control={
                        <Radio
                            action={ref}
                            className={
                                _testingClassName_
                                    ? `Sel-${_testingClassName_}-input`
                                    : ""
                            }
                            size="small"
                        />
                    }
                />
            </ThemeProvider>
        );
    }
);

export { RadioGroup, RadioControlLabel };

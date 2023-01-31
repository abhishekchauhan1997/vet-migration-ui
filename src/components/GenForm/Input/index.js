import React, { useEffect, useState } from "react";
import {
  Input as MuiInput,
  TextField as MuiTextField,
  InputLabel as MuiInputLabel,
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
  useFormControl,
  FormHelperText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classnames from "classnames";
import { useFormContext } from "../../../context/FormContext";
import {
  useFormControlErrorContext,
  FormControlErrorContextProvider,
} from "../../../context/FormControlErrorContext";

const theme = createTheme({
  components: {
    // MuiFormControl: {
    //     styleOverrides: {
    //         root: {
    //             "&.MuiFormControl-root": {
    //                 color: "#3B4468",
    //                 whiteSpace: " break-spaces",
    //                 display: "grid",
    //                 gridTemplateColumns: "100%",
    //                 gridRowGap: "10px",
    //                 alignItems: "baseline",
    //                 justifyContent: "center",
    //                 padding: " 8px 0px",
    //                 "&.textFieldFullWidth": {
    //                     width: "100%",
    //                     ".MuiInputBase-root": {
    //                         width: "100%",
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          paddingBlock: "3.5px",
          "&.MuiFormLabel-root": {
            color: "#3B4468",
            // whiteSpace: " break-spaces",
          },
          // "&.Mui-required": {
          //     color: "#3B4468",
          // },
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
            border: "1px solid #e1e6ea",
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
            paddingLeft: "8px",
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
            padding: "3.5px 16px",
            background: "#F5F6FA",
            height: "30px",
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
            "&.Mui-error fieldset": {
              // borderColor: "#d0d7de",
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
          },
          "&.MuiOutlinedInput-notchedOutline": {
            borderColor: "none",
          },
        },
        multiline: {
          minHeight: 30,
          padding: 0,
        },
        inputMultiline: {
          minHeight: 24,
          resize: "vertical",
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

const withDisplayCheck =
  (Component) =>
  ({ d = true, ...props }) => {
    if (!d) return;
    return <Component {...props} />;
  };

const Input = ({
  id,
  value,
  inputProps = {},
  handleErrorBeforeSubmit,
  helperText,
  _testingClassName_,
  ...props
}) => {
  const { required } = useFormControl() ?? {};
  const { setError, userControlledError } = useFormControlErrorContext();
  const { fieldCollector, errorFields } = useFormContext();
  const error = errorFields.some((item) => item.id === id);
  const helperMessage = errorFields.find((item) => item.id === id);

  useEffect(() => {
    fieldCollector((getElement) => ({
      id,
      type: props?.type ?? null,
      required,
      handleErrorBeforeSubmit,
      value: value ?? getElement(id)?.value,
      error: userControlledError,
      helper: helperText ?? null,
    }));
  }, [
    id,
    fieldCollector,
    props,
    value,
    required,
    userControlledError,
    helperText,
    handleErrorBeforeSubmit,
  ]);

  const handleOnWheel = (_e) => {
    document.activeElement.blur();
  };

  const handleOnPaste = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (required) {
      setError(error);
    }
  }, [error, required, setError]);

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
          className: classnames(
            { required },
            inputProps.className,
            _testingClassName_ ? `Sel-${_testingClassName_}-input` : ""
          ),
        }}
        {...(props.type === "number" && {
          onWheel: handleOnWheel,
          onPaste: handleOnPaste,
        })}
      />
      {helperText && (error || userControlledError) && (
        <FormHelperText error>
          {helperMessage?.helperText ?? helperText ?? "Enter proper values"}
        </FormHelperText>
      )}
    </ThemeProvider>
  );
};
const TextField = ({ id, value, className, textFieldFullWidth, ...props }) => {
  const { required } = useFormControl() ?? {};
  const { setError } = useFormControlErrorContext();
  const { fieldCollector, errorFields } = useFormContext();
  const error = errorFields.includes(id);

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
      <MuiTextField
        {...props}
        id={id}
        value={value}
        className={classnames({ textFieldFullWidth }, className)}
      />
    </ThemeProvider>
  );
};
const InputLabel = ({ _testingClassName_, className, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiInputLabel
        className={classnames(
          "genForm-label",

          className,
          _testingClassName_ ? `Sel-${_testingClassName_}-input` : ""
        )}
        {...props}
      />
    </ThemeProvider>
  );
};
const InputWrapper = ({ children, helperText }) => {
  const { error } = useFormControlErrorContext();
  return (
    <>
      {children}
      {helperText && error && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </>
  );
};
const FormControl = ({ className, error: userControlledError, ...props }) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(error || userControlledError);
  }, [error, userControlledError]);
  return (
    <ThemeProvider theme={theme}>
      <FormControlErrorContextProvider
        value={{ error, setError, userControlledError }}
      >
        <MuiFormControl
          error={error}
          className={classnames("form-element", className)}
          {...props}
        />
      </FormControlErrorContextProvider>
    </ThemeProvider>
  );
};
const FormLabel = ({ _testingClassName_, className, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiFormLabel
        className={classnames(
          "genForm-label",
          className,
          _testingClassName_ ? `Sel-${_testingClassName_}-label` : ""
        )}
        {...props}
      />
    </ThemeProvider>
  );
};

const InputWithCheck = (props) => withDisplayCheck(Input)(props);

export {
  Input,
  InputWithCheck,
  TextField,
  FormLabel,
  InputLabel,
  FormControl,
  InputWrapper,
};

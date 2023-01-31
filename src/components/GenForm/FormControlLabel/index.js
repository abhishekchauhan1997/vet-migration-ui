import { forwardRef } from "react";
import { FormControlLabel as MuiFormControlLabel } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classNames from "classnames";
const theme = createTheme({
    components: {
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    marginLeft: "-8px",
                    "&.Mui-disabled": {
                        "&.Mui-disabled": {
                            color: "rgba(0, 0, 0, 0.38)",
                        },
                    },
                },
            },
        },
    },
});

// TODO TESTING: Remove _testingClassName_ once the testing is done
const FormControlLabel = forwardRef(
    ({ _testingClassName_, className, ...props }, ref) => {
        return (
            <ThemeProvider theme={theme}>
                <MuiFormControlLabel
                    classes={{
                        root: classNames("genForm-label", className),
                        label: _testingClassName_
                            ? `Sel-${_testingClassName_}-label`
                            : "",
                    }}
                    ref={ref}
                    {...props}
                />
            </ThemeProvider>
        );
    }
);

export default FormControlLabel;

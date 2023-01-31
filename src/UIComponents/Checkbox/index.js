import {
    Checkbox as MuiCheckbox,
    FormControlLabel as MuiFormControlLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    "&.MuiFormControlLabel-label": {
                        color: "#3b4468",
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    "&.MuiCheckbox-root": {
                        color: "#DADFF1",
                        padding: "6px",
                    },
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

const Checkbox = ({ className = "", handleChange, label = null, ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiFormControlLabel
                control={<MuiCheckbox id={props.id} {...props} />}
                label={label}
                onChange={handleChange}
                style={props.style}
            />
        </ThemeProvider>
    );
};

const CheckboxWithoutLabel = ({ ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiCheckbox {...props} />
        </ThemeProvider>
    );
};

export { Checkbox, CheckboxWithoutLabel };

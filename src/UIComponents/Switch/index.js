import { FormControlLabel, Switch as MuiSwitch } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const ControlledSwitches = ({ id, label = null, ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel
                label={label}
                control={<MuiSwitch id={id} {...props} />}
            />
        </ThemeProvider>
    );
};

export default ControlledSwitches;

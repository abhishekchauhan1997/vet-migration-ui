import { LinearProgress as MuiLinearProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    "&.MuiLinearProgress-root": {
                        height: "7px",
                    },
                },
                barColorPrimary: {
                    "&.MuiLinearProgress-barColorPrimary": {
                        background:
                            "linear-gradient(85.97deg, #6e8dfb 0%, #52a3ff 100%)",
                    },
                },
                bar1Indeterminate: {
                    "&.MuiLinearProgress-bar1Indeterminate": {
                        background:
                            "linear-gradient(85.97deg, #6e8dfb 0%, #52a3ff 100%)",
                    },
                },
            },
        },
    },
});

const LinearProgress = ({ ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiLinearProgress {...props} />
        </ThemeProvider>
    );
};

export default LinearProgress;

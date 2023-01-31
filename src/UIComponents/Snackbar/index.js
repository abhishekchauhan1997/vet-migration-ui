import { Snackbar as MuiSnackbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classNames from "classnames";
import Alert from "../Alert";

const theme = createTheme({
    components: {
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    "&.MuiSnackbar-root": {},
                },
            },
        },
    },
});

const Snackbar = ({
    open,
    className,
    handleClose,
    message,
    action,
    duration = 2500,
    ...props
}) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiSnackbar
                {...props}
                sx={{ whiteSpace: "pre-line" }}
                open={open}
                className={classNames(className)}
                autoHideDuration={duration}
                onClose={handleClose}
                action={action}
            >
                <Alert onClose={handleClose} severity={props.severity}>
                    {message}
                </Alert>
            </MuiSnackbar>
        </ThemeProvider>
    );
};

export default Snackbar;

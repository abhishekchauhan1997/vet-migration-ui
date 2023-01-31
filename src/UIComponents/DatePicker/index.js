import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Input from "../Input";

const theme = createTheme({
    components: {
        MuiDatePicker: {
            styleOverrides: {
                root: {},
            },
        },
    },
});

const DatePicker = ({ textFieldFullWidth, ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MuiDatePicker
                    {...props}
                    disabled={props.disabled}
                    // mask="____/__/__"
                    renderInput={(params) => (
                        <Input.TextField
                            {...params}
                            placeholder={props.placeholder}
                            textFieldFullWidth={textFieldFullWidth}
                        />
                    )}
                />{" "}
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default DatePicker;

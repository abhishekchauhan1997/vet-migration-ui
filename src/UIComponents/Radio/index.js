import { Radio as MuiRadio } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classNames from "classnames";

const theme = createTheme({
    components: {
        MuiRadio: {
            styleOverrides: {
                root: {
                    padding: "5px",
                    color: "#d0d7de",
                    "&.Mui-disabled": {
                        cursor: "not-allowed",
                    },
                    "&.Mui-checked": {
                        color: "#3b4468",
                    },
                },
            },
        },
    },
});

const Radio = ({
    children,
    _testingClassName_,
    classNmae,
    id,
    handleChange,
    ...props
}) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiRadio
                className={classNames(
                    _testingClassName_ ? `Sel-${_testingClassName_}-label` : ""
                )}
                onChange={handleChange}
                {...props}
            />
        </ThemeProvider>
    );
};

export default Radio;

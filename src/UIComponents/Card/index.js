import React from "react";
import classnames from "classnames";
import { Paper as MuiPaper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    fontSize: "14px",
                    // !check if we can directly use color here instead of using inline
                    // color: "#3b4468",
                    borderRadius: "3px",
                    backgroundColor: "#fff",
                    border: "1px solid #e5e8f5",
                    padding: "10px",
                    ".des_head, .des_body": {
                        padding: "0px",
                    },
                    ".des_head": {
                        borderBottom: "0px solid #e5e8f5",
                    },
                },
            },
        },
    },
});

const Card = ({ className, children, ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiPaper
                elevation={0}
                className={classnames("des_card", className)}
                {...props}
            >
                {children}
            </MuiPaper>
        </ThemeProvider>
    );
};

Card.Head = ({ children, className, ...props }) => {
    return (
        <div className={classnames("des_head", className)} {...props}>
            {children}
        </div>
    );
};

Card.Body = ({ children, className, ...props }) => {
    return (
        <div className={classnames("des_body", className)} {...props}>
            {children}
        </div>
    );
};

export default Card;

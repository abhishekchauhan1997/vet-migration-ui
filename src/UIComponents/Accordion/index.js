import React from "react";
import classnames from "classnames";
import {
    Accordion as MuiAccordion,
    AccordionSummary as MuiAccordionSummary,
    AccordionDetails as MuiAccordionDetails,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const theme = createTheme({
    components: {
        MuiAccordion: {
            styleOverrides: {
                root: {
                    "&:not(.separator)::before": {
                        display: "none",
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    padding: "3.5px 16px",
                    minHeight: "38px",
                },
                content: {
                    marginBlock: "0",
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: "3.5px 16px",
                },
            },
        },
    },
});

const Accordion = ({ className, children, separator = false, ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiAccordion
                {...props}
                elevation={0}
                disableGutters
                className={classnames("des_accordion", className, {
                    separator,
                })}
            >
                {children}
            </MuiAccordion>
        </ThemeProvider>
    );
};

Accordion.Header = ({
    id = "accordion",
    className,
    children,
    style,
    ...props
}) => {
    return (
        <MuiAccordionSummary
            expandIcon={<FontAwesomeIcon icon={faAngleDown} />}
            {...props}
            sx={style}
            // id={`${id}-header`}
            aria-controls={`${id}-content`}
            className={classnames("des_accordionItemHeader", className)}
        >
            {children}
        </MuiAccordionSummary>
    );
};

Accordion.Body = ({ className, children, style, ...props }) => {
    return (
        <MuiAccordionDetails
            {...props}
            sx={style}
            className={classnames("des_accordionItemBody", className)}
        >
            {children}
        </MuiAccordionDetails>
    );
};

export default Accordion;

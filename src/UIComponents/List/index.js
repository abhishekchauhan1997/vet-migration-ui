import React from "react";
import classnames from "classnames";
import {
    List as MuiList,
    ListItemButton as MuiListItemButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiList: {
            styleOverrides: {
                root: {
                    paddingBlock: "10px",
                    backgroundColor: "#fff",
                    ".des_listItem": {
                        border: "none",
                        lineHeight: "18px",
                        padding: "10px 15px",
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    padding: "10px",
                    minHeight: "30px",
                    borderRadius: "3px",
                    "&.selected": {
                        color: "#5157D4",
                        fontWeight: "bold",
                        background:
                            "linear-gradient(89.15deg,rgba(110, 141, 251, 0.2) 0%, rgba(82, 163, 255, 0.2) 100%)",
                    },
                    // paddingBottom: "0px",
                    // "&.Mui-selected": {
                    //     borderRadius: "3px",
                    //     background:
                    //         "linear-gradient(89.15deg,rgba(110, 141, 251, 0.2) 0%, rgba(82, 163, 255, 0.2) 100%)",
                    // },
                },
            },
        },
    },
});

const List = ({ children, className, ...props }) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <MuiList
                    {...props}
                    className={classnames("des_list", className)}
                >
                    {children}
                </MuiList>
            </ThemeProvider>
        </>
    );
};

List.Item = ({ children, className, selected = false, ...props }) => {
    return (
        <MuiListItemButton
            {...props}
            selected={selected}
            className={classnames("des_listItem", className, {
                selected,
            })}
        >
            {children}
        </MuiListItemButton>
    );
};

export default List;

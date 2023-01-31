import React from "react";
import classnames from "classnames";
import {
    TableContainer as MuiTableContainer,
    Table as MuiTable,
    TableBody as MuiTableBody,
    TableCell as MuiTableCell,
    TableHead as MuiTableHead,
    TableRow as MuiTableRow,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                    ".des_tableContainer": {
                        border: "none",
                    },
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    "&.MuiTable-root": {
                        border: "1px solid #e5e8f5",
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        "&.Mui-selected": {
                            // border: "1px dashed black",
                        },
                    },
                },
                hover: {
                    "&.Mui-hover": {},
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    textAlign: "left",
                    padding: "12px 8px",
                },
            },
        },
    },
});

const TableContainer = ({ children, className, ...props }) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <MuiTableContainer
                    {...props}
                    className={classnames("des_tableContainer", className)}
                >
                    {children}
                </MuiTableContainer>
            </ThemeProvider>
        </>
    );
};

TableContainer.Table = ({
    children,
    className,
    selected = false,
    ...props
}) => {
    return (
        <MuiTable
            {...props}
            selected={selected}
            className={classnames("des_table", className, {
                selected,
            })}
        >
            {children}
        </MuiTable>
    );
};

TableContainer.TableHead = ({
    children,
    className,
    selected = false,
    ...props
}) => {
    return (
        <MuiTableHead
            {...props}
            selected={selected}
            sx={{
                borderBottom: "1px solid #e5e8f5",
                backgroundColor: "rgb(248, 249, 250)",
            }}
            className={classnames("des_tableHead", className, {
                selected,
            })}
        >
            {children}
        </MuiTableHead>
    );
};

TableContainer.TableRows = ({
    children,
    className,
    selected = false,
    ...props
}) => {
    return (
        <MuiTableRow
            {...props}
            selected={selected}
            className={classnames("des_tableRows", className, {
                selected,
            })}
        >
            {children}
        </MuiTableRow>
    );
};

TableContainer.TableCell = ({
    children,
    className,
    selected = false,
    ...props
}) => {
    return (
        <MuiTableCell
            selected={selected}
            sx={{ height: 1 }}
            className={classnames("des_tableCell", className, {
                selected,
            })}
            {...props}
        >
            {children}
        </MuiTableCell>
    );
};

TableContainer.TableBody = ({
    children,
    className,
    selected = false,
    ...props
}) => {
    return (
        <MuiTableBody
            {...props}
            selected={selected}
            className={classnames("des_tableBody", className, {
                selected,
            })}
        >
            {children}
        </MuiTableBody>
    );
};

export default TableContainer;

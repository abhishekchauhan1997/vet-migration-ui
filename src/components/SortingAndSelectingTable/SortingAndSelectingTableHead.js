import { Box, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import TableContainer from "UIComponents/Table";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TableCellData } from "components/TableUtility";

const theme = createTheme({
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    "&.MuiCheckbox-root": {
                        color: "#DADFF1",
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
                    "&.MuiCheckbox-indeterminate": {
                        color: "#3b4468",
                    },
                },
            },
        },
    },
});

export default function SortingAndSelectingTableHead({
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    showCheckbox,
    className,
    groupingColumns,
    sortable,
    border,
}) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableContainer.TableHead sx={{ backgroundColor: "#F8F9FA" }}>
            {groupingColumns && groupingColumns?.length > 0 && (
                <TableContainer.TableRows>
                    {groupingColumns?.map((groupCell) => (
                        <TableContainer.TableCell
                            key={groupCell?.id}
                            colSpan={groupCell?.colSpan}
                            className={className}
                            sx={{
                                backgroundColor:
                                    groupCell.backgroundColor ?? "#F8F9FA",
                                color: "#485276",
                                ...(border
                                    ? {
                                          border: "1px solid rgba(224, 224, 224, 1)",
                                      }
                                    : {
                                          borderBottom:
                                              "1px solid rgb(0 0 0 / 26%)",
                                      }),
                                fontWeight: "700",
                                fontSize: "16px",
                                cursor: "default",
                                textTransform: "capitalize",
                                minWidth: groupCell?.minWidth ?? "unset",
                                whiteSpace: "nowrap",
                                textAlign: "center",
                                width: groupCell?.width ?? "unset",
                            }}
                            align="center"
                            padding="normal"
                        >
                            {groupCell?.label}
                        </TableContainer.TableCell>
                    ))}
                </TableContainer.TableRows>
            )}
            <TableContainer.TableRows>
                {showCheckbox && (
                    <TableCellData padding="checkbox">
                        <ThemeProvider theme={theme}>
                            <MuiCheckbox
                                color="primary"
                                indeterminate={
                                    numSelected > 0 && numSelected < rowCount
                                }
                                checked={
                                    rowCount > 0 && numSelected === rowCount
                                }
                                onChange={onSelectAllClick}
                                inputProps={{
                                    "aria-label": "select all rows",
                                }}
                            />
                        </ThemeProvider>
                    </TableCellData>
                )}

                {headCells?.map((headCell) => (
                    <TableContainer.TableCell
                        key={headCell?.id}
                        colSpan={headCell?.colSpan}
                        className={className}
                        sx={{
                            backgroundColor:
                                headCell.backgroundColor ?? "#F8F9FA",
                            color: "#485276",
                            ...(border
                                ? {
                                      border: "1px solid rgba(224, 224, 224, 1)",
                                  }
                                : {
                                      borderBottom: "none",
                                  }),
                            fontWeight: "600",
                            fontSize: "13px",
                            cursor: "default",
                            textTransform: "capitalize",
                            minWidth: headCell?.minWidth ?? "unset",
                            whiteSpace: "nowrap",
                        }}
                        padding="normal"
                        {...(sortable && {
                            sortDirection:
                                orderBy === headCell?.id ? order : false,
                        })}
                    >
                        {sortable ? (
                            <TableSortLabel
                                active={orderBy === headCell?.id}
                                direction={
                                    orderBy === headCell?.id ? order : "asc"
                                }
                                onClick={createSortHandler(headCell?.id)}
                            >
                                {headCell?.label}
                                {orderBy === headCell?.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            headCell?.label
                        )}
                    </TableContainer.TableCell>
                ))}
            </TableContainer.TableRows>
        </TableContainer.TableHead>
    );
}

/* {numSelected > 0 ? (
                    <TableContainer.TableCell
                        style={{
                            color: "#485276",
                            borderBottom: "none",
                            fontWeight: "600",
                            fontSize: "13px",
                            cursor: "default",
                            textTransform: "capitalize",
                            whiteSpace: "nowrap",
                            padding: "0px",
                        }}
                        colSpan={headCells?.length}
                    >
                        <SortingAndSelectingTableToolbar
                            numSelected={numSelected}
                            component={component}
                            selected={selected}
                            // handleClickHandler={() => setOpenConfirmDialog(true)}
                            showDeleteIcon={
                                typeof handleDelete === "undefined"
                                    ? false
                                    : true
                            }
                        />
                    </TableContainer.TableCell>
                ) : (
                    headCells?.map((headCell) => (
                        <TableContainer.TableCell
                            key={headCell?.id}
                            className={className}
                            style={{
                                backgroundColor:
                                    headCell.backgroundColor ?? "#F8F9FA",
                                color: "#485276",
                                borderBottom: "none",
                                fontWeight: "600",
                                fontSize: "13px",
                                cursor: "default",
                                textTransform: "capitalize",
                                minWidth: headCell?.minWidth ?? "unset",
                                whiteSpace: "nowrap",
                            }}
                            padding="normal"
                            {...(sortable && {
                                sortDirection:
                                    orderBy === headCell?.id ? order : false,
                            })}
                        >
                            {sortable ? (
                                <TableSortLabel
                                    active={orderBy === headCell?.id}
                                    direction={
                                        orderBy === headCell?.id ? order : "asc"
                                    }
                                    onClick={createSortHandler(headCell?.id)}
                                >
                                    {headCell?.label}
                                    {orderBy === headCell?.id ? (
                                        <Box
                                            component="span"
                                            sx={visuallyHidden}
                                        >
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            ) : (
                                headCell?.label
                            )}
                        </TableContainer.TableCell>
                    ))
                )} */

import { Box, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import TableContainer from "UIComponents/Table";

export default function SortingTableHead({
    order,
    orderBy,
    onRequestSort,
    headCells,
    className,
}) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableContainer.TableHead sx={{ backgroundColor: "#F8F9FA" }}>
            <TableContainer.TableRows>
                {headCells?.map((headCell) => (
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
                            minWidth: headCell?.minWidth ?? "200px",
                        }}
                        align="center"
                        padding="normal"
                        sortDirection={orderBy === headCell?.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell?.id}
                            direction={orderBy === headCell?.id ? order : "asc"}
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
                    </TableContainer.TableCell>
                ))}
            </TableContainer.TableRows>
        </TableContainer.TableHead>
    );
}

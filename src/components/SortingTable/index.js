import * as React from "react";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import SortingTableHead from "./SortingTableHead";
import TableContainer from "UIComponents/Table";
import { NoMatchedRecords } from "components/TableUtility";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy]?.data ?? b[orderBy] < a[orderBy]?.data ?? a[orderBy]) {
        return -1;
    }
    if (b[orderBy]?.data ?? b[orderBy] > a[orderBy]?.data ?? a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function SortingTable({
    id,
    headCells,
    rows,
    tableTitle,
    noMatchedRecords,
    children,
}) {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState(headCells[1]?.id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // eslint-disable-next-line no-unused-vars
    const [_, setSortedData] = useState(rows);

    React.useEffect(() => {
        let items = stableSort(rows, getComparator(order, orderBy))?.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
        setSortedData(items);
    }, [order, orderBy, page, rows, rowsPerPage]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Paper elevation={0} sx={{ width: "100%", mb: 2 }}>
                <TableContainer>
                    <TableContainer.Table
                        stickyHeader
                        sx={{ minWidth: 750 }}
                        aria-labelledby={tableTitle}
                        size={"medium"}
                    >
                        <SortingTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows?.length}
                            headCells={headCells}
                        />
                        {rows?.length === 0 ? (
                            <NoMatchedRecords caption={noMatchedRecords} />
                        ) : (
                            <TableContainer.TableBody>
                                {children}
                            </TableContainer.TableBody>
                        )}
                    </TableContainer.Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

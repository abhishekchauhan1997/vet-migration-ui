import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import WarningDialog from "components/WarningDialogBox";
import Data from "./data.json";
import SortingAndSelectingTableHead from "./SortingAndSelectingTableHead";
import SortingAndSelectingTableToolbar from "./SortingAndSelectingToolbar";
import { NoMatchedRecords } from "components/TableUtility";
import TableData from "./TableData";
import TableContainer from "UIComponents/Table";
import { Button, CircularProgress, TableCell } from "@mui/material";

export default function SortingAndSelectingTable({
    id = "",
    tableTitle = "",
    noMatchedRecords = "",
    orderBy = "",
    order = "",
    draggableContainerClass = "draggableContainer",
    draggableClass = "draggable",
    verticalAlign = "middle",
    showCheckbox = true,
    showPagination = true,
    draggable = false,
    sortable = true,
    showToolbar = true,
    border = false,
    loading = false,
    stickyHeader = false,
    dense = false,
    disableScroll = false,
    needSelectAllBtn = false,
    headCells = [],
    rows = [],
    groupingColumns = [],
    selected = [],
    allItemSelected = 0,
    page = 0,
    rowsPerPage = 10,
    count = 0,
    handleDelete,
    handleAllSelectedBtn = () => {},
    handleClearSlectionBtn = () => {},
    cellRenderer = () => {},
    tableCellRenderer = () => {},
    handleOnSelected = () => {},
    startDragging = () => {},
    endDragging = () => {},
    onDragOverEvent = () => {},
    handleChangeRowsPerPage = () => {},
    handleChangePage = () => {},
    handleClick = () => {},
    handleSelectAllClick = () => {},
    handleRequestSort = () => {},
    rowCount,
    hover,
    component = null, //**node */
    children, //** node */
}) {
    const [data, setData] = useState({});
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const { dialogLabels = {} } = data ?? {};

    const allSelectedCaption = useCallback(
        (Tag = "caption") => {
            return (
                <Tag style={{ padding: "8px" }}>
                    All <b>{selected.length}</b> items on this page are
                    selected.{" "}
                    {count && (
                        <Button
                            onClick={handleAllSelectedBtn}
                            sx={{ textTransform: "none" }}
                        >
                            Select all <b>&nbsp;{count}&nbsp;</b> items in list
                        </Button>
                    )}
                </Tag>
            );
        },
        [count, handleAllSelectedBtn, selected.length]
    );

    const clearSelectedCaption = useCallback(
        (Tag = "caption") => {
            return (
                <Tag style={{ padding: "8px" }}>
                    All <b>&nbsp;{count}&nbsp;</b> items in list are selected.{" "}
                    {count && (
                        <Button
                            onClick={handleClearSlectionBtn}
                            sx={{ textTransform: "none" }}
                        >
                            Clear Selection
                        </Button>
                    )}
                </Tag>
            );
        },
        [count, handleClearSlectionBtn]
    );

    const selectedCaption = useCallback(() => {
        return (
            <caption style={{ padding: "8px" }}>
                <b>{selected.length}</b> selected
            </caption>
        );
    }, [selected.length]);

    useEffect(() => {
        setData(Data);
    }, []);

    useEffect(() => {
        if (handleOnSelected) handleOnSelected?.(selected);
    }, [handleOnSelected, selected]);

    return (
        <Box sx={{ width: "100%" }}>
            <Paper
                elevation={0}
                sx={{ width: "100%", mb: 2, overflow: "hidden" }}
            >
                {showToolbar && (
                    <SortingAndSelectingTableToolbar
                        numSelected={selected.length}
                        component={component}
                        selected={selected}
                        handleClickHandler={() => setOpenConfirmDialog(true)}
                        showDeleteIcon={
                            typeof handleDelete === "undefined" ? false : true
                        }
                    />
                )}
                <TableContainer
                    sx={{
                        maxHeight: stickyHeader ? 440 : "unset",
                        // ...(disableScroll && {
                        //     overflowX: { xs: "auto", lg: "unset" },
                        // }),
                        // overflowX: { xs: "auto", lg: "unset" },
                    }}
                >
                    <TableContainer.Table
                        sx={{
                            minWidth: 750,
                        }}
                        aria-labelledby={tableTitle}
                        size={dense ? "small" : "medium"}
                        stickyHeader={stickyHeader}
                    >
                        <SortingAndSelectingTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rowCount ?? rows?.length}
                            headCells={headCells}
                            showCheckbox={showCheckbox}
                            groupingColumns={groupingColumns}
                            sortable={sortable}
                            border={border}
                        />
                        {/* if no pagination has */}
                        {!showToolbar &&
                            !showPagination &&
                            selected.length > 0 &&
                            selectedCaption()}
                        {/* if pagination has */}
                        {!showToolbar &&
                            showPagination &&
                            selected.length > 0 &&
                            selected.length < rowsPerPage &&
                            selectedCaption()}
                        {loading ? (
                            <caption style={{ textAlign: "center", p: 1 }}>
                                <CircularProgress
                                    sx={{
                                        width: 20,
                                        height: 20,
                                    }}
                                    size="sm"
                                />
                            </caption>
                        ) : rows?.length === 0 ? (
                            <NoMatchedRecords caption={noMatchedRecords} />
                        ) : (
                            <TableBody
                                className={draggableContainerClass}
                                onDragOver={onDragOverEvent}
                            >
                                {needSelectAllBtn &&
                                    rowsPerPage > 0 &&
                                    selected.length === rowsPerPage && (
                                        <TableContainer.TableRows
                                            sx={{
                                                backgroundColor:
                                                    "rgba(241,243,244,0.871)",
                                            }}
                                        >
                                            <TableCell
                                                align="center"
                                                colSpan={headCells?.length + 1}
                                                sx={{
                                                    whiteSpace: "nowrap",
                                                    p: 0,
                                                    textAlign: "center",
                                                }}
                                            >
                                                {allItemSelected === count
                                                    ? clearSelectedCaption(Box)
                                                    : allSelectedCaption(Box)}
                                            </TableCell>
                                        </TableContainer.TableRows>
                                    )}
                                {children ? (
                                    children
                                ) : (
                                    <TableData
                                        rows={rows}
                                        columns={headCells}
                                        selectedItems={selected}
                                        showCheckbox={showCheckbox}
                                        tableTitle={tableTitle}
                                        handleClick={handleClick}
                                        cellRenderer={cellRenderer}
                                        tableCellRenderer={tableCellRenderer}
                                        draggable={draggable}
                                        startDragging={startDragging}
                                        endDragging={endDragging}
                                        draggableClass={draggableClass}
                                        verticalAlign={verticalAlign}
                                        hover={hover}
                                        border={border}
                                    />
                                )}
                            </TableBody>
                        )}
                    </TableContainer.Table>
                </TableContainer>
                {showPagination && (
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={count ? count : rows.length ?? 0} // need to pass this as a prop from where we are calling this component
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
                <WarningDialog
                    id={id}
                    title={dialogLabels?.title}
                    open={openConfirmDialog}
                    content={dialogLabels?.desc}
                    CancelBtnLabel={dialogLabels?.cancel}
                    ConfirmBtnLabel={dialogLabels?.confirm}
                    handleClose={() => setOpenConfirmDialog(false)}
                    handleSubmit={() => {
                        handleDelete(selected);
                        // setSelected([]);
                        setOpenConfirmDialog(false);
                    }}
                />
            </Paper>
        </Box>
    );
}

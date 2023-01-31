import { useEffect, useState } from "react";

// * ui elements *
import { Box, Typography } from "@mui/material";
import Button from "UIComponents/Button";
import Input from "UIComponents/Input";
import IconButton from "UIComponents/IconButton";
import Icon from "components/IconComponent";

const getInitialTableData = () => {
    const initialColumns = [1, 2, 3, 4, 5];
    const initialRows = [1, 2, 3];

    const initialTableData = [];

    initialRows.forEach((_, rowIdx) => {
        initialTableData[rowIdx] = [];

        initialColumns.forEach((_, colIdx) => {
            initialTableData[rowIdx][colIdx] = {
                isEditable: false,
                defaultValue: "",
            };
        });
    });

    return {
        rows: initialRows,
        columns: initialColumns,
        table: initialTableData,
    };
};

const TableBuilder = () => {
    // local state
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const { rows, columns, table } = getInitialTableData();

        setRows(rows);
        setColumns(columns);
        setTableData(table);
    }, []);

    const onAddRowOrCol = (type) => {
        if (type === "row") {
            setRows((currRows) => [
                ...currRows,
                currRows[currRows.length - 1] + 1,
            ]);
        }

        if (type === "col") {
            setColumns((currCols) => [
                ...currCols,
                currCols[currCols.length - 1] + 1,
            ]);
        }
    };

    const onRemoveRowOrCol = (type, index) => {
        const tableDataCopy = [...tableData];

        if (type === "row") {
            const rowsCopy = [...rows];
            rowsCopy.splice(index, 1);
            tableDataCopy.splice(index, 1);

            setRows(rowsCopy);
            setTableData(tableDataCopy);
        }

        if (type === "col") {
            const columnsCopy = [...columns];
            columnsCopy.splice(index, 1);

            tableDataCopy.forEach((_, rowIdx) => {
                tableDataCopy[rowIdx].splice(index, 1);
            });

            setColumns(columnsCopy);
        }
    };

    const onDataChange = (row, col, value) => {
        const tableDataCopy = [...tableData];

        if (typeof value === "boolean") {
            tableDataCopy.forEach((_, rowIdx) => {
                tableDataCopy[rowIdx][col].isEditable = value;
            });
        } else {
            const data = { ...(tableDataCopy?.[row]?.[col] ?? {}) };

            data.defaultValue = value;
            tableDataCopy[row][col] = data;
        }

        setTableData(tableDataCopy);
    };

    return (
        <Box my={2}>
            <Box display="flex" flexDirection="column">
                <Box display="flex">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={300}
                    />
                    {columns.map((col, colIdx) => {
                        return (
                            <Box
                                key={`${col}_delete`}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={"100%"}
                            >
                                <IconButton
                                    sx={{
                                        display:
                                            colIdx === 0 ? "none" : "block",
                                    }}
                                    onClick={() =>
                                        onRemoveRowOrCol("col", colIdx)
                                    }
                                >
                                    <Icon type="trash" />
                                </IconButton>
                            </Box>
                        );
                    })}
                </Box>

                {rows.map((row, rowIdx) => {
                    return (
                        <Box key={`${row}_delete`} display="flex">
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={300}
                            >
                                <IconButton
                                    sx={{
                                        display:
                                            rowIdx === 0 ? "none" : "block",
                                    }}
                                    onClick={() =>
                                        onRemoveRowOrCol("row", rowIdx)
                                    }
                                >
                                    <Icon type="trash" />
                                </IconButton>
                            </Box>

                            {columns.map((col, colIdx) => {
                                return (
                                    <Box
                                        key={col}
                                        width="100%"
                                        sx={{
                                            p: 1,
                                            border: "1px solid #e7e7e7",
                                            background:
                                                rowIdx === 0
                                                    ? "linear-gradient(85.97deg, #6e8dfb 0%, #52a3ff 100%)"
                                                    : "white",
                                        }}
                                    >
                                        <Input
                                            onChange={(ev) =>
                                                onDataChange(
                                                    rowIdx,
                                                    colIdx,
                                                    ev.target.value
                                                )
                                            }
                                        />
                                    </Box>
                                );
                            })}
                        </Box>
                    );
                })}

                <Box display="flex" alignItems="center">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={300}
                    />

                    <Box width="100%" p={1} border="1px solid #e7e7e7">
                        <Typography variant="body2">Editable</Typography>
                    </Box>

                    {columns.map((col, colIdx) => {
                        if (colIdx === 0) return null;

                        return (
                            <Box
                                key={`${col}_editable`}
                                p={1}
                                width="100%"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                border="1px solid #e7e7e7"
                            >
                                <input
                                    type="checkbox"
                                    onChange={(ev) =>
                                        onDataChange(
                                            colIdx,
                                            colIdx,
                                            ev.target.checked
                                        )
                                    }
                                />
                            </Box>
                        );
                    })}
                </Box>

                <Box mt={2} display="flex" justifyContent="flex-end" gap={0.5}>
                    <Button onClick={() => onAddRowOrCol("row")}>+ Row</Button>
                    <Button onClick={() => onAddRowOrCol("col")}>
                        + Column
                    </Button>
                    <Button onClick={() => onAddRowOrCol("col")}>
                        + Textarea
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default TableBuilder;

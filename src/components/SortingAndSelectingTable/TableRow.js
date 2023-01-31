import React, { Fragment, useCallback } from "react";

// * ui elements *
import { TableCell } from "@mui/material";
import { Box } from "@mui/system";
import { TableCellData } from "components/TableUtility";
import { CheckboxWithoutLabel } from "UIComponents/Checkbox";
import TableContainer from "UIComponents/Table";
import {
    LinkCellData,
    ChipCellData,
    SwitchCellData,
    CheckboxCellData,
} from "components/TableUtility";

const TableRow = ({
    row,
    columns = [],
    rowIndex: index,
    labelId = "table-row",
    selectedItems = [],
    draggableProps,
    tableRenderProps,
    ...props
}) => {
    const isItemSelected = selectedItems?.includes(row?.id);

    const getCellDataByType = useCallback(
        (cellData, col, id, row) => {
            if (!cellData) return;

            const cellRenderer = tableRenderProps?.cellRenderer;

            switch (cellData?.type) {
                case "link":
                    return (
                        cellRenderer?.(cellData, col, id, row) ?? (
                            <LinkCellData
                                path={cellData?.path}
                                data={cellData?.data}
                                newTab={cellData?.newTab}
                            />
                        )
                    );
                case "chip":
                    return (
                        cellRenderer?.(cellData, col, id, row) ?? (
                            <ChipCellData
                                data={cellData?.data}
                                cellData={cellData}
                                className="form_table_cell"
                            />
                        )
                    );
                case "switch":
                    return (
                        <SwitchCellData
                            row={row}
                            cellData={cellData}
                            id={id}
                            col={col}
                            cellRenderer={cellRenderer}
                        />
                    );
                case "checkbox":
                    return (
                        <CheckboxCellData
                            row={row}
                            cellData={cellData}
                            id={id}
                            col={col}
                            cellRenderer={cellRenderer}
                        />
                    );
                case "array":
                    return cellData?.data?.map((item, index) => (
                        <Fragment key={index}>
                            {getCellDataByType(item, col, id, row)}
                        </Fragment>
                    ));
                default:
                    return (
                        cellRenderer?.(cellData, col, id, row) ?? (
                            <Box>{cellData?.data}</Box>
                        )
                    );
            }
        },
        [tableRenderProps?.cellRenderer]
    );

    return (
        <TableContainer.TableRows
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            draggable={draggableProps?.draggable}
            className={draggableProps?.draggableClass}
            onDragStart={draggableProps?.startDragging}
            onDragEnd={(e) => draggableProps?.endDragging(e, row)}
            hover={props.showHoverEffect}
            sx={props.sx}
            style={props.style}
        >
            {props.showCheckbox &&
                (row.checkbox === undefined || row.checkbox === true) && (
                    <TableCell
                        style={{
                            backgroundColor: row.bgColor,
                            padding: row.type === "group" ? "0px 8px" : 8,
                        }}
                    >
                        <CheckboxWithoutLabel
                            color="primary"
                            onChange={(event) =>
                                props.handleClick?.(
                                    event,
                                    row?.id,
                                    row.type,
                                    index
                                )
                            }
                            checked={isItemSelected}
                            inputProps={{
                                "aria-labelledby": labelId,
                            }}
                        />
                    </TableCell>
                )}

            {tableRenderProps?.rowRenderer?.(
                TableCellData,
                row,
                getCellDataByType,
                index
            ) ??
                columns.map((col) => (
                    <TableCellData key={col?.id} className="form_table_cell">
                        {getCellDataByType(row?.[col?.id], col, row?.id, row)}
                    </TableCellData>
                ))}
        </TableContainer.TableRows>
    );
};

export default TableRow;

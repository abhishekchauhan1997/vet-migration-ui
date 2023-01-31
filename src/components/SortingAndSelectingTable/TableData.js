import React, { Fragment } from "react";

// * ui elements *
import { Link, TableCell } from "@mui/material";
import { Box } from "@mui/system";
import Switch from "components/GenForm/Switch";
import { TableCellData } from "components/TableUtility";
import { Checkbox, CheckboxWithoutLabel } from "UIComponents/Checkbox";
import Chip from "UIComponents/Chip";
import TableContainer from "UIComponents/Table";

// * utils *
import { statusClrMapping } from "utils/appUtils";

const TableData = ({
    showCheckbox,
    tableTitle,
    cellRenderer,
    tableCellRenderer,
    draggable,
    startDragging,
    endDragging,
    draggableClass,
    rows,
    columns,
    selectedItems,
    handleClick,
    verticalAlign,
    hover = true,
    border = false,
}) => {
    const getCellDataByType = (cellData, col, id, row) => {
        if (!cellData) return;
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
    };

    return rows?.map((row, index) => {
        const isItemSelected = selectedItems?.includes(row?.id);
        const labelId = `${tableTitle}-${row?.id}`;

        return (
            <TableContainer.TableRows
                hover={hover}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row?.id}
                selected={isItemSelected}
                draggable={draggable}
                className={draggableClass}
                onDragStart={startDragging}
                onDragEnd={(e) => endDragging(e, row)}
                sx={{ verticalAlign }}
            >
                {showCheckbox && (
                    <TableCell
                        style={{
                            backgroundColor: row.bgColor,
                            padding: row.type === "group" ? "0px 8px" : 8,
                        }}
                    >
                        {row.checkbox === undefined || row.checkbox === true ? (
                            <CheckboxWithoutLabel
                                color="primary"
                                onChange={(event) =>
                                    handleClick?.(
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
                        ) : (
                            <span> </span>
                        )}
                    </TableCell>
                )}

                {tableCellRenderer?.(
                    TableCellData,
                    row,
                    getCellDataByType,
                    index
                ) ??
                    columns.map((col) => (
                        <TableCellData
                            key={col?.id}
                            className="form_table_cell"
                            border={border}
                            style={{
                                width: col?.width ?? "unset",
                                ...(row[col.id]?.cell_bgColor && {
                                    backgroundColor: row[col.id]?.cell_bgColor,
                                }),
                                ...(row[col.id]?.cursor && {
                                    cursor: row[col.id]?.cursor,
                                }),
                            }}
                            {...(col.colSpan && { colSpan: col.colSpan })}
                        >
                            {getCellDataByType(
                                row?.[col?.id],
                                col,
                                row?.id,
                                row
                            )}
                        </TableCellData>
                    ))}
            </TableContainer.TableRows>
        );
    });
};

const LinkCellData = ({ path, data, style, newTab }) => {
    return (
        <Link
            target={newTab ? "_blank" : "_self"}
            rel="noreferrer"
            style={style}
            href={path}
            underline={"hover"}
        >
            {data}
        </Link>
    );
};

const SwitchCellData = ({ row, cellData, id, col, cellRenderer }) => {
    return (
        <Switch
            checked={cellData?.data ?? false}
            onChange={() => cellRenderer?.(cellData, col, id, row)}
        />
    );
};
const CheckboxCellData = ({ row, cellData, id, col, cellRenderer }) => {
    return (
        <Checkbox
            checked={cellData?.data ?? false}
            disabled={cellData?.disabled ?? false}
            handleChange={() => cellRenderer?.(cellData, col, id, row)}
            style={{ marginLeft: "unset", marginRight: "unset" }}
        />
    );
};

export const ChipCellData = ({ data, cellData }) => {
    return (
        <Chip
            style={{
                color:
                    cellData?.color ??
                    statusClrMapping[data.toUpperCase()].color,
                backgroundColor:
                    cellData?.bgColor ??
                    statusClrMapping[data.toUpperCase()].bgColor,
                borderRadius: "3px",
                border: cellData?.borderColor
                    ? `2px solid ${cellData?.borderColor}`
                    : "none",
                fontSize: "12px",

                textAlign: "center",
                padding: "5px 10px",
                textTransform: "uppercase",
            }}
        >
            {data}
        </Chip>
    );
};

export default TableData;

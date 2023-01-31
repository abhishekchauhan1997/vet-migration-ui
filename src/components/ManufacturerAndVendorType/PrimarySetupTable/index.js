import SortingAndSelectingTable from "components/SortingAndSelectingTable";
import { TableIcon } from "components/TableUtility";
import React from "react";

const PrimarySetupTable = ({
    id,
    tableTitle,
    rows,
    headCells,
    noMatchedRecords,
    showCheckbox,
    handleEdit,
    handleSwitch,
    handleRowsPerChange,
    count,
}) => {
    const iconActionMapping = {
        edit: (id, row) => handleEdit(id, row),
    };

    const handleCellRender = (cellData, _col, id, row) => {
        // debugger
        if (cellData?.type === "icon") {
            return (
                <TableIcon
                    id={id}
                    handleClick={() =>
                        iconActionMapping[cellData?.data](id, row)
                    }
                    type={cellData?.data}
                    title={cellData?.title}
                    color={cellData?.color}
                />
            );
        }
        if (cellData?.type === "switch") {
            return handleSwitch(row._id, row, "switch");
        }
    };
    return (
        <SortingAndSelectingTable
            id={id}
            headCells={headCells}
            rows={rows}
            tableTitle={tableTitle}
            noMatchedRecords={noMatchedRecords}
            cellRenderer={handleCellRender}
            showCheckbox={showCheckbox}
            handleChangeRows={handleRowsPerChange}
            count={count}
        />
    );
};

export default PrimarySetupTable;

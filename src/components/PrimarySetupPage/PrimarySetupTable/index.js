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
    handleView,
}) => {
    const iconActionMapping = {
        edit: (id, row) => handleEdit(id, row),
    };

    const handleCellRender = (cellData, _col, id, row) => {
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
            return handleSwitch(id, row);
        }
        if (cellData?.type === "eye") {
            return handleView(id, row);
        }
    };
    return (
        <div
            style={{
                width: "100%",
                overflow: "hidden",
                padding: "20px",
            }}
        >
            <SortingAndSelectingTable
                id={id}
                headCells={headCells}
                rows={rows}
                tableTitle={tableTitle}
                noMatchedRecords={noMatchedRecords}
                cellRenderer={handleCellRender}
                showCheckbox={showCheckbox}
            />
        </div>
    );
};

export default PrimarySetupTable;

import SortingAndSelectingTable from "components/SortingAndSelectingTable";
import { TableIcon } from "components/TableUtility";
import React from "react";

const ZnlabsReferrenceTable = ({
    id,
    tableTitle,
    rows,
    headCells,
    noMatchedRecords,
    showCheckbox,
    handleEditZnlabs,
    handleDeleteZnlabs,
    handleChangeRowsPerPage,
    handleChangePage,
    rowsPerPage,
    page,
    count,
}) => {
    const iconActionMapping = {
        edit: (id, row) => handleEditZnlabs(id, row),
        delete: (id, row) => handleDeleteZnlabs(id, row),
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
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                page={page}
                count={count}
            />
        </div>
    );
};

export default ZnlabsReferrenceTable;

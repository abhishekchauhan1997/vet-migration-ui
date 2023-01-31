import { Paper } from "@mui/material";
import FormHeader from "components/Form/FormHeader";
import SortingAndSelectingTable from "components/SortingAndSelectingTable";
import { TableIcon } from "components/TableUtility";
import dayjs from "dayjs";
import React from "react";
import Data from "../../../../src/pages/widget/cpWidget/Email/data.json";

const MessageHistory = () => {
    const {
        consequentTitle,
        columns = [],
        rows = [],
        noMatchedRecords,
    } = Data ?? {};
    const iconActionMapping = {
        search: (id, row) => console.log(id, row),
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
        } else if (cellData.type === "date") {
            return <p>{dayjs(cellData.data).format("MMM-DD--YYYY")}</p>;
        }
    };
    //todo attachment while integrating

    return (
        <Paper>
            <FormHeader title={consequentTitle} />
            <div style={{ padding: "20px" }}>
                <SortingAndSelectingTable
                    showCheckbox={false}
                    headCells={columns}
                    rows={rows}
                    cellRenderer={handleCellRender}
                    showPagination={false}
                    noMatchedRecords={noMatchedRecords}
                />
            </div>
        </Paper>
    );
};

export default MessageHistory;

import Search from "components/Search";
import SortingAndSelectingTable from "components/SortingAndSelectingTable";
import { TableIcon } from "components/TableUtility";
import PDFDownloader from "components/PDFDownloader";
import { Grid, Typography } from "@mui/material";
import React, { lazy, Suspense, useState } from "react";

const ResultApproval = lazy(() => import("./../ResultApproval"));

const ReportTable = ({
    id,
    tableTitle,
    rows,
    headCells,
    noMatchedRecords,
    handleDeleteItems,
    cmdReport,
    fieldDetails,
    inputRef,
    handleSearch,
}) => {
    const [openResultApproval, setOpenResultApproval] = useState(false);
    const iconActionMapping = {
        exam: (id) => {
            console.log(id, "exam");
        },
        download: () => {
            console.log("download");
        },
        chain: () => {
            console.log("chain");
        },
        check: () => {
            console.log("check");
            setOpenResultApproval(true);
        },
    };

    const handleCellRender = (cellData, _col, id) => {
        if (cellData?.type === "icon") {
            if (cellData?.data === "exam") {
                return (
                    <PDFDownloader
                        mode="modal"
                        modalTitle={"View Result"}
                        htmlData={`
                            <table style="border: '2px solid red';">
                                <thead style="background-color: crimson; color: white;">
                                    <tr>
                                        <th>Col1</th>
                                        <th>Col2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cell1</td>
                                        <td>Cell2</td>
                                    </tr>
                                    <tr>
                                        <td>Cell1</td>
                                        <td>Cell2</td>
                                    </tr>
                                </tbody>
                            </table>
                            `}
                    >
                        <TableIcon
                            id={id}
                            type={cellData?.data}
                            title={cellData?.title}
                            color={cellData?.color}
                        />
                    </PDFDownloader>
                );
            }

            return (
                <TableIcon
                    id={id}
                    handleClick={iconActionMapping[cellData?.data]}
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
                padding: "0px 10px",
                overflow: "hidden",
            }}
        >
            <SortingAndSelectingTable
                id={id}
                rows={rows}
                headCells={headCells}
                tableTitle={tableTitle}
                cellRenderer={handleCellRender}
                noMatchedRecords={noMatchedRecords}
                handleDelete={handleDeleteItems}
                showCheckbox={
                    cmdReport === "pending" ||
                    cmdReport === "partial" ||
                    cmdReport === "approved"
                        ? true
                        : false
                }
                component={
                    <Search
                        inputRef={inputRef}
                        id={fieldDetails?.key}
                        handleSearch={handleSearch}
                        label={fieldDetails?.label}
                        placeholder={fieldDetails?.label}
                    />
                }
            />
            {/* Hardcoded the data for now, will change on API integration */}
            <Suspense fallback={null}>
                <ResultApproval
                    open={openResultApproval}
                    onClose={() => setOpenResultApproval(false)}
                    data={{
                        title: "Zoetis Reference Lab (ZRL) - Result Approval",
                    }}
                />
            </Suspense>
        </div>
    );
};

export default ReportTable;

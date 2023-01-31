import { Paper } from "@mui/material";
import axios from "axios";
import useGetPageDataContext from "hooks/usePageDataContext";
import React, { useCallback, useEffect } from "react";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import ZnlabsReferrenceHeader from "./ZnlabReferrenceHeader";
import ZnlabsReferrenceTable from "./ZnlabReferrenceTable";
import "./znlabs_ref_styles.scss";

const ZnLabReferrenceSetupPage = ({
    title,
    rows,
    headCells,
    showCheckbox,
    noMatchedrecords,
    setOpenAddPlanItem,
    actionBtns,
    tableTitle,
    id,
    setHeadCells,
    setRows,
    dummyRows,
    dummyColumns,
    apiUrls,
    setOpenEditModal,
    formatingFunction,
    setSelectedRow,
    fetchZnlabSpeciesAndBreed,
    handleChangeRowsPerPage,
    handleChangePage,
    rowsPerPage,
    page,
    count,
}) => {
    useEffect(() => {
        if (API_ENABLED) {
            fetchZnlabSpeciesAndBreed();
        } else {
            setHeadCells(dummyColumns);
            setRows(dummyRows);
        }
    }, [
        dummyRows,
        fetchZnlabSpeciesAndBreed,
        dummyColumns,
        setHeadCells,
        setRows,
    ]);
    const { setAlert } = useGetPageDataContext();

    const handleImportItemBtn = useCallback(() => {
        axios
            .get(`${API_BASEURL}${API_BASENAME}/${apiUrls?.importUrl}`)
            .then((res) => {
                console.log("res", res);
                setAlert({
                    open: true,
                    message: res.data.message,
                    severity: "success",
                });
                fetchZnlabSpeciesAndBreed();
            })
            .catch((err) => {
                setAlert({
                    open: true,
                    message: "Error",
                    severity: "success",
                });
            });
    }, [apiUrls?.importUrl, fetchZnlabSpeciesAndBreed, setAlert]);

    const handleDeleteZnlabs = useCallback(
        (id, row) => {
            let data = {
                id: id,
                row: row,
            };

            axios
                .post(
                    `${API_BASEURL}${API_BASENAME}/${apiUrls?.updateStatus}`,
                    data
                )
                .then((res) => {
                    setAlert({
                        open: true,
                        message: res.data.message,
                        severity: "success",
                    });
                    fetchZnlabSpeciesAndBreed();
                })
                .catch((err) => {});
        },
        [apiUrls?.updateStatus, fetchZnlabSpeciesAndBreed]
    );

    const handleEditZnlabs = (id, row) => {
        setSelectedRow(row);
        setOpenEditModal(true);
    };

    return (
        <Paper>
            <ZnlabsReferrenceHeader
                title={title}
                actionBtns={actionBtns}
                setOpenAddPlanItem={setOpenAddPlanItem}
                handleImportItemBtn={handleImportItemBtn}
                fetchZnlabSpeciesAndBreed={fetchZnlabSpeciesAndBreed}
            />
            <ZnlabsReferrenceTable
                id={id}
                rows={rows}
                headCells={headCells}
                showCheckbox={showCheckbox}
                noMatchedRecords={noMatchedrecords}
                tableTitle={tableTitle}
                handleDeleteZnlabs={handleDeleteZnlabs}
                handleEditZnlabs={handleEditZnlabs}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                page={page}
                count={count}
            />
        </Paper>
    );
};

export default ZnLabReferrenceSetupPage;

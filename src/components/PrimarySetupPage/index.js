import { Paper } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import PrimarySetupHeader from "./PrimarySetupHeader";
import PrimarySetupTable from "./PrimarySetupTable";
import "./primary_setup_styles.scss";

const PrimarySetupPage = ({
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
    setInitialData,

    updateUrl,
}) => {
    const fetchComplaints = useCallback(() => { 
        axios
            .get(`${API_BASEURL}${API_BASENAME}/${apiUrls.getPrimarySetupData}`)
            .then((res) => {
                const rowData = res.data.map((item) => ({
                    _id: item._id,
                    name: {
                        type: "text",
                        data: item.name,
                    },
                    status: {
                        type: "switch",
                        data: item.status,
                    },
                    description: {
                        type: "text",
                        data: item.description,
                    },

                    actions: {
                        type: "array",
                        data: [
                            {
                                type: "icon",
                                data: "edit",
                                title: "Edit",
                                color: "#1E88E5",
                            },
                        ],
                    },
                }));

                setRows(rowData);
                // setHeadCells(dummyColumns);
            })
            .catch((err) => {});
    }, [apiUrls.getPrimarySetupData, setRows]);

    useEffect(() => {
        if (API_ENABLED) {
            fetchComplaints();
        } else {
            setHeadCells(dummyColumns);
            setRows(dummyRows);
        }
    }, [dummyRows, fetchComplaints, dummyColumns, setHeadCells, setRows]);

    const handleBtn = () => {
        setOpenEditModal(true);
    };

    const handleSwitch = (id, row) => {
        let originalTypes = [...rows];
        let index = originalTypes.findIndex((item) => item._id === row._id);
        if (row?._id) {
            row.status.data = !row.status.data;
        }
        if (index !== -1) {
            originalTypes[index] = row;
            setRows(originalTypes);
        }

        axios
            .put(
                `${API_BASEURL}${API_BASENAME}/${updateUrl.getPrimarySetupData}/${originalTypes[index]._id}`,
                row
            )
            .then((response) => {})
            .catch((error) => {});
    };

    const handleEdit = (id, row) => {
        setInitialData(row);
        setOpenEditModal(true);
        setOpenAddPlanItem();
    };

    return (
        <Paper>
            <PrimarySetupHeader
                title={title}
                actionBtns={actionBtns}
                setOpenAddPlanItem={setOpenAddPlanItem}
                handleBtn={handleBtn}
            />

            <PrimarySetupTable
                id={id}
                rows={rows}
                headCells={dummyColumns}
                showCheckbox={showCheckbox}
                noMatchedRecords={noMatchedrecords}
                tableTitle={tableTitle}
                handleSwitch={handleSwitch}
                handleEdit={handleEdit}
            />
        </Paper>
    );
};

export default PrimarySetupPage;

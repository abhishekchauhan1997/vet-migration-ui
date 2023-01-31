import { Paper } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { getItemSession } from "utils/appUtils";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import PrimarySetupHeader from "./PrimarySetupHeader";
import PrimarySetupTable from "./PrimarySetupTable";
import "./primary_setup_styles.scss";

const dataMapping = (item) => {
    return {
        _id: item._id,
        id: item._id,
        vendorType: {
            type: "text",
            data: item?.name ? item?.name : "",
        },
        description: {
            type: "text",
            data: item?.desc ? item.desc : "",
        },
        status: {
            type: "switch",
            data: item?.status === 1 ? true : false,
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
    };
};

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
    setOpenEditModal,
    setInitialData,
    refreshPage,
    setAddNew,
    updateManufacturer,
}) => {
    const [count, setCount] = useState(0);

    const fetchManufacturerAndVendorTypes = useCallback(
        (limit = 10, page = 0) => {
            axios
                .get(
                    `${API_BASEURL}${API_BASENAME}/vendor/type/fetch/all?limit=${limit}&page=${
                        page + 1
                    }`
                )
                .then((res) => {
                    let rawData = res.data;
                    let formatData = rawData.data.map((item) =>
                        dataMapping(item)
                    );
                    setRows(formatData);
                    setCount(rawData.count);
                    setHeadCells(dummyColumns);
                })
                .catch((err) => {
                    console.log("something went wrong", err);
                });
        },
        [dummyColumns, setHeadCells, setRows]
    );

    useEffect(() => {
        if (API_ENABLED) {
            const [clinicId] = [getItemSession("clinicId")];
            console.log(clinicId, "clinicID is hardcoded");
            fetchManufacturerAndVendorTypes();
        } else {
            setHeadCells(dummyColumns);
            setRows(dummyRows);
        }
    }, [
        dummyRows,
        fetchManufacturerAndVendorTypes,
        dummyColumns,
        setHeadCells,
        setRows,
        refreshPage,
    ]);

    //code for vendor type update

    // const { setAlert } = useGetPageDataContext();
    // const [count, setCount] = useState(0);

    // //!for updating table without hitting API
    // const statusUpdateFun = (id, value) => {
    //     for (var i in rows) {
    //         if (rows[i]._id === id) {
    //             let temp = [...rows];
    //             temp[i].status = { ...value };
    //             setRows(temp);
    //             break; //Stop this loop, we found it!
    //         }
    //     }
    // };

    // const StatusUpdateFunction = (id, value) => {
    //     axios({
    //         method: "put",
    //         url: `${API_BASEURL}${API_BASENAME}/vendortype/update_vendorType/${id}`,
    //         data: value,
    //     })
    //         .then(({ data }) => {
    //             statusUpdateFun(id, {
    //                 type: "switch",
    //                 data: value.status === 1 ? true : false,
    //             });
    //             setAlert({
    //                 open: true,
    //                 message: data?.message,
    //                 severity: "success",
    //             });
    //         })
    //         .catch((error) => {
    //             if (error?.response?.data?.message) {
    //                 setAlert({
    //                     open: true,
    //                     message: error.response.data.message,
    //                     severity: "error",
    //                 });
    //             }
    //             console.log("something went wrong", error);
    //         });
    // };

    // const handleSwitch = (id, val) => {
    //     let value = { status: val?.status?.data ? 2 : 1 };
    //     StatusUpdateFunction(id, value);
    // };

    const handleBtn = () => {
        setOpenEditModal(true);
        setInitialData({});
    };

    const handleSwitch = (id, row) => {
        setAddNew(false);
        let originalTypes = [...rows];
        let index = originalTypes.findIndex(
            (item) => item.id?.data === id?.data
        );
        if (row?.id?.data) {
            row.status.data = !row.status.data;
            updateManufacturer(row.status.data, row?.id?.data);
        }
        if (index !== -1) {
            originalTypes[index] = row;
            setRows(originalTypes);
        }
    };

    const handleEdit = (id, row) => {
        setInitialData(row);
        setOpenEditModal(true);
    };
    const handleRowsPerChange = (limit, page) => {
        fetchManufacturerAndVendorTypes(limit, page);
    };

    return (
        <Paper>
            <PrimarySetupHeader
                setInitialData={setInitialData}
                title={title}
                actionBtns={actionBtns}
                setOpenAddPlanItem={setOpenAddPlanItem}
                handleBtn={handleBtn}
                setAddNew={setAddNew}
            />
            <PrimarySetupTable
                id={id}
                rows={rows}
                headCells={headCells}
                showCheckbox={showCheckbox}
                noMatchedRecords={noMatchedrecords}
                tableTitle={tableTitle}
                handleSwitch={handleSwitch}
                handleEdit={handleEdit}
                handleRowsPerChange={handleRowsPerChange}
                count={count}
            />
        </Paper>
    );
};

export default PrimarySetupPage;

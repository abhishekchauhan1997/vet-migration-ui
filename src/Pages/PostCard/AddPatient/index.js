import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Grid, Paper } from "@mui/material";
import { FormControl, FormLabel, Input } from "components/GenForm/Input";
import Form from "components/GenForm";
import Button from "UIComponents/Button";

const AddClientFromExcel = () => {
    const [setColumn, setColumnName] = useState({});
    const [setCsvColumn, setCsvColumnName] = useState({});

    const addfile = (e) => {
        e.preventDefault();

        var files = e.target.files,
            f = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            let readedData = XLSX.read(data, { type: "binary" });
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];
            /* Convert array to json*/
            const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
            //setFileUploaded(dataParse);
            console.log("dataParse", dataParse[1][1]);
            let dataval = dataParse[1];
            let arrIndex = [];

            for (let j = 0; j < setCsvColumn.length; j++) {
                for (let i = 0; i < dataval.length; i++) {
                    if (setCsvColumn[j] === dataParse[0][i]) {
                        arrIndex.push(i);
                    }
                }
            }

            let payloadData = [];
            for (let j = 1; j < dataParse.length; j++) {
                let rowData = {};
                for (let i = 0; i < setColumn.length; i++) {
                    rowData[setColumn[i]] = dataParse[j][arrIndex[i]];
                }
                payloadData.push(rowData);
            }

            console.log("payloadData", payloadData);
        };
        reader.readAsBinaryString(f);
    };

    const getFormData = (data) => {
        console.log("data-->", data);
        var filters = [data];

        for (var i = 0; i < filters.length; i++) {
            let obj = filters[i];
            let arr = [];
            let arr2 = [];
            for (var key in obj) {
                arr.push(key);
                arr2.push(obj[key]);
            }
            setColumnName(arr);
            setCsvColumnName(arr2);
        }

        // setColumnName();
    };

    console.log("setColumnName", setColumn);
    console.log("setCsvColumnName", setCsvColumn);
    return (
        <Paper>
            <Grid required component={FormControl} xs="11">
                <Grid
                    item
                    xs={2}
                    htmlFor="titleHead"
                    component={FormLabel}
                    sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "flex-start",
                        color: "red",
                        ml: 2,
                    }}
                >
                    <b
                        style={{
                            color: "#1976d2",
                            textTransform: "capitalize",
                            cursor: "pointer",
                        }}
                    >
                        Enter Respective Column Name
                    </b>
                </Grid>
            </Grid>

            <div className="subTitleForm">
                {/* {<LocalLibraryIcon className="icon_pdt" />} {subTitle} */}
            </div>
            <Form lastElementId="address2" onSubmit={getFormData}>
                <div className="formWidth">
                    <Grid container spacing={1}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container required component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="company"
                                    component={FormLabel}
                                >
                                    clinic
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="company"
                                        id="company"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="title"
                                    component={FormLabel}
                                >
                                    title
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        key="title"
                                        defaultValue=""
                                        id="title"
                                        type="text"
                                        helperText="This field is required"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container required component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="firstName"
                                    component={FormLabel}
                                >
                                    First Name
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="firstName"
                                        id="firstName"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container required component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="lastName"
                                    component={FormLabel}
                                >
                                    Last Name
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="lastName"
                                        id="lastName"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container required component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="address1"
                                    component={FormLabel}
                                >
                                    Address 1
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="address1"
                                        id="address1"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container required component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="state"
                                    component={FormLabel}
                                >
                                    State
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="state"
                                        id="state"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="country"
                                    component={FormLabel}
                                >
                                    Country
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="country"
                                        id="country"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container required component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="city"
                                    component={FormLabel}
                                >
                                    City
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="city"
                                        id="city"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container required component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="email"
                                    component={FormLabel}
                                >
                                    Email
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="email"
                                        id="email"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container required component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="phone"
                                    component={FormLabel}
                                >
                                    Phone No
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="phone"
                                        id="phone"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container required component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="phonetype"
                                    component={FormLabel}
                                >
                                    Phone type
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="phonetype"
                                        id="phonetype"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 1,
                                ml: 3,
                            }}
                        >
                            <Grid container required component={FormControl}>
                                <Grid
                                    item
                                    xs={2}
                                    htmlFor="address2"
                                    component={FormLabel}
                                >
                                    Address 2
                                </Grid>
                                <Grid item xs={5}>
                                    <Input
                                        autoFocus
                                        defaultValue=""
                                        key="address2"
                                        id="address2"
                                        type="text"
                                        helperText="This field is required"
                                    ></Input>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} className="bt_pdr">
                            <Grid container justifyContent="flex-end">
                                <Button type="submit">Save</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Form>

            <Grid
                xs="12"
                sx={{
                    p: 1,
                }}
            >
                <input
                    type="file"
                    placeholder="Upload file"
                    accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(event) => {
                        addfile(event);
                    }}
                />
            </Grid>
        </Paper>
    );
};

export default AddClientFromExcel;

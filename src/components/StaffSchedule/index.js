import { FormControlLabel, FormGroup, Grid } from "@mui/material";
import axios from "axios";
import FormHeader from "components/Form/FormHeader";
import FormFooter from "components/Form/FormFooter";
import Form from "components/GenForm";
import Checkbox from "components/GenForm/Checkbox";
import { FormControl, FormLabel, Input } from "components/GenForm/Input";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "UIComponents/Card";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import Data from "./data.json";
import useSessionContext from "hooks/useSessionContext";

const StaffSchedule = () => {
    const [data, setData] = useState({});
    const { state } = useLocation();
    const { clinic } = useSessionContext();
    const [staffName] = [state?.name, state?.id] ?? null;

    useEffect(() => {
        // --- get data ---
        setData(Data);
    }, []);

    const postAppointmentData = (data) => {
        axios
            .post(`${API_BASEURL}${API_BASENAME}/`, data)
            .then((response) => {})
            .catch((error) => {});
    };

    const handleFormSubmit = (data) => {
        if (API_ENABLED) postAppointmentData(data);
        else console.log(data);
    };

    const {
        title = "",
        fieldData = {},
        fieldDetails = {},
        actionButtonLabels = {},
    } = data ?? {};

    return (
        <Card>
            <Form
                id="client_registeration_from"
                lastElementId="tags"
                onSubmit={handleFormSubmit}
            >
                <FormHeader title={title} />
                <div className="form" style={{ padding: "20px 0px 20px 20px" }}>
                    <Grid container>
                        <Grid item xs={8}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Grid container component={FormControl}>
                                        <Grid item xs={12} md={4}>
                                            <FormLabel htmlFor="clinicSchedule">
                                                {
                                                    fieldDetails.clinicSchedule
                                                        ?.label
                                                }
                                            </FormLabel>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <Input
                                                readOnly
                                                id="clinicSchedule"
                                                type="text"
                                                value={clinic.title ?? ""}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container component={FormControl}>
                                        <Grid item xs={12} md={4}>
                                            <FormLabel htmlFor="userSchedule">
                                                {
                                                    fieldDetails.userSchedule
                                                        ?.label
                                                }
                                            </FormLabel>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <Input
                                                readOnly
                                                id="userSchedule"
                                                type="text"
                                                defaultValue={staffName}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container component={FormControl}>
                                        <Grid item xs={12} md={4}>
                                            <FormLabel htmlFor="workingDays">
                                                {
                                                    fieldDetails.workingDays
                                                        ?.label
                                                }
                                            </FormLabel>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <Grid
                                                container
                                                component={FormGroup}
                                                justifyContent="space-between"
                                            >
                                                {fieldData.workingDays?.map(
                                                    ({ id, title }) => (
                                                        <Grid item key={id}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        // defaultChecked={
                                                                        //     initialData.smsToClient ??
                                                                        //     false
                                                                        // }
                                                                        id={id}
                                                                    />
                                                                }
                                                                label={title}
                                                            />
                                                        </Grid>
                                                    )
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                </div>
                <FormFooter content={actionButtonLabels.modify} />
            </Form>
        </Card>
    );
};

export default StaffSchedule;

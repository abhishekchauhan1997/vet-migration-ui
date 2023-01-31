import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "UIComponents/Button";
import Form from "components/GenForm";
import { FormControl, FormLabel, Input } from "components/GenForm/Input";
import IconButton from "UIComponents/IconButton";
import Icon from "components/IconComponent";
import Dialog from "UIComponents/Dialog";
import AutocompleteControl from "components/GenForm/AutocompleteControl";
import FormControlLabel from "components/GenForm/FormControlLabel";
import Checkbox from "components/GenForm/Checkbox";
import axios from "axios";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import Data from "./data.json";
import useSessionContext from "hooks/useSessionContext";

const SmsWidgetModal = ({ open, onClose, phonetype }) => {
    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"));
    const { patient, sessionData } = useSessionContext();
    const [data, setData] = useState({});
    const [recordToEnc, setRecordToEnc] = useState(true);
    const [encounters, setEncOpts] = useState([]);

    const { title = "", fieldDetails = {}, dialogLabels = {} } = data ?? {};

    const getEncounterOpts = useCallback(() => {
        axios
            .get(
                `${API_BASEURL}${API_BASENAME}/encounter/registration/fetch/patient/${sessionData?.patient_session}?_p=name,status=1`
            )
            .then(({ data }) => {
                setEncOpts(data);
            })
            .catch((err) => {});
    }, [sessionData?.patient_session]);

    const handleFormSubmit = (data) => {};

    const patients = useMemo(() => {
        if (sessionData?.patient_session) {
            let sessionPat = {
                _id: sessionData?.patient_session,
                name: patient?.name,
                status: patient?.status ?? 1,
                patientNo: patient?.patientNo,
            };
            return patient?.patients?.length > 0
                ? [
                      ...[sessionPat],
                      ...(patient?.patients?.filter((x) => x.status === 1) ??
                          []),
                  ]
                : [sessionPat];
        } else return [];
    }, [
        patient?.name,
        patient?.patientNo,
        patient?.patients,
        patient?.status,
        sessionData?.patient_session,
    ]);

    const defaultPatient = useMemo(() => {
        if (sessionData?.patient_session && patients?.length > 0)
            return patients?.find(
                (x) => x._id === sessionData?.patient_session
            );
        else return null;
    }, [patients, sessionData?.patient_session]);

    const defaultEncounter = useMemo(() => {
        if (encounters?.length > 0)
            return encounters?.find(
                (x) => x._id === sessionData?.encounter_session
            );
        else return null;
    }, [sessionData?.encounter_session, encounters]);

    useEffect(() => {
        setData(Data);
    }, []);

    useEffect(() => {
        if (API_ENABLED && open && sessionData?.patient_session)
            getEncounterOpts();
    }, [getEncounterOpts, open, sessionData?.patient_session]);

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="md"
            scroll={"paper"}
            fullScreen={fullScreenDialog}
            PaperProps={{
                sx: { padding: 0 },

                component: Form,
                lastElementId: "encounter",
                className: "smsModal-wrapper",
                onSubmit: handleFormSubmit,
            }}
        >
            <div className="flex aiC formHeader">
                <Dialog.DialogTitle style={{ padding: "10px" }}>
                    {title}
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setRecordToEnc(true);
                            onClose();
                        }}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "#3b4468",
                            fontWeight: 500,
                        }}
                    >
                        <Icon type="delete" className="dialog_icon" />
                    </IconButton>
                </Dialog.DialogTitle>
            </div>
            <Dialog.DialogContent
                sx={{
                    padding: "10px",
                    marginInline: "10px",
                    scrollBehavior: "smooth",
                }}
                id="inputFieldsContainer"
                dividers
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid required component={FormControl} container>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="messages">
                                    {fieldDetails.messages?.label}
                                </FormLabel>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={8}
                                component={Input}
                                multiline
                                minRows={3}
                                maxRows={6}
                                id="messages"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            component={FormControl}
                            justifyContent="flex-end"
                        >
                            <Grid item xs={12} md={4}></Grid>
                            <Grid item xs={12} md={8}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={recordToEnc}
                                            id="recordToEnc"
                                            onChange={(e) =>
                                                setRecordToEnc(e.target.checked)
                                            }
                                        />
                                    }
                                    label={fieldDetails?.recordToEnc?.label}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {recordToEnc && (
                        <>
                            <Grid item xs={12}>
                                <Grid
                                    required
                                    component={FormControl}
                                    container
                                >
                                    <Grid item xs={12} md={4}>
                                        <FormLabel htmlFor="patients">
                                            {fieldDetails?.patients?.label}
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <AutocompleteControl
                                            id="patients"
                                            key={defaultPatient?._id}
                                            defaultValue={
                                                defaultPatient ?? null
                                            }
                                            options={patients ?? []}
                                            isOptionEqualToValue={(
                                                option,
                                                value
                                            ) =>
                                                option._id ===
                                                (value._id ?? value)
                                            }
                                            helperText={
                                                fieldDetails?.patients
                                                    ?.helperText
                                            }
                                            renderOption={(props, option) => (
                                                <li
                                                    {...props}
                                                    key={option?._id}
                                                >
                                                    <p>
                                                        {option.name} (
                                                        {option.patientNo})
                                                    </p>
                                                </li>
                                            )}
                                            getOptionLabel={(option) => {
                                                return `${option.name} (${option.patientNo})`;
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    required
                                    component={FormControl}
                                    container
                                >
                                    <Grid item xs={12} md={4}>
                                        <FormLabel htmlFor="encounter">
                                            {fieldDetails?.encounter?.label}
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <AutocompleteControl
                                            key={defaultEncounter?._id}
                                            id="encounter"
                                            defaultValue={
                                                defaultEncounter ?? null
                                            }
                                            options={encounters}
                                            isOptionEqualToValue={(
                                                option,
                                                value
                                            ) =>
                                                option._id ===
                                                (value._id ?? value)
                                            }
                                            helperText={
                                                fieldDetails?.encounter
                                                    ?.helperText
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Dialog.DialogContent>
            <Dialog.DialogActions sx={{ padding: "10px 20px" }}>
                <Button
                    variant="text"
                    onClick={() => {
                        setRecordToEnc(true);
                        onClose();
                    }}
                >
                    {dialogLabels.close}
                </Button>
                <Button type="submit">{dialogLabels.send}</Button>
            </Dialog.DialogActions>
        </Dialog>
    );
};

export default SmsWidgetModal;

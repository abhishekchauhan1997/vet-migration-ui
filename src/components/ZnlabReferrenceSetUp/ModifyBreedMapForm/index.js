import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { FormControl, FormLabel } from "components/GenForm/Input";
import Button from "UIComponents/Button";
import BreedMapData from "./BreedMapData.json";
import CloseIcon from "@mui/icons-material/Close";
import { API_BASENAME, API_ENABLED } from "utils/constants";
import axios from "axios";
import Form from "components/GenForm";
import Autocomplete from "components/GenForm/Autocomplete";
import Dialog from "UIComponents/Dialog";

function BreedMapping({ title, open, onClose }) {
    const [data, setData] = useState({});
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        setInitialData({});
    }, []);

    const postBreedMapData = (data) => {
        axios
            .post(`${API_BASENAME}`, data)
            .then((response) => {})
            .catch((error) => {});
    };

    const handleFormSubmit = (data) => {
        if (API_ENABLED) postBreedMapData(data);
        else console.log(data);
    };

    const {
        fieldDetails = {},
        fieldData = {},
        actionButtonLabels = {},
    } = data ?? {};

    useEffect(() => {
        setData(BreedMapData);
    }, []);

    return (
        <Paper>
            <Dialog
                open={open}
                fullWidth
                maxWidth="sm"
                scroll={"paper"}
                PaperProps={{
                    sx: { padding: 0 },
                    component: Form,
                    lastElementId: "description",
                    className: "appointmentForm-wrapper",
                    onSubmit: handleFormSubmit,
                }}
            >
                <div className="flex aiC formHeader">
                    <Dialog.DialogTitle sx={{ padding: "10px" }}>
                        {title}
                    </Dialog.DialogTitle>

                    <Dialog.DialogActions
                        sx={{ padding: 0 }}
                        className="formButtons-container flex flexG justifyE"
                    >
                        <Button onClick={onClose} defaultColor variant="icon">
                            {<CloseIcon />}
                        </Button>
                    </Dialog.DialogActions>
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
                            <Grid container required component={FormControl}>
                                <Grid item xs={12} md={4}>
                                    <FormLabel htmlFor="species">
                                        {fieldDetails?.species?.label}
                                    </FormLabel>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={8}
                                    id="species"
                                    component={Autocomplete}
                                    options={fieldData.species}
                                    helperText={
                                        fieldDetails?.species?.helperText
                                    }
                                    defaultValue={initialData.species}
                                    isOptionEqualToValue={(option, value) =>
                                        option.id === (value.id ?? value)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container required component={FormControl}>
                                <Grid item xs={12} md={4}>
                                    <FormLabel htmlFor="breed">
                                        {fieldDetails?.breed?.label}
                                    </FormLabel>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={8}
                                    id="breed"
                                    component={Autocomplete}
                                    options={fieldData.breed}
                                    helperText={fieldDetails?.breed?.helperText}
                                    defaultValue={initialData.breed}
                                    isOptionEqualToValue={(option, value) =>
                                        option.id === (value.id ?? value)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Dialog.DialogContent>
                <Dialog.DialogActions sx={{ padding: "10px 20px" }}>
                    <Button variant="text" onClick={onClose}>
                        {actionButtonLabels.close}
                    </Button>
                    <Button type="submit">{actionButtonLabels.save}</Button>
                </Dialog.DialogActions>
            </Dialog>
        </Paper>
    );
}

export default BreedMapping;

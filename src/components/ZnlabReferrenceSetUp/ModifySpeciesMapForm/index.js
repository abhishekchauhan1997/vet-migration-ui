import React, { useState, useEffect, useCallback } from "react";
import { Grid, Paper } from "@mui/material";
import { FormControl, FormLabel } from "components/GenForm/Input";
import Button from "UIComponents/Button";
import SpeciesMapData from "./SpeciesMapData.json";
import CloseIcon from "@mui/icons-material/Close";
import { API_BASENAME, API_ENABLED, API_BASEURL } from "utils/constants";
import axios from "axios";
import Form from "components/GenForm";
import Autocomplete from "components/GenForm/Autocomplete";
import Dialog from "UIComponents/Dialog";
import useGetPageDataContext from "hooks/usePageDataContext";

function SpeciesMapping({
    selectedRow,
    title,
    open,
    onClose,
    updateUrl,
    fetchZnlabSpeciesAndBreed,
}) {
    const [data, setData] = useState({});
    const [optionData, setOptionData] = useState({});
    const { setAlert } = useGetPageDataContext();

    const [option, setOption] = useState(null);
    useEffect(() => {
        console.log("selected Row", selectedRow);
        let url = `${API_BASEURL}${API_BASENAME}/patient/species/fetch/all/1?_p=name`;
        axios
            .get(url)
            .then((response) => {
                let formateOption = response.data.map((item) => {
                    return { id: item._id, title: item.name };
                });
                setOptionData(formateOption);
                if (selectedRow?.vetportSpecies.data) {
                    let optValue = {
                        id: selectedRow.vetportSpeciesId,
                        title: selectedRow?.vetportSpecies.data,
                    };
                    setOption(optValue);
                } else {
                    setOption(null);
                }
            })
            .catch((error) => {
                onClose(false);
            });
    }, [onClose, selectedRow]);

    const postSpeciesData = (data) => {
        let url = `${API_BASEURL}${API_BASENAME}/${updateUrl}`;
        let payload = {
            id: selectedRow.id,
            speciesId: option.id,
        };
        axios
            .post(url, payload)
            .then((response) => {
                if (response.data.status === 1) {
                    setAlert({
                        open: true,
                        message: response.data.message,
                        severity: "success",
                    });
                } else {
                    setAlert({
                        open: true,
                        message: response.data.message,
                        severity: "error",
                    });
                }
                fetchZnlabSpeciesAndBreed();
                onClose(false);
            })
            .catch((error) => {
                onClose(false);
            });
    };

    const handleFormSubmit = (data) => {
        if (API_ENABLED) postSpeciesData(data);
        else console.log(data);
    };

    const { fieldDetails = {}, actionButtonLabels = {} } = data ?? {};

    const handleOptionChange = (e, newValue) => {
        setOption(newValue);
    };

    useEffect(() => {
        setData(SpeciesMapData);
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
                    lastElementId: "species",
                    className: "SpeciesForm-wrapper",
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
                                <Grid item xs={12} md={8}>
                                    <Autocomplete
                                        id="species"
                                        options={optionData}
                                        helperText={
                                            fieldDetails?.species?.helperText
                                        }
                                        value={option}
                                        isOptionEqualToValue={(option, value) =>
                                            option.id === (value.id ?? value)
                                        }
                                        onChange={handleOptionChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Dialog.DialogContent>
                <Dialog.DialogActions sx={{ padding: "10px 20px" }}>
                    <Button variant="text" onClick={onClose}>
                        {actionButtonLabels.close}
                    </Button>
                    <Button type="submit">{actionButtonLabels.save} </Button>
                </Dialog.DialogActions>
            </Dialog>
        </Paper>
    );
}

export default SpeciesMapping;

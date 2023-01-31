import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "UIComponents/Button";
import Form from "components/GenForm";
import { FormControl, FormLabel } from "components/GenForm/Input";
import IconButton from "UIComponents/IconButton";
import Icon from "components/IconComponent";
import Dialog from "UIComponents/Dialog";
import AutocompleteControl from "components/GenForm/AutocompleteControl";
import useSessionContext from "hooks/useSessionContext";
import axios from "axios";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import useGetPageDataContext from "hooks/usePageDataContext";

const ChangeProviderModal = ({
    open,
    onClose,
    provider,
    title,
    fieldDetails,
    dialogLabels,
}) => {
    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"));
    const { setAlert } = useGetPageDataContext();
    const { clinic, setEncounter, encounter } = useSessionContext();
    const [providers, setProviders] = useState([]);

    const getProviderOpts = useCallback(() => {
        axios
            .get(
                `${API_BASEURL}${API_BASENAME}/staff/registration/fetch/clinic/1?_p=firstName,lastName&isProvider=14&clinicId=${clinic?._id}`
            )
            .then(({ data }) => {
                setProviders(
                    data.map((x) => ({
                        ...x,
                        name: `${x?.firstName} ${x?.lastName}`,
                    }))
                );
            })
            .catch((err) => {});
    }, [clinic?._id]);

    const saveFun = (data) => {
        axios({
            method: "put",
            url: `${API_BASEURL}${API_BASENAME}/encounter/registration/update/${encounter?._id}`,

            data,
        })
            .then(({ data }) => {
                setEncounter({
                    ...encounter,
                    provider: providers?.find((x) => x._id === data?.provider),
                });
                setAlert({
                    open: true,
                    message: dialogLabels?.successMsg,
                    severity: "success",
                });
                onClose();
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    const handleFormSubmit = (data) => {
        if (API_ENABLED && encounter?._id) saveFun(data);
    };

    useEffect(() => {
        if (API_ENABLED && open && clinic?._id) getProviderOpts();
    }, [clinic?._id, getProviderOpts, open]);

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
                lastElementId: "provider",
                className: "providerModal-wrapper",
                onSubmit: handleFormSubmit,
            }}
        >
            <div className="flex aiC formHeader">
                <Dialog.DialogTitle style={{ padding: "10px" }}>
                    {title}
                    <IconButton
                        aria-label="close"
                        onClick={() => onClose()}
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
                                <FormLabel htmlFor="provider">
                                    {fieldDetails?.provider?.label}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <AutocompleteControl
                                    key={provider?._id}
                                    id="provider"
                                    defaultValue={provider ?? null}
                                    options={providers}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === (value._id ?? value)
                                    }
                                    helperText={
                                        fieldDetails?.provider?.helperText
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog.DialogContent>
            <Dialog.DialogActions sx={{ padding: "10px 20px" }}>
                <Button variant="text" onClick={() => onClose()}>
                    {dialogLabels.close}
                </Button>
                <Button type="submit">{dialogLabels.save}</Button>
            </Dialog.DialogActions>
        </Dialog>
    );
};

export default ChangeProviderModal;

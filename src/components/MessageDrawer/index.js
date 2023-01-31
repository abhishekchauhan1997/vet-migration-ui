// * ui elements *
import { ListItem, Grid } from "@mui/material";
import Drawer from "UIComponents/Drawer";
import Form from "components/GenForm";
import { FormControl, FormLabel, Input } from "components/GenForm/Input";
import List from "UIComponents/List";
import Checkbox from "components/GenForm/Checkbox";
import AutocompleteControl from "components/GenForm/AutocompleteControl";
import Button from "UIComponents/Button";
import IconButton from "UIComponents/IconButton";
import Icon from "components/IconComponent";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import Data from "../../pages/headerNavigation/Messages/data.json";
import useSessionContext from "hooks/useSessionContext";
import useGetPageDataContext from "hooks/usePageDataContext";

const MessageDrawer = ({ clinics, onClose, open, setOpen, getTableData }) => {
    const [encounterData, setEncounterData] = useState([]);
    const [checkboxVal, setCheckboxVal] = useState(false);
    const [providerOptions, setProviderOptions] = useState([]);
    const { encounter, clinic, patient } = useSessionContext();

    const [clinicSelected, setClinicSelected] = useState(clinic?._id);
    const { setAlert } = useGetPageDataContext();

    const { title = "", fieldData = {} } = Data ?? {};
    useEffect(() => {
        setEncounterData([]);
    }, [open]);

    //!for provider/staff options
    const getProviderOptionsFun = useCallback(
        (clinicId) => {
            axios
                .get(
                    `${API_BASEURL}${API_BASENAME}/staff/registration/fetch/clinic/1?clinicId=${clinicId}&_p=firstName,lastName`
                )
                .then(({ data }) => {
                    let options = data?.map((item) => {
                        return {
                            _id: item?._id,
                            name: item?.firstName + " " + item?.lastName,
                        };
                    });
                    let staffsAfterFilter = options.filter(
                        (item) => item._id !== encounter.provider._id
                    );
                    setProviderOptions(staffsAfterFilter);
                })
                .catch((err) => {
                    console.log("something went wrong", err?.response);
                });
        },
        [encounter.provider]
    );
    useEffect(() => {
        if (API_ENABLED && clinicSelected)
            getProviderOptionsFun(clinicSelected);
    }, [getProviderOptionsFun, clinicSelected]);
    //! encounter data here
    const getEncounterByPatient = useCallback((id) => {
        axios
            .get(
                `${API_BASEURL}${API_BASENAME}/encounter/registration/fetch/patient/${id}?_p=name&status=1`
            )
            .then(({ data }) => {
                if (data?.length) setCheckboxVal(true);
                setEncounterData(data);
                // let test = data.find((item) => item._id === encounter._id);
            })
            .catch((err) => {
                console.log("something went wrong", err?.response);
            });
    }, []);
    useEffect(() => {
        console.log("encounter", encounter);
        if (patient?._id) getEncounterByPatient(patient?._id);
    }, [patient, encounter, getEncounterByPatient]);
    //! For bulletin save
    const saveMessageFun = useCallback(
        (val) => {
            axios({
                method: "post",
                url: `${API_BASEURL}${API_BASENAME}/communication/messages/add`,
                data: val,
            })
                .then(({ data }) => {
                    setAlert({
                        open: true,
                        message: data?.message,
                        severity: "success",
                    });
                    getTableData();
                    setOpen(false);
                })
                .catch((err) => {
                    console.log("something went wrong", err?.response);
                });
        },
        [setOpen, setAlert, getTableData]
    );
    const onSubmit = (data) => {
        let DataToSend = {
            message: data?.message ?? "",
            staffId: data?.clinicStaffIdForMessagePage,
            clinicId: data?.clinicIdForMessagePage,
            priority: 11,
            type: "private",
            action: data?.recordToEncounter ? 14 : 15,
            ...(data.EncounterEMR_Id && { emrId: data?.EncounterEMR_Id }),
        };
        // console.log("DataToSend", DataToSend);
        saveMessageFun(DataToSend);
    };

    return (
        <Drawer isOpen={open} onClose={onClose} className="maxVH overflow-auto">
            <List>
                <ListItem
                    className="w100 pt8"
                    secondaryAction={
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                color: "#3b4468",
                                fontWeight: 500,
                            }}
                        >
                            <Icon type="delete" className="dialog_icon" />
                        </IconButton>
                    }
                >
                    <p
                        style={{
                            fontWeight: 600,
                            fontSize: "17px",
                        }}
                    >
                        {title}
                    </p>
                </ListItem>
            </List>

            <Form
                className="form_container"
                lastElementId={
                    checkboxVal && encounterData?.length
                        ? "EncounterEMR_Id"
                        : fieldData.message?.key
                }
                onSubmit={onSubmit}
            >
                <div
                    className="grid_form_container form"
                    style={{ overflow: "initial" }}
                >
                    {/* //!select clinic */}
                    <Grid
                        container
                        spacing={1}
                        required
                        component={FormControl}
                        sx={{ mb: 1 }}
                    >
                        <Grid item justifyContent="center" xs={12}>
                            <FormLabel htmlFor={fieldData.clinic?.id}>
                                {fieldData.clinic?.label}
                            </FormLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <AutocompleteControl
                                id={fieldData?.clinic?.id}
                                key={fieldData?.clinic?.key}
                                defaultValue={clinics?.find(
                                    (option) => option?._id === clinic?._id
                                )}
                                options={clinics}
                                getOptionLabel={(option) => {
                                    return option?.name;
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    option?._id === (value?._id ?? value)
                                }
                                placeholder={fieldData.clinic?.placeholder}
                                helperText={fieldData.clinic?.helperText}
                                onChange={(e, value) => {
                                    setClinicSelected(value?._id);
                                }}
                            />
                        </Grid>
                    </Grid>
                    {/* //!for selecting multiple staffs */}
                    <Grid
                        item
                        container
                        spacing={1}
                        required
                        component={FormControl}
                        sx={{ mb: 1 }}
                    >
                        <Grid item justifyContent="center" xs={12}>
                            <FormLabel htmlFor={fieldData.staff?.id}>
                                {fieldData.staff?.label}
                            </FormLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <AutocompleteControl
                                multiple
                                limitTags={2}
                                id={fieldData?.staff?.id}
                                key={providerOptions}
                                options={providerOptions}
                                getOptionLabel={(option) => {
                                    return option?.name;
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    option?._id === (value?._id ?? value)
                                }
                                placeholder={fieldData.staff?.placeholder}
                                helperText={fieldData.staff?.helperText}
                            />
                        </Grid>
                    </Grid>
                    {/* //* input field below */}
                    <Grid
                        item
                        container
                        spacing={1}
                        required
                        component={FormControl}
                        sx={{ mb: 1 }}
                    >
                        <Grid item xs={12}>
                            <Input
                                id={fieldData.message?.key}
                                placeholder={fieldData.message?.placeholder}
                                helperText={fieldData.message?.helperText}
                                multiline
                                type="address"
                                minRows={2}
                                maxRows={6}
                            />
                        </Grid>
                    </Grid>
                    {/* //*check-box */}
                    <Grid
                        item
                        container
                        spacing={1}
                        component={FormControl}
                        sx={{ justifyContent: "space-between" }}
                    >
                        {!checkboxVal && (
                            <Grid item>
                                <Checkbox
                                    style={{ padding: 0 }}
                                    id="recordToEncounter"
                                    checked={checkboxVal}
                                    onClick={() => {
                                        // setCheckboxVal && setEncounterData([]);
                                        setCheckboxVal((prev) => !prev);
                                    }}
                                />
                                {/* </Grid>
                        <Grid item justifyContent="center"> */}
                                <FormLabel
                                    htmlFor="recordToEncounter"
                                    sx={{ pl: 1 }}
                                >
                                    {fieldData.recordToEncounter?.label}
                                </FormLabel>
                            </Grid>
                        )}

                        <Grid item justifyContent="center">
                            {!checkboxVal && (
                                <Button type="submit" size="small">
                                    Send
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    {/* //*for encounter Autocomplete */}
                    {checkboxVal && (
                        <Grid
                            item
                            container
                            required
                            component={FormControl}
                            sx={{
                                mt: 1,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Grid item justifyContent="center" xs={12}>
                                <Checkbox
                                    style={{ padding: 0 }}
                                    id={fieldData.recordToEncounter?.key}
                                    checked={checkboxVal}
                                    onClick={() => {
                                        // setCheckboxVal && setEncounterData([]);
                                        setCheckboxVal((prev) => !prev);
                                    }}
                                />
                                <FormLabel htmlFor={"EncounterEMR_Id"}>
                                    {fieldData.recordToEncounter?.SelectLabel}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={10} sm={9}>
                                <AutocompleteControl
                                    id={"EncounterEMR_Id"}
                                    key={encounterData?.length}
                                    // let test = data.find((item) => item._id === encounter._id);
                                    defaultValue={
                                        encounterData?.length
                                            ? encounterData.find(
                                                  (item) =>
                                                      item._id === encounter._id
                                              )
                                            : null
                                    }
                                    options={encounterData}
                                    getOptionLabel={(option) => {
                                        return option?.name;
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                        option?._id === (value?._id ?? value)
                                    }
                                    placeholder={
                                        fieldData.recordToEncounter?.placeholder
                                    }
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} sx={{ pl: "4px" }}>
                                <Button type="submit" size="small">
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    )}

                    {/* <Grid
                        sx={{ display: "flex", justifyContent: "end", mt: 1 }}
                    >
                        <Button type="submit" size="small">
                            {actionButtonLabels.save}
                        </Button>
                    </Grid> */}
                </div>
            </Form>
        </Drawer>
    );
};

export default MessageDrawer;

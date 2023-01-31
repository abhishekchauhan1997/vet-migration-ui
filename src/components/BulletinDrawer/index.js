import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

// * ui elements *
import { ListItem, Grid } from "@mui/material";
import Drawer from "UIComponents/Drawer";
import Form from "components/GenForm";
import { FormControl, FormLabel, Input } from "components/GenForm/Input";
import AutocompleteSearch from "components/GenForm/AutocompleteSearch";
import { RadioControlLabel, RadioGroup } from "components/GenForm/Radio";
import List from "UIComponents/List";
import Checkbox from "components/GenForm/Checkbox";

// * utils *
import { API_BASENAME, API_BASEURL } from "utils/constants";
import AutocompleteControl from "components/GenForm/AutocompleteControl";
import IconButton from "UIComponents/IconButton";
import Icon from "components/IconComponent";
import Button from "UIComponents/Button";
import useSessionContext from "hooks/useSessionContext";
import Data from "../../pages/headerNavigation/Bulletin/data.json";
import useGetPageDataContext from "hooks/usePageDataContext";

const BulletinDrawer = ({ onClose, open, setOpen, getTableData, clinics }) => {
    const [clientPatientSelected, setClientPatientSelected] = useState(null);
    const [encounterData, setEncounterData] = useState([]);
    const [checkboxVal, setCheckboxVal] = useState(false);
    const { clinic } = useSessionContext();
    const { setAlert } = useGetPageDataContext();

    const {
        title = "",
        fieldData = {},
        // actionButtonLabels = {},
        priorityCheckboxes = [],
    } = Data ?? {};
    useEffect(() => {
        setClientPatientSelected(null);
        setEncounterData([]);
    }, [open]);

    //! encounter data here
    const getEncounterByPatient = useCallback(() => {
        axios
            .get(
                `${API_BASEURL}${API_BASENAME}/encounter/registration/fetch/patient/${clientPatientSelected?._id}?_p=name`
            )
            .then(({ data }) => {
                setEncounterData(data);
                if (data?.length) setCheckboxVal(true);
            })
            .catch((err) => {
                console.log("something went wrong", err?.response);
            });
    }, [clientPatientSelected]);

    useEffect(() => {
        if (clientPatientSelected?._id) getEncounterByPatient();
    }, [clientPatientSelected, getEncounterByPatient]);

    //! For bulletin save
    const saveBulletinFun = useCallback(
        (val) => {
            axios({
                method: "post",
                url: `${API_BASEURL}${API_BASENAME}/communication/bulletin/add`,
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
        // console.log(data);
        let DataToSend = {
            message: data?.bulletinMessage ?? "",
            clinicId: data?.clinicMultipleSelectId,
            emrId: data?.recordToEncounter ? data.EncounterEMR_Id : null,
            priority: data?.priority * 1, //normal=11, low=12, high =13
            action: data?.recordToEncounter ? 14 : 15,
            type: "public",
        };
        // console.log("DataToSend :>> ", DataToSend);
        // console.log(DataToSend);
        saveBulletinFun(DataToSend);
    };

    //!manipulating autocompleteSearch options here
    const CompleteSearchFunOptionsManipulating = (data) => {
        let formatOptionData = data?.map((item) => {
            // console.log("item :>> ", item);
            return {
                _id: item?._id,
                name: `${item?.clientId.firstName} ${item?.clientId.lastName} - ${item?.name} (${item?.patientNo})`,
            };
        });
        return formatOptionData;
    };
    const defaultFun = useMemo(() => {
        if (clinics.length > 0 && clinic._id) {
            return clinics?.filter((option) => option?._id === clinic?._id);
        } else {
            return [];
        }
    }, [clinics, clinic._id]);

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
                    checkboxVal
                        ? "EncounterEMR_Id"
                        : fieldData.recordToEncounter?.key
                }
                onSubmit={onSubmit}
            >
                {/* <FormHeader content={actionButtonLabels.save} /> */}
                <div
                    className="grid_form_container form"
                    style={{ overflow: "initial" }}
                >
                    {/* //* clinic */}
                    <Grid
                        container
                        spacing={1}
                        required
                        component={FormControl}
                    >
                        <Grid item justifyContent="center" xs={12}>
                            <FormLabel htmlFor={fieldData.clinic?.id}>
                                {fieldData.clinic?.label}
                            </FormLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <AutocompleteControl
                                multiple
                                limitTags={2}
                                id={fieldData?.clinic?.id}
                                // key={fieldData.clinic?.key}
                                defaultValue={defaultFun}
                                options={clinics}
                                getOptionLabel={(option) => {
                                    return option?.name;
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    option?._id === (value?._id ?? value)
                                }
                                placeholder={fieldData.clinic?.placeholder}
                                helperText={fieldData.clinic?.helperText}
                            />
                        </Grid>
                    </Grid>
                    {/* //* clinic */}
                    <Grid container sx={{ mt: 1 }}>
                        {/* //* for client/Patient */}
                        <Grid
                            item
                            container
                            spacing={1}
                            required
                            component={FormControl}
                        >
                            <Grid item xs={12}>
                                <FormLabel
                                    htmlFor={"clientAndPatientSearchForClient"}
                                >
                                    {fieldData.clientPatient?.label}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12}>
                                {/* // always use autoComplete component in controlled way, we will not get data in handleSubmit form  */}
                                <AutocompleteSearch
                                    id={"clientAndPatientSearchForClient"}
                                    optionUrl={`search-cp/list/fetch?_p=name,patientNo&query`}
                                    formattingOpts={
                                        CompleteSearchFunOptionsManipulating
                                    }
                                    // value={clientPatientSelected}
                                    isOptionEqualToValue={(option, value) =>
                                        option?._id === (value?._id ?? value)
                                    }
                                    getOptionLabel={(option) => option?.name}
                                    placeholder={
                                        fieldData.clientPatient?.placeholder
                                    }
                                    helperText={
                                        fieldData.clientPatient?.helperText
                                    }
                                    onChange={(e) => {
                                        setClientPatientSelected(e);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {/* //* input text  */}
                        <Grid
                            item
                            container
                            spacing={1}
                            required
                            component={FormControl}
                            sx={{ mt: 1 }}
                        >
                            <Grid item xs={12}>
                                <Input
                                    id={fieldData.bulletinMessage?.key}
                                    placeholder={
                                        fieldData.bulletinMessage?.label
                                    }
                                    helperText={
                                        fieldData.bulletinMessage?.helperText
                                    }
                                    // type="text"
                                    multiline
                                    minRows={3}
                                    maxRows={6}
                                />
                            </Grid>
                        </Grid>
                        {/* //* RadioGroup */}
                        <Grid item container required component={FormControl}>
                            <Grid item justifyContent="center" xs={12}>
                                <FormLabel htmlFor={fieldData.priority?.key}>
                                    {fieldData.priority?.label}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12}>
                                <RadioGroup
                                    row
                                    name={fieldData?.priority?.key}
                                    defaultValue={11}
                                >
                                    {priorityCheckboxes?.map((priority) => (
                                        <RadioControlLabel
                                            key={priority.id}
                                            value={priority.id}
                                            label={priority.label}
                                            color="secondary"
                                        />
                                    ))}
                                </RadioGroup>
                            </Grid>
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
                                    id={fieldData.recordToEncounter?.key}
                                    checked={checkboxVal}
                                    onClick={() => {
                                        setCheckboxVal((prev) => !prev);
                                    }}
                                />
                                <FormLabel
                                    htmlFor={fieldData.recordToEncounter?.key}
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
                                    // id should be hard coded like this
                                    id={"EncounterEMR_Id"}
                                    // key is changing just because we are refreshing the component on the encounter base value
                                    key={encounterData}
                                    defaultValue={
                                        encounterData?.length
                                            ? encounterData[0]
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
                    {/* </div> */}
                </div>
            </Form>
        </Drawer>
    );
};

export default BulletinDrawer;

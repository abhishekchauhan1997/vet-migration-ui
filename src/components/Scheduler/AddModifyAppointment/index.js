import React, { useEffect, useState } from "react";
import { Grid, Zoom, Tooltip, FormGroup } from "@mui/material";
import dayjs from "dayjs";
import Button from "UIComponents/Button";
import Checkbox from "../../GenForm/Checkbox";
import Form from "./../../GenForm";
import {
    FormControl,
    FormLabel,
    Input,
    InputWithCheck,
} from "./../../GenForm/Input";
import Autocomplete from "./../../GenForm/Autocomplete";
import "./addModifyAppointment_styles.scss";
import Data from "./data.json";
import axios from "axios";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import { RadioControlLabel, RadioGroup } from "./../../GenForm/Radio";
import DatePicker from "./../../GenForm/DatePicker";
import TimePicker from "./../../GenForm/TimePicker";
import DateTimePickerControl from "./../../GenForm/DateTimePickerControl";
import FormControlLabel from "components/GenForm/FormControlLabel";
import Dialog from "UIComponents/Dialog";

const AddModifyAppointment = ({
    type = "add",
    open,
    onClose,
    appointmentDetails,
    showCurrentPatientDetails,
}) => {
    const isPastAppointment = appointmentDetails.startDateTime
        ? dayjs(new Date()).diff(dayjs(appointmentDetails.startDateTime)) > 0
        : false;
    const [data, setData] = useState({});
    const [dropOff, setDropOff] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [searchClientPatient, setSearchClientPatient] = useState("");
    const [recurringAppointment, setRecurringAppointment] = useState(false);
    const [startDateTime, setStartDateTime] = useState(
        appointmentDetails.startDateTime ?? ""
    );
    const [endDateTime, setEndDateTime] = useState(
        appointmentDetails.endDateTime ?? ""
    );

    useEffect(() => {
        if (type === "modify") {
            const initialState = {
                switchCheck: false,
                radioCheck: "male",
                searchClientPatient: "ps",
                appointmentType: "heartSpecialist",
                reasonForVisit: "choking",
                additionalComments: "choking",
                selectStaffs: ["allisonArgent"],
                selectEquipmentsRooms: ["monitor"],
                dropOff: false,
                recurringAppointment: true,
                emailToClient: true,
                smsToClient: true,
                clientRequirements: "Checking",
            };
            setInitialData(initialState);
            setDropOff(initialState.dropOff);
            setSearchClientPatient(initialState.searchClientPatient);
        }
    }, [type]);

    useEffect(() => {
        // --- get data ---
        setData(Data);
    }, []);

    useEffect(() => {
        setStartDateTime(appointmentDetails.startDateTime);
    }, [appointmentDetails.startDateTime]);

    useEffect(() => {
        setEndDateTime(appointmentDetails.endDateTime);
    }, [appointmentDetails.endDateTime]);

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
        <Dialog
            fullWidth
            open={open}
            PaperProps={{
                component: Form,
                lastElementId: "clientRequirements",
                className: "appointmentForm-wrapper",
                onSubmit: handleFormSubmit,
            }}
        >
            <Dialog.DialogHeader>
                <Dialog.DialogTitle>{title}</Dialog.DialogTitle>
                <Dialog.DialogActions>
                    <Button defaultColor variant="text">
                        {actionButtonLabels.addClient}
                    </Button>
                    <Button defaultColor variant="text">
                        {actionButtonLabels.quickAddClient}
                    </Button>
                </Dialog.DialogActions>
            </Dialog.DialogHeader>
            <Dialog.DialogContent id="inputFieldsContainer">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container required component={FormControl}>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="searchClientPatient">
                                    {fieldDetails.searchClientPatient?.label}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Input
                                    autoFocus
                                    id="searchClientPatient"
                                    type="search"
                                    value={searchClientPatient}
                                    onChange={({ target: { value } }) => {
                                        setSearchClientPatient(value);
                                    }}
                                    helperText={
                                        fieldDetails.searchClientPatient
                                            ?.helperText
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid component={FormControl} container>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="appointmentType">
                                    {fieldDetails.appointmentType?.label}
                                </FormLabel>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={8}
                                id="appointmentType"
                                component={Autocomplete}
                                options={fieldData.appointmentType}
                                defaultValue={initialData.appointmentType}
                                disabled={searchClientPatient.length === 0}
                                isOptionEqualToValue={(option, value) =>
                                    option.id === (value.id ?? value)
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid component={FormControl} container>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="reasonForVisit">
                                    {fieldDetails.reasonForVisit?.label}
                                </FormLabel>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={8}
                                id="reasonForVisit"
                                component={Autocomplete}
                                options={fieldData.reasonForVisit}
                                defaultValue={initialData.reasonForVisit}
                                disabled={searchClientPatient.length === 0}
                                isOptionEqualToValue={(option, value) =>
                                    option.id === (value.id ?? value)
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid component={FormControl} container>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="additionalComments">
                                    {fieldDetails.additionalComments?.label}
                                </FormLabel>
                            </Grid>
                            <Grid
                                d={true}
                                item
                                xs={12}
                                md={8}
                                multiline
                                minRows={3}
                                maxRows={6}
                                component={InputWithCheck}
                                defaultValue={
                                    initialData.additionalComments ?? ""
                                }
                                id="additionalComments"
                                disabled={searchClientPatient.length === 0}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container required component={FormControl}>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="selectStaffs">
                                    {fieldDetails.selectStaffs?.label}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Autocomplete
                                    multiple
                                    defaultValue={initialData.selectStaffs}
                                    id="selectStaffs"
                                    disabled={searchClientPatient.length === 0}
                                    helperText={
                                        fieldDetails.selectStaffs?.helperText
                                    }
                                    options={fieldData.selectStaffs}
                                    isOptionEqualToValue={(option, value) =>
                                        option.id === (value.id ?? value)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid component={FormControl} container>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="selectEquipmentsRooms">
                                    {fieldDetails.selectEquipmentsRooms?.label}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Autocomplete
                                    multiple
                                    filterSelectedOptions
                                    defaultValue={
                                        initialData.selectEquipmentsRooms
                                    }
                                    id="selectEquipmentsRooms"
                                    disabled={searchClientPatient.length === 0}
                                    options={fieldData.selectEquipmentsRooms}
                                    isOptionEqualToValue={(option, value) =>
                                        option.id === (value.id ?? value)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container component={FormControl} required>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="startTime">
                                    {fieldDetails.startTime?.label}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid
                                    container
                                    spacing={1}
                                    id="startTime"
                                    value={startDateTime}
                                    component={DateTimePickerControl}
                                    disabled={searchClientPatient.length === 0}
                                    helperText={
                                        fieldDetails.startTime?.helperText
                                    }
                                >
                                    <Grid item xs={6} md={6}>
                                        <DatePicker
                                            placeholder={
                                                fieldDetails.startTime
                                                    ?.dateFormat
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <TimePicker
                                            placeholder={
                                                fieldDetails.startTime
                                                    ?.timeFormat
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container component={FormControl} required>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="endDate">
                                    {fieldDetails.endTime?.label}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid
                                    container
                                    spacing={1}
                                    id="endTime"
                                    value={endDateTime}
                                    component={DateTimePickerControl}
                                    disabled={searchClientPatient.length === 0}
                                    helperText={
                                        fieldDetails.endTime?.helperText
                                    }
                                >
                                    <Grid item xs={6} md={6}>
                                        <DatePicker
                                            placeholder={
                                                fieldDetails.endTime?.dateFormat
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <TimePicker
                                            placeholder={
                                                fieldDetails.endTime?.timeFormat
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid component={FormControl} container>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="dropOff">
                                    {fieldDetails.dropOff?.label}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Tooltip
                                    arrow
                                    title={
                                        isPastAppointment
                                            ? fieldDetails.dropOff
                                                  ?.pastDisabled ?? ""
                                            : ""
                                    }
                                    TransitionComponent={Zoom}
                                >
                                    <FormControlLabel
                                        checked={dropOff}
                                        onChange={({ target: { checked } }) => {
                                            setDropOff(checked);
                                        }}
                                        control={
                                            <Checkbox
                                                id="dropOff"
                                                disabled={
                                                    searchClientPatient.length ===
                                                        0 || isPastAppointment
                                                }
                                            />
                                        }
                                        label={null}
                                    />
                                </Tooltip>
                            </Grid>
                            {dropOff && (
                                <Grid item xs={12} md={7}>
                                    <Grid
                                        container
                                        spacing={1}
                                        value={new Date()}
                                        id="dropOffDateTime"
                                        component={DateTimePickerControl}
                                        disabled={
                                            searchClientPatient.length === 0
                                        }
                                        helperText={
                                            fieldDetails.dropOffDateTime
                                                ?.helperText
                                        }
                                    >
                                        <Grid item xs={6} md={5}>
                                            <DatePicker
                                                placeholder={
                                                    fieldDetails.dropOffDateTime
                                                        ?.dateFormat
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={7}>
                                            <TimePicker
                                                placeholder={
                                                    fieldDetails.dropOffDateTime
                                                        ?.timeFormat
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid component={FormControl} container>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="recurringAppointment">
                                    {fieldDetails.recurringAppointment?.label}
                                </FormLabel>
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <FormControlLabel
                                    checked={recurringAppointment}
                                    control={
                                        <Checkbox
                                            onChange={({
                                                target: { checked },
                                            }) =>
                                                setRecurringAppointment(checked)
                                            }
                                            id="recurringAppointment"
                                            disabled={
                                                searchClientPatient.length === 0
                                            }
                                        />
                                    }
                                    label={null}
                                />
                            </Grid>
                            {recurringAppointment && (
                                <>
                                    <Grid item xs={12} md={4}>
                                        <RadioGroup
                                            row
                                            defaultValue="month"
                                            name="recurrenceInterval"
                                            helperText={
                                                fieldDetails.searchClientPatient
                                                    ?.helperText
                                            }
                                        >
                                            {fieldData.recurrenceInterval.map(
                                                (interval) => (
                                                    <RadioControlLabel
                                                        key={interval.id}
                                                        value={interval.id}
                                                        label={interval.title}
                                                    />
                                                )
                                            )}
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Grid container component={FormControl}>
                                            <Grid item xs={6}>
                                                <FormLabel htmlFor="occurrance">
                                                    {
                                                        fieldDetails.occurance
                                                            ?.label
                                                    }
                                                </FormLabel>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Autocomplete
                                                    disableClearable
                                                    defaultValue={
                                                        initialData.selectOccurance
                                                    }
                                                    id="occurrance"
                                                    disabled={
                                                        searchClientPatient.length ===
                                                        0
                                                    }
                                                    options={
                                                        fieldData.occurrance
                                                    }
                                                    isOptionEqualToValue={(
                                                        option,
                                                        value
                                                    ) =>
                                                        option.id ===
                                                        (value.id ?? value)
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            justifyContent="flex-end"
                            component={FormGroup}
                        >
                            <Grid item xs={6} md={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            defaultChecked={
                                                initialData.smsToClient ?? false
                                            }
                                            id="emailToClient"
                                            disabled={
                                                searchClientPatient.length === 0
                                            }
                                        />
                                    }
                                    label={fieldDetails.emailToClient?.label}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            defaultChecked={
                                                initialData.emailToClient ??
                                                false
                                            }
                                            id="smsToClient"
                                            disabled={
                                                searchClientPatient.length === 0
                                            }
                                        />
                                    }
                                    label={fieldDetails.smsToClient?.label}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid component={FormControl} container>
                            <Grid item xs={12} md={4}>
                                <FormLabel htmlFor="clientRequirements">
                                    {fieldDetails.clientRequirements?.label}
                                </FormLabel>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={8}
                                multiline
                                minRows={3}
                                maxRows={6}
                                component={Input}
                                defaultValue={
                                    initialData.clientRequirements ?? ""
                                }
                                id="clientRequirements"
                                disabled={searchClientPatient.length === 0}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog.DialogContent>
            <Dialog.DialogActions>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => onClose(false)}
                >
                    {actionButtonLabels.cancel}
                </Button>
                <Button type="submit">{actionButtonLabels.save}</Button>
            </Dialog.DialogActions>
        </Dialog>
    );
};

export default AddModifyAppointment;

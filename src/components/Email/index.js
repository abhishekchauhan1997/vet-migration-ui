import React, { useState, useEffect, useRef } from "react";
import { Grid, Paper } from "@mui/material";
import { FormControl, FormLabel, Input } from "components/GenForm/Input";
import Data from "../../../src/pages/widget/cpWidget/Email/data.json";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import axios from "axios";
import Autocomplete from "components/GenForm/Autocomplete";
import FormHeader from "components/Form/FormHeader";
import Checkbox from "components/GenForm/Checkbox";
import FormControlLabel from "components/GenForm/FormControlLabel";
import WYSIWYGEditor from "UIComponents/WYSIWYGEditor";
import Form from "components/GenForm";
import Button from "UIComponents/Button";
import useSessionContext from "hooks/useSessionContext";
import MessageHistory from "./MessageHistory";
import UploadComp from "./UploadComp";
import UploadPreviewer from "./UploadComp/UploadPreviewer";
// import UploadPreviewer from "./UploadComp/UploadPreviewer";

const TOOLBAR_OPTIONS = [
    "bold italic underline removeformat",
    "strikethrough superscript subscript ",
    "fontsize forecolor",
    "alignleft aligncenter alignright outdent indent",
    "lineheight fontfamily",
    "table link image media",
    "fullscreen code",
];

function Email() {
    const [data, setData] = useState({});
    const [initialData] = useState({});
    const { client } = useSessionContext();
    const [checkboxClicked, setCheckboxClicked] = useState(true);
    const [files, setFiles] = useState([]);
    const uploadPhotoRef = useRef(null);

    const {
        title,
        actionButtonLabels = {},
        fieldDetails = {},
        fieldData = {},
    } = data ?? {};

    useEffect(() => {
        setData(Data);
    }, []);

    const postEmailData = (data) => {
        axios
            .post(`${API_BASEURL}${API_BASENAME}/`, data)
            .then((response) => {})
            .catch((error) => {});
    };

    const handleFormSubmit = (data) => {
        if (API_ENABLED) postEmailData(data);
        else console.log(data);
    };

    return (
        <>
            <Paper>
                <Form lastElementId="encounterOpt" onSubmit={handleFormSubmit}>
                    <FormHeader title={title} />
                    <div
                        style={{
                            maxWidth: "95%",
                            marginInline: "auto",
                            marginBlock: "30px",
                            paddingBottom: "30px",
                        }}
                    >
                        <Grid container spacing={1}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <WYSIWYGEditor
                                        options={{
                                            toolbar: TOOLBAR_OPTIONS,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ paddingTop: "40px" }}>
                                <Grid container required>
                                    <Grid item xs={12} md={2}>
                                        <FormLabel htmlFor="attachment">
                                            {fieldDetails?.attachment?.label}
                                        </FormLabel>
                                    </Grid>
                                    <UploadComp
                                        id="attachments"
                                        files={files}
                                        dispatcher={setFiles}
                                        uploadPhotoRef={uploadPhotoRef}
                                        helperText={
                                            fieldDetails?.attachment?.helperText
                                        }
                                    />
                                </Grid>
                            </Grid>
                            {files?.length > 0 && (
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12} md={3}>
                                            <FormLabel>
                                                {fieldDetails?.uploaded?.label}
                                            </FormLabel>
                                        </Grid>
                                        <Grid item xs={12} sm={7} lg={5}>
                                            <UploadPreviewer
                                                files={files}
                                                dispatcher={setFiles}
                                                uploadPhotoRef={uploadPhotoRef}
                                                type="link"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Grid
                                    component={FormControl}
                                    required
                                    container
                                >
                                    <Grid item xs={12} md={2}>
                                        <FormLabel htmlFor="subject">
                                            {fieldDetails?.subject?.label}
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Input
                                            id={"subject"}
                                            type="text"
                                            placeholder={
                                                fieldDetails.subject?.label
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    component={FormControl}
                                    container
                                    required
                                >
                                    <Grid item xs={12} md={2}>
                                        <FormLabel htmlFor="messageTo">
                                            {fieldDetails?.messageTo?.label}
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Input
                                            id={"messageTo"}
                                            key={client?.email}
                                            type="text"
                                            defaultValue={client?.email}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container component={FormControl}>
                                    <Grid item xs={12} md={2}>
                                        <FormControlLabel
                                            style={{
                                                marginRight: "2px",
                                                alignItems: "self-start",
                                                color: "#3b4468",
                                            }}
                                            control={
                                                <Checkbox
                                                    // key={initialData?.encounter}
                                                    // defaultChecked={
                                                    //     initialData?.encounter ??
                                                    //     false
                                                    // }
                                                    id="encounter"
                                                    checked={checkboxClicked}
                                                    onChange={(e) =>
                                                        setCheckboxClicked(
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            }
                                        />
                                        {fieldDetails?.encounter?.secondaryText}
                                    </Grid>
                                    {checkboxClicked && (
                                        <Grid item xs={12} md={3}>
                                            <Autocomplete
                                                defaultValue={
                                                    initialData.encounterOpt
                                                }
                                                id="encounterOpt"
                                                helperText={
                                                    fieldDetails.encounterOpt
                                                        ?.helperText
                                                }
                                                options={fieldData.encounterOpt}
                                                isOptionEqualToValue={(
                                                    option,
                                                    value
                                                ) =>
                                                    option.id ===
                                                    (value.id ?? value)
                                                }
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container component={FormControl}>
                                    <Grid item xs={12} md={5}></Grid>
                                    <Grid item xs={12} md={2}>
                                        <Button htmlFor="send">
                                            {actionButtonLabels?.send}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Form>
            </Paper>
            <Paper>
                <MessageHistory />
            </Paper>
        </>
    );
}
export default Email;

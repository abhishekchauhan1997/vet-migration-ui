import React, { useCallback, useEffect, useState, Fragment } from "react";
import Card from "UIComponents/Card";
import Button from "UIComponents/Button";
import axios from "axios";
import { API_BASENAME, API_BASEURL } from "utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Paper, Grid, CircularProgress } from "@mui/material";
import useGetPageDataContext from "hooks/usePageDataContext";
import AutocompleteControl from "components/GenForm/AutocompleteControl";

const FormTypeMaster = () => {
    const [previewData, setPreviewData] = useState("No Preview Data");
    const [formTypes, setFormTypes] = useState([]);
    const [templateData, settemplateData] = useState(null);
    const [isLoading, setIsLoading] = useState({
        get: false,
        map: false,
    });
    //hooks
    const navigate = useNavigate();
    const { state } = useLocation();
    const { setAlert } = useGetPageDataContext();

    const alert = useCallback(
        (message = "", severity = "success") => {
            setAlert({ open: true, message, severity });
        },
        [setAlert]
    );

    const setLoader = useCallback((type, loading = false) => {
        setIsLoading((currState) => ({ ...currState, [type]: loading }));
    }, []);

    const getTemplateData = useCallback(
        (id, type) => {
            setLoader("get", true);
            axios
                .get(
                    `${API_BASEURL}${API_BASENAME}/plan/item/fetch/template/${id}?type=${type}`
                )
                .then(({ data }) => {
                    settemplateData(
                        data?._id ? data : { _id: 0, name: "No Form" }
                    );
                })
                .catch((error) => {
                    throw new Error(error);
                })
                .finally(() => setLoader("get", false));
        },
        [setLoader]
    );

    const getPreviewData = useCallback(
        (id) => {
            if (id === 0) {
                setPreviewData("No Preview Data");
            } else {
                setLoader("get", true);
                axios
                    .get(
                        `${API_BASEURL}${API_BASENAME}/templates/preview/${id}`
                    )
                    .then(({ data }) => {
                        setPreviewData(data?.html ?? "No Preview Data");
                    })
                    .catch((error) => {
                        setPreviewData("No Preview Data");

                        throw new Error(error);
                    })
                    .finally(() => setLoader("get", false));
            }
        },
        [setLoader]
    );

    const getOpts = useCallback((type) => {
        axios
            .get(
                `${API_BASEURL}${API_BASENAME}/templates/list/filter/type?name=${type}`
            )
            .then(({ data }) => {
                data.unshift({ _id: 0, name: "No Form" });
                setFormTypes(data);
            })
            .catch((error) => {
                throw new Error(error);
            });
    }, []);

    const postTemplateData = () => {
        axios
            .put(`${API_BASEURL}${API_BASENAME}/plan/item/update/${state.id}`, {
                template_id: templateData?._id === 0 ? null : templateData?._id,
            })
            .then(({ data }) => {
                alert(data.message, "success");
                navigate("/home/planitems_list");
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    useEffect(() => {
        if (templateData && Object.keys(templateData).length > 0) {
            getPreviewData(templateData?._id);
        }
    }, [getPreviewData, templateData]);

    useEffect(() => {
        if (state) {
            getOpts(state.name);
            getTemplateData(state.id, state.name);
        }
    }, [getTemplateData, state, getOpts]);

    return (
        <Paper>
            <Card className="card_header">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                                <b>
                                    {state.name} for {state?.planitem}
                                </b>
                            </Grid>
                            <Grid item xs={12} sm={8} md={4}>
                                <AutocompleteControl
                                    placeholder={"Select Form Types"}
                                    id="templateId"
                                    getOptionLabel={(option) =>
                                        option?.name ?? option
                                    }
                                    options={formTypes}
                                    value={templateData ?? null}
                                    onChange={(e, val) => {
                                        settemplateData(val);
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === (value._id ?? value)
                                    }
                                    disableClearable={true}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                                md={2}
                                sx={{
                                    display: "flex",
                                    gridGap: "10px",
                                    flexWrap: { xs: "wrap", md: "nowrap" },
                                    justifyContent: {
                                        xs: "flex-start",
                                        md: "flex-end",
                                    },
                                    pt: { xs: 1, md: 0 },
                                }}
                            >
                                <Button
                                    onClick={postTemplateData}
                                    className={`card_btn h40`}
                                    fullWidth={true}
                                >
                                    {isLoading.map ? (
                                        <CircularProgress
                                            style={{
                                                width: "14px",
                                                height: "14px",
                                                color: "#fff",
                                            }}
                                        />
                                    ) : (
                                        "MAP TO PLANITEM"
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            <Box textAlign={"center"} sx={{ p: "15px 20px", color: "#3b4468" }}>
                {!isLoading.get ? (
                    <Fragment>
                        <p
                            style={{
                                textAlign: "left",
                                fontSize: "18px",
                                marginBottom: "10px",
                            }}
                        >
                            <b className="text-capitalize">
                                {templateData?.name} Preview
                            </b>{" "}
                        </p>
                        <Box
                            sx={{
                                padding: "20px",
                                margin: { xs: "auto", md: "0 auto" },
                                maxWidth: { xs: "unset", md: "900px" },
                                border: "1px solid #e5e8f5",
                                borderRadius: "3px",
                            }}
                            dangerouslySetInnerHTML={{
                                __html: previewData,
                            }}
                        ></Box>
                    </Fragment>
                ) : (
                    <CircularProgress
                        sx={{ width: 30, height: 30 }}
                        color="primary"
                        size="md"
                    />
                )}
            </Box>
        </Paper>
    );
};

export default FormTypeMaster;

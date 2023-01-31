import React, { useState, useEffect, useCallback, useRef } from "react";
import { styled } from "@mui/material/styles";

// * ui elements *
import { Grid, Box, Paper, Switch, Typography } from "@mui/material";
import { FormGenerator } from "UIComponents/FormBuilder";
import Button from "UIComponents/Button";
import Card from "UIComponents/Card";
import { Checkbox } from "UIComponents/Checkbox";

// * global state *
import usePageDataContext from "hooks/usePageDataContext";

const FormBuilderPreview = ({ formData = [] }) => {
    // refs
    const formGenerator = useRef(null);
    const childCompUpdateAllowed = useRef(true);

    // global state
    const { setAlert } = usePageDataContext();

    // local state
    const [markAllAsNormal, setMarkAllAsNormal] = useState(false);

    useEffect(() => {
        if (markAllAsNormal) {
            childCompUpdateAllowed.current = true;
        }

        if (childCompUpdateAllowed.current) {
            formGenerator.current?.injectPropToComponent({
                name: "markAllAsNormal",
                value: markAllAsNormal,
            });
        }
    }, [markAllAsNormal]);

    const onFormSubmit = (data, errors) => {
        if (!errors) {
            console.log("VALIDATION SUCCESSFUL", data);
            return;
        }

        let errorText = "";

        errors.forEach((errorItem) => {
            errorText += `Field '${errorItem.label}' is required\n`;
        });

        setAlert({
            open: true,
            message: errorText,
            severity: "error",
        });
    };

    const operationCallback = useCallback((operation) => {
        if (operation === "REMOVE_MARK_AS_NORMAL") {
            childCompUpdateAllowed.current = false;
            setMarkAllAsNormal(false);
        }
    }, []);

    return (
        <Paper sx={{ p: 1 }}>
            <Card>
                <Checkbox
                    label={"Mark All as Normal"}
                    checked={markAllAsNormal}
                    onChange={(ev) => setMarkAllAsNormal(ev.target.checked)}
                />

                <FormGenerator
                    ref={formGenerator}
                    // prepopulatedData={formData.map((item) => ({
                    //     name: item.field_name,
                    //     value: "Sample Default Value",
                    // }))}
                    data={formData}
                    onSubmit={onFormSubmit}
                    callback={operationCallback}
                />

                <Button
                    onClick={() => {
                        formGenerator.current?.simulateSubmit();
                    }}
                >
                    SUBMIT
                </Button>
            </Card>
        </Paper>
    );
};

export default FormBuilderPreview;

export const PreviewSwitch = ({
    showPreview = false,
    togglePreview = () => {},
}) => {
    return (
        <Grid sx={{ mb: 1.5, mt: 1 }} container>
            <Grid item md={10}></Grid>
            <Grid item md={2} display="flex" justifyContent="flex-end">
                <Box display="flex" alignItems="center">
                    <Typography sx={{ mr: 1.5 }}>Preview</Typography>
                    <IOSSwitch checked={showPreview} onChange={togglePreview} />
                </Box>
            </Grid>
        </Grid>
    );
};

const IOSSwitch = styled((props) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor:
                    theme.palette.mode === "dark" ? "#2ECA45" : "#6e8dfb",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

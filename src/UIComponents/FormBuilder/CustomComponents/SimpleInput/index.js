import React, { useEffect, useMemo } from "react";

// * ui elements *
import { Grid } from "@mui/material";
import Input from "UIComponents/Input";

const SimpleInput = ({ name, defaultValue, data, update, number }) => {
    const updateCustomValue = useMemo(
        () => (optionObj) => update?.(name, data, optionObj),
        [name, data, update]
    );

    useEffect(() => {
        // to initialize the custom data with defaultValue
        updateCustomValue(defaultValue ?? "");
    }, [updateCustomValue, defaultValue]);

    const onChange = (val) => {
        updateCustomValue(val);
    };

    return (
        <Grid item xs={12} md={6}>
            <Input
                id="additionalOptInput"
                type={number ? "number" : "text"}
                defaultValue={defaultValue}
                onChange={(ev) => onChange(ev.target.value)}
            />
        </Grid>
    );
};

export default SimpleInput;

SimpleInput.config = {
    key: "SimpleInput",
    element: "CustomElement",
    canPopulateFromApi: false,
    canHaveAlternateForm: false,
    canHaveOptionValue: false,
    canHaveOptionCorrect: false,
    canHavePageBreakBefore: false,
    type: "custom",
    static: false,
    field_name: "simple_input_",
    name: "Input",
    icon: "fa fa-font",
    label: "<b>1. Placeholder label</b>",
    props: { number: false },
};

import React, { useEffect, useRef, useState } from "react";
import { MobileTimePicker as MuiTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormControl, FormHelperText } from "@mui/material";
import { useFormContext } from "context/FormContext";
import { useFormControlErrorContext } from "context/FormControlErrorContext";
import Input from "UIComponents/Input";
import { useDateTimePickerControlContext } from "context/DateTimePickerControlContext";

const TimePicker = ({
    id,
    value,
    disabled,
    onChange,
    helperText,
    placeholder,
    ...props
}) => {
    const focusRef = useRef();
    const [date, setDate] = useState(value ?? null);
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    const {
        timeRef,
        value: controlValue,
        disabled: controlDisabled,
        onChange: controlOnChange,
        helperText: controlHelperText,
    } = useDateTimePickerControlContext() ?? {};
    // const error = errorFields.includes(id);
    const error = errorFields.some((item) => item.id === id);

    useEffect(() => {
        if (id)
            fieldCollector(() => ({
                id,
                required,
                value: (onChange && value) ?? controlValue ?? date,
                onFocus: () => {
                    focusRef.current.focus();
                },
            }));
    }, [id, fieldCollector, value, controlValue, date, required, onChange]);

    useEffect(() => {
        if (required) {
            setError(error);
        }
    }, [required, error, setError]);

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MuiTimePicker
                    {...props}
                    inputRef={id ? focusRef : timeRef}
                    InputProps={{ id }}
                    disabled={disabled ?? controlDisabled}
                    value={(onChange && value) ?? controlValue ?? date}
                    renderInput={(params) => (
                        <Input.TextField
                            {...params}
                            textFieldFullWidth
                            placeholder={placeholder}
                        />
                    )}
                    onChange={
                        onChange ??
                        ((newDate) =>
                            controlOnChange?.(newDate, "time") ??
                            setDate(newDate))
                    }
                />
            </LocalizationProvider>
            {(helperText ?? controlHelperText) && error && (
                <FormHelperText sx={{ marginLeft: "14px" }} error>
                    {helperText ?? controlHelperText}
                </FormHelperText>
            )}
        </>
    );
};

export default TimePicker;

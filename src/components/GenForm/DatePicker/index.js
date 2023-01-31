import { MobileDatePicker as MuiDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Input from "UIComponents/Input";

import React, { useEffect, useRef, useState } from "react";
import { useFormControl, FormHelperText } from "@mui/material";
import { useFormContext } from "context/FormContext";
import { useFormControlErrorContext } from "context/FormControlErrorContext";
import { useDateTimePickerControlContext } from "context/DateTimePickerControlContext";

const DatePicker = ({
    id,
    value,
    disabled,
    onChange,
    helperText,
    placeholder,
    width,
    showToolbar = false,
    _testingClassName_,
    textFieldFullWidth = true,
    ...props
}) => {
    const focusRef = useRef();
    const [date, setDate] = useState(value ?? null);
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    const {
        dateRef,
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
    }, [id, date, value, required, onChange, controlValue, fieldCollector]);

    useEffect(() => {
        if (required) {
            setError(error);
        }
    }, [required, error, setError]);
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MuiDatePicker
                    {...props}
                    inputRef={id ? focusRef : dateRef}
                    disabled={disabled ?? controlDisabled}
                    showToolbar={showToolbar}
                    value={(onChange && value) ?? controlValue ?? date}
                    renderInput={({ inputProps }) => (
                        <Input
                            id={id}
                            inputProps={{
                                ...inputProps,
                                className: _testingClassName_
                                    ? `Sel-${_testingClassName_}-input`
                                    : "",
                            }}
                            style={{ width }}
                            placeholder={placeholder}
                            fullWidth={textFieldFullWidth}
                            required={props?.required}
                            error={props?.error}
                        />
                    )}
                    onChange={
                        onChange ??
                        ((newDate) =>
                            controlOnChange?.(newDate, "date") ??
                            setDate(newDate))
                    }
                />
            </LocalizationProvider>
            {(helperText ?? controlHelperText) && error && (
                <FormHelperText sx={{ marginLeft: "14px" }} error>
                    {helperText}
                </FormHelperText>
            )}
        </>
    );
};

export default DatePicker;

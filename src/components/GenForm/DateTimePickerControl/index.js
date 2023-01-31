import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { DateTimePickerControlContextProvider } from "context/DateTimePickerControlContext";
import { useFormContext } from "context/FormContext";
import { useFormControl } from "@mui/material";
import { useFormControlErrorContext } from "context/FormControlErrorContext";

const DateTimePickerControl = ({
    id,
    value,
    children,
    disabled,
    onChange,
    helperText,
    ...props
}) => {
    const dateRef = useRef();
    const timeRef = useRef();
    const [dateTime, setDateTime] = useState(value);
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    // const error = errorFields.includes(id);
    const error = errorFields.some((item) => item.id === id);

    useEffect(() => {
        setDateTime(value);
    }, [value]);

    useEffect(() => {
        fieldCollector(() => ({
            id,
            required,
            value: (onChange && value) ?? dateTime,
            onFocus: () => {
                if (!timeRef.current) timeRef.current.focus();
                else dateRef.current.focus();
            },
        }));
    }, [id, value, dateTime, required, onChange, fieldCollector]);

    useEffect(() => {
        if (required) {
            setError(error);
        }
    }, [required, error, setError]);

    const getDateTime = ({ date, time }) => {
        return {
            year: dayjs(date).get("year"),
            month: dayjs(date).get("month"),
            day: dayjs(date).get("date"),
            hours: dayjs(time).get("hours"),
            minutes: dayjs(time).get("minutes"),
            seconds: dayjs(time).get("seconds"),
            milliseconds: dayjs(time).get("milliseconds"),
        };
    };

    const onDateTimeChange = (newDate, type) => {
        let { year, month, day, hours, minutes, seconds, milliseconds } =
            getDateTime({
                date: type === "date" ? newDate : dateTime,
                time: type === "time" ? newDate : dateTime,
            });

        const newDateTime = new Date(
            year,
            month,
            day,
            hours,
            minutes,
            seconds,
            milliseconds
        );
        setDateTime(newDate ? newDateTime : null);
    };
    return (
        <DateTimePickerControlContextProvider
            value={{
                dateRef,
                timeRef,
                disabled,
                helperText,
                value: (onChange && value) ?? dateTime,
                onChange: onChange ?? onDateTimeChange,
            }}
        >
            <div {...props}>{children}</div>
        </DateTimePickerControlContextProvider>
    );
};

export default DateTimePickerControl;

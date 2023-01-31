import Button from "UIComponents/Button";
import classNames from "classnames";
import React, { useEffect } from "react";
import {
    CircularProgress,
    FormHelperText,
    useFormControl,
} from "@mui/material";
import { FormControl, FormLabel } from "components/GenForm/Input";
import { useFormContext } from "context/FormContext";
import { useFormControlErrorContext } from "context/FormControlErrorContext";

const FileInput = ({
    id,
    label,
    value,
    content,
    className,
    btnClasses,
    handleClick,
    handleFileChange,
    children,
    startIcon,
    loading = false,
    helperText,
    inputRef,
    accept = "image/*",
    ...props
}) => {
    const { required } = useFormControl() ?? {};
    const { setError } = useFormControlErrorContext();
    const { fieldCollector, errorFields } = useFormContext();
    const error = errorFields.includes(id);

    useEffect(() => {
        fieldCollector((getElement) => ({
            id,
            required,
            value: value ?? getElement(id).value,
        }));
    }, [id, fieldCollector, value, required]);

    useEffect(() => {
        if (required) {
            setError(error);
        }
    }, [required, error, setError]);
    return (
        <FormControl
            required={props.required}
            className={classNames(className)}
        >
            {label && <FormLabel required={props.required}>{label}</FormLabel>}
            <div id={`${id}_wrapper`}>
                {children}
                <Button
                    className={classNames(btnClasses, "form_fileInputBtn")}
                    startIcon={loading ? null : startIcon}
                    onClick={handleClick}
                >
                    {loading ? (
                        <CircularProgress
                            style={{
                                width: "14px",
                                height: "14px",
                                color: "#fff",
                            }}
                        />
                    ) : (
                        content
                    )}
                    <input
                        {...props}
                        id={id}
                        hidden
                        accept={accept}
                        type="file"
                        ref={inputRef}
                        name={props.name}
                        onChange={handleFileChange}
                        required={props.required}
                    />
                </Button>
                {helperText && error && (
                    <FormHelperText sx={{ ml: 0, mr: 0 }} error>
                        {helperText}
                    </FormHelperText>
                )}
            </div>
        </FormControl>
    );
};

export default FileInput;

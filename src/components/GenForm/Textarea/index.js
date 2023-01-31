import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import { useFormContext } from "context/FormContext";

const Textarea = ({
    className,
    inputProps = {},
    required,
    id,
    value,
    onChange,
    ...props
}) => {
    const inputRef = useRef([]);
    const handleInputChange = (value, ref) => {
        ref.current = value;
    };

    const { fieldCollector } = useFormContext();

    useEffect(() => {
        fieldCollector((getElement) => ({
            id: id,
            required: true,
            value:
                value ?? (onChange ? inputRef.current : getElement(id).value),
        }));
    }, [id, fieldCollector, onChange, value]);
    return (
        <div>
            <textarea
                type={props.type}
                required={required}
                name={props.name}
                id={id}
                className={classnames(
                    "text_area",
                    { required },
                    props.className
                )}
                placeholder={props.label}
                rows={4}
                cols={5}
                defaultValue={value}
                onChange={
                    onChange
                        ? (_e, value) => handleInputChange(value, inputRef)
                        : null
                }
                autoComplete="off"
            ></textarea>
        </div>
    );
};

export default Textarea;

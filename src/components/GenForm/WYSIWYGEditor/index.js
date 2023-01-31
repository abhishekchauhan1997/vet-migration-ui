import React, { useEffect, useMemo, useRef } from "react";

// * ui elements *
import Editor from "UIComponents/WYSIWYGEditor";

// * global state *
import { useFormContext } from "context/FormContext";

const WYSIWYGEditor = ({
    id,
    defaultValue,
    helperText = "",
    required = true,
    ...props
}) => {
    // refs
    const inputValue = useRef("");

    // global state
    const { fieldCollector, errorFields } = useFormContext();

    const error = useMemo(() => errorFields.includes(id), [errorFields, id]);

    useEffect(() => {
        fieldCollector(() => ({
            id,
            required,
            value: inputValue.current ?? defaultValue,
        }));
    }, [id, fieldCollector, defaultValue, required]);

    const onEditorInputChange = (html) => {
        inputValue.current = html;
    };

    return (
        <Editor
            id={id}
            defaultValue={defaultValue}
            onChange={onEditorInputChange}
            error={required ? error : false}
            helperText={helperText}
            {...props}
        />
    );
};

export default WYSIWYGEditor;

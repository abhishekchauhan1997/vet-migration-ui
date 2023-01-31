import React, { useEffect, useMemo, useState } from "react";

// * data *
import editorData from "./data.json";

// * ui elements *
import WYSIWYGEditor from "UIComponents/WYSIWYGEditor";

const Editor = React.forwardRef(({ name, data, update, defaultValue }, ref) => {
    // local state
    const [initialData, setInitialData] = useState([]);

    const updateCustomValue = useMemo(
        () => (optionObj) => update?.(name, data, optionObj),
        [name, data, update]
    );

    useEffect(() => {
        setInitialData(editorData);

        // to initialize the custom data with defaultValue
        updateCustomValue(defaultValue ?? "");
    }, [updateCustomValue, defaultValue]);

    const onChange = (html) => {
        update?.(name, data, html);
    };

    const { keywords = [] } = initialData ?? {};

    return (
        <WYSIWYGEditor
            ref={ref}
            name={name}
            options={{
                toolbar: [
                    "undo redo",
                    "bold italic",
                    "alignleft aligncenter alignright",
                    "code",
                    "table",
                    "link",
                ],
            }}
            keywords={keywords}
            onChange={onChange}
            defaultValue={defaultValue}
        />
    );
});

export default Editor;

Editor.config = {
    key: "Editor",
    element: "CustomElement",
    canHaveAlernateForm: false,
    type: "custom",
    forwardRef: true,
    static: false,
    field_name: "editor_",
    name: "WYSIWYG Editor",
    icon: "fa fa-pen-ruler",
    label: "Placeholder label",
};

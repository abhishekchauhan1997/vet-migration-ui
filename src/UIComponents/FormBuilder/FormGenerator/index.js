import produce from "immer";
import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { ReactFormGenerator } from "react-form-builder2";

// * utils *
import { extractTextFromHTML } from "utils/appUtils";

const FormGenerator = React.forwardRef(
    (
        {
            formAction,
            formMethod,
            prepopulatedData = [],
            data = [],
            readOnly = false,
            onSubmit = () => {},
            callback,
        },
        ref
    ) => {
        // refs
        const customFormData = useRef({});
        const submitButton = useRef(null);
        const initialData = useRef(null);

        // local state
        const [formData, setFormData] = useState([]);

        const update = useCallback((name, data, value) => {
            customFormData.current[name] = {
                ...(customFormData.current[name] ?? {}),
                name,
                custom_name: name,
                field_type: data.key ?? data.element,
                label: data.label,
                required: data.required,
                value:
                    typeof value !== "object" && !Array.isArray(value)
                        ? value
                        : {
                              ...(customFormData.current[name]
                                  ? customFormData.current[name].value
                                  : {}),
                              ...value,
                          },
            };
        }, []);

        const initialize = useCallback(() => {
            // injecting custom update handler into form data
            const startData = data.map((formItem) => {
                return {
                    ...formItem,
                    props: {
                        ...formItem.props,
                        ...(callback ? { callback } : {}),
                        update,
                    },
                };
            });

            initialData.current = startData;
            setFormData(startData);
        }, [data, update, callback]);

        // TODO:BUG > Not working correctly with Custom Components
        const resetForm = useCallback(() => {
            setFormData(initialData.current);
        }, []);

        useEffect(() => {
            initialize();
        }, [initialize]);

        useImperativeHandle(
            ref,
            () => ({
                // for simulating submit from outside the component
                simulateSubmit: () => {
                    submitButton.current?.click();
                },
                // for resetting the form from outside the component
                resetForm,
                // for injecting props to custom components from outside the component
                injectPropToComponent: ({
                    name,
                    value,
                    componentType = "CheckboxesWithFiles",
                }) => {
                    setFormData((currFormData) => {
                        return currFormData.map((formItem) => {
                            if (formItem.key === componentType) {
                                return {
                                    ...formItem,
                                    props: {
                                        ...formItem.props,
                                        [name]: value,
                                    },
                                };
                            } else {
                                return formItem;
                            }
                        });
                    });
                },
            }),
            [resetForm]
        );

        const getMainFormData = (data) => {
            const formIdDataObj = {};
            const customDataIndices = [];

            data.forEach((dataItem) => {
                formIdDataObj[dataItem.name] = dataItem;
            });

            const mainFormData = formData
                .filter((formDataItem, idx) => {
                    // keep if not custom/static component
                    if (formDataItem.static) {
                        return false;
                    }

                    if (formDataItem.custom) {
                        customDataIndices.push(idx - 1);
                        return false;
                    }

                    return true;
                })
                .filter(
                    (formDataItem) =>
                        // keep if it exists in formIdDataObj
                        !!formIdDataObj[formDataItem.field_name]
                )
                .map((formDataItem) => {
                    return {
                        name: formIdDataObj[formDataItem.field_name].name,
                        field_type: formDataItem.key ?? formDataItem.element,
                        label: extractTextFromHTML(formDataItem.label),
                        required: formDataItem.required,
                        value: formIdDataObj[formDataItem.field_name].value,
                    };
                });

            return [mainFormData, customDataIndices];
        };

        const getCustomFormData = () => {
            const customData = [];

            Object.entries(customFormData.current).forEach((formItem) => {
                customData.push({
                    name: formItem[1].name,
                    custom_name: formItem[1].name,
                    field_type: formItem[1].field_type,
                    label: extractTextFromHTML(formItem[1].label),
                    required: formItem[1].required,
                    value: formItem[1].value,
                });
            });

            return customData;
        };

        const isValueValid = (value) => {
            if (value === undefined || value === null) return false;

            if (typeof value === "string") {
                if (value === "") return false;
            }

            if (typeof value === "number") {
                if (Number.isNaN(value)) return false;
            }

            if (typeof value === "object") {
                if (Object.keys(value).length === 0) return false;
                if (value.length === 0) return false;
            }

            return true;
        };

        const validatedFormErrors = (submitData) => {
            const formErrors = [];

            submitData.forEach((formItem) => {
                if (!isValueValid(formItem.value) && formItem.required) {
                    formErrors.push({
                        label: formItem.label,
                        value: formItem.value,
                    });
                }
            });

            return formErrors.length ? formErrors : null;
        };

        const onFormSubmit = (data) => {
            const [mainFormData, customIndices] = getMainFormData(data);
            const customFormData = getCustomFormData();

            // TODO:
            // validate data - setup done

            // combining main data and custom data
            const submitData = produce(mainFormData, (mainDataCopy) => {
                customIndices.forEach((customIdx, idx) => {
                    mainDataCopy.splice(customIdx, 0, customFormData[idx]);
                });
            });
            const errors = validatedFormErrors(submitData);

            onSubmit(submitData, errors);
        };

        return (
            <div ref={ref} className="form-builder form-generator">
                {data && data.length > 0 ? (
                    <ReactFormGenerator
                        data={formData}
                        answer_data={prepopulatedData}
                        form_action={formAction}
                        formMethod={formMethod}
                        onSubmit={onFormSubmit}
                        read_only={readOnly}
                        hide_actions={false}
                        skip_validations={true}
                        submitButton={
                            <button
                                ref={submitButton}
                                type="submit"
                                style={{ display: "none" }}
                            >
                                SUBMIT
                            </button>
                        }
                    />
                ) : (
                    <p className="text-center">No JSON data provided</p>
                )}
            </div>
        );
    }
);

export default FormGenerator;

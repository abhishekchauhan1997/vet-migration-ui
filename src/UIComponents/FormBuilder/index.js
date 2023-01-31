import React, { useState, useMemo, useRef, useImperativeHandle } from "react";
import { ReactFormBuilder, Registry } from "react-form-builder2";

// form builder required css files
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-form-builder2/dist/app.css";
import "./styles.scss";

// form builder internal components
import CustomFormEditForm from "./FormBuilderEditForm";
import FormBuilderGenerator from "./FormGenerator";
import FormBuilderPreview, { PreviewSwitch } from "./FormBuilderPreview";

// custom toolbar components
import Editor from "./CustomComponents/Editor";
import CheckboxesWithFiles from "./CustomComponents/CheckboxesWithFiles";
import RadioGroupWithFiles from "./CustomComponents/RadioGroupWithFiles";
import SelectWithFiles from "./CustomComponents/SelectWithFiles";
import SimpleInput from "./CustomComponents/SimpleInput";

// * utils *
import { simpleDeepCopy } from "utils/appUtils";

const FormBuilder = React.forwardRef(
    (
        {
            editMode,
            data = [],
            files,
            onLoad,
            saveUrl,
            showCorrectColumn,
            showDescription,
            url,
            showPreviewToggle,
        },
        ref
    ) => {
        // refs
        const formDataRef = useRef(data);

        // local state
        const [formData, setFormData] = useState([]);
        const [showPreview, setShowPreview] = useState(false);

        const toolbarItems = useMemo(
            () => [
                { key: "Header" },
                { key: "Paragraph" },
                { ...SimpleInput.config },
                { key: "NumberInput" },
                { key: "PhoneNumber" },
                { key: "TextArea" },
                { key: "RadioButtons" },
                { key: "Checkboxes" },
                { key: "TwoColumnRow" },
                { key: "ThreeColumnRow" },
                { ...Editor.config },
                { ...CheckboxesWithFiles.config },
                { ...RadioGroupWithFiles.config },
                { ...SelectWithFiles.config },
            ],
            []
        );

        const onPost = (formData) => {
            formDataRef.current = formData.task_data;
        };

        // fix for crashing error due to children in Row
        // components getting removed
        const checkStrayChildItems = (data) => {
            const formData = simpleDeepCopy(data);

            formData.forEach((formDataItem) => {
                if (formDataItem.childItems?.length) {
                    formDataItem.childItems = formDataItem.childItems.filter(
                        (childId) => {
                            return formData.find(
                                (formItem) => formItem.id === childId
                            );
                        }
                    );
                }
            });

            return formData;
        };

        useImperativeHandle(
            ref,
            () => ({
                getFormBuilderData: () => {
                    return checkStrayChildItems(formDataRef.current);
                },
            }),
            []
        );

        const togglePreview = () => {
            setFormData(formDataRef.current);
            setShowPreview((currState) => !currState);
        };

        return (
            <div>
                {showPreviewToggle && (
                    <PreviewSwitch
                        showPreview={showPreview}
                        togglePreview={togglePreview}
                    />
                )}

                {showPreview && <FormBuilderPreview formData={formData} />}

                <div
                    className="form-builder"
                    style={{ display: showPreview ? "none" : "block" }}
                >
                    <ReactFormBuilder
                        ref={ref}
                        data={data}
                        editMode={editMode}
                        files={files}
                        onLoad={onLoad}
                        onPost={onPost}
                        renderEditForm={(props) => (
                            <CustomFormEditForm {...props} />
                        )}
                        saveAlways={true}
                        saveUrl={saveUrl}
                        showCorrectColumn={showCorrectColumn}
                        show_description={showDescription}
                        toolbarItems={toolbarItems}
                        url={url}
                    />
                </div>
            </div>
        );
    }
);

// register custom components
Registry.register("Editor", Editor);
Registry.register("CheckboxesWithFiles", CheckboxesWithFiles);
Registry.register("RadioGroupWithFiles", RadioGroupWithFiles);
Registry.register("SelectWithFiles", SelectWithFiles);
Registry.register("SimpleInput", SimpleInput);

export const FormGenerator = FormBuilderGenerator;

export default FormBuilder;

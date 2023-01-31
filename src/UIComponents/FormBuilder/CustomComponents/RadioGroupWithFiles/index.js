import React, { useEffect, useMemo, useRef, useState } from "react";
import produce from "immer";

// * ui elements *
import { Grid, Radio, FormControlLabel } from "@mui/material";
import Input from "UIComponents/Input";
import AdditionalOptions from "../common/AdditionalOptions";
import EditorModal from "../common/EditorModal";
import AttachmentModal from "../common/AttachmentModal";

// * utils *
import { extractTextFromHTML } from "utils/appUtils";

const mapOptions = (option) => {
    return {
        id: option.key,
        label: option.text,
        value: option.value,
        opted: false,
        reportcard: "",
        attachments_filename: [],
        attachments_url: [],
    };
};

const RadioGroupWithFiles = React.forwardRef(
    ({ name, data, update, canHaveComments }, ref) => {
        // refs
        const firstLoad = useRef(false);

        // local state
        const [options, setOptions] = useState(() =>
            data.options.map(mapOptions)
        );
        const [currentOption, setCurrentOption] = useState(null);
        const [currentAttachment, setCurrentAttachment] = useState(null);
        const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
        const [isAttachmentModalOpen, setIsAttachmentModalOpen] =
            useState(false);

        const updateCustomValue = useMemo(
            () => (optionObj) => update?.(name, data, optionObj),
            [name, data, update]
        );

        useEffect(() => {
            if (!firstLoad.current) {
                updateCustomValue({
                    options,
                    answer_type: "unattended",
                    answer_comment: "",
                    reportcard: "",
                    attachments_filename: [],
                    attachments_url: [],
                });

                firstLoad.current = true;
            }
        }, [updateCustomValue, options]);

        const handleRadioChange = (id) => {
            const updatedOptions = produce(options, (optionsCopy) => {
                optionsCopy.forEach((option) => (option.opted = false));

                const changedIndex = optionsCopy.findIndex(
                    (option) => option.id === id
                );

                if (changedIndex !== -1) {
                    optionsCopy[changedIndex].opted = true;
                }
            });

            setOptions(updatedOptions);

            updateCustomValue({
                options: updatedOptions,
                answer_type: "abnormal",
            });
        };

        const onReport = (option) => {
            // for dynamic options
            setCurrentOption(option);
            toggleEditorModal();
        };

        const onAddAttachment = (option, file) => {
            // for dynamic options
            const updatedOptions = produce(options, (optionsCopy) => {
                const optionIdx = optionsCopy.findIndex(
                    (opt) => opt.id === option.id
                );

                if (optionIdx !== -1) {
                    const currentOption = optionsCopy[optionIdx];

                    currentOption.attachments_filename = [
                        ...currentOption.attachments_filename,
                        file.name,
                    ];
                }
            });

            setOptions(updatedOptions);
            updateCustomValue({ options: updatedOptions });
        };

        const onAttachmentSelect = (option, attachment) => {
            setCurrentAttachment(attachment);

            // for dynamic options
            setCurrentOption(option);
            toggleAttachmentModal();
        };

        const onDeleteAttachment = () => {
            // for dynamic options
            const updatedOptions = produce(options, (optionsCopy) => {
                const optionIdx = optionsCopy.findIndex(
                    (opt) => opt.id === currentOption.id
                );

                if (optionIdx !== -1) {
                    const currentOption = optionsCopy[optionIdx];
                    const attachmentIdx =
                        currentOption.attachments_filename.findIndex(
                            (attachment) => attachment === currentAttachment
                        );

                    if (attachmentIdx !== -1) {
                        currentOption.attachments_filename.splice(
                            attachmentIdx,
                            1
                        );
                    }
                }
            });

            setOptions(updatedOptions);
            updateCustomValue({ options: updatedOptions });

            toggleAttachmentModal();
        };

        const onEditorSave = (val) => {
            // for dynamic options
            const updatedOptions = produce(options, (optionsCopy) => {
                const currentIdx = optionsCopy.findIndex(
                    (option) => option.id === currentOption.id
                );

                if (currentIdx !== -1) {
                    optionsCopy[currentIdx].reportcard = val;
                }
            });

            setOptions(updatedOptions);
            updateCustomValue({ options: updatedOptions });

            toggleEditorModal();
        };

        const onAnswerCommentChange = (ev) => {
            updateCustomValue({ answer_comment: ev.target.value });
        };

        const toggleEditorModal = () => {
            setIsEditorModalOpen((currOpenState) => !currOpenState);
        };

        const toggleAttachmentModal = () => {
            setIsAttachmentModalOpen((currOpenState) => !currOpenState);
            if (isAttachmentModalOpen) setCurrentAttachment(null);
        };

        return (
            <Grid container spacing={1}>
                <Grid container item>
                    <Grid item container>
                        {options?.map((option) => {
                            return (
                                <Grid
                                    display="flex"
                                    alignItems="center"
                                    key={option.id}
                                    item
                                    xs={6}
                                    md={3}
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={
                                            <Radio
                                                checked={option.opted}
                                                onChange={(ev) =>
                                                    handleRadioChange(
                                                        option.id,
                                                        ev.target.value
                                                    )
                                                }
                                                value={option.value}
                                            />
                                        }
                                        label={option.label}
                                    />

                                    {option.opted && (
                                        <AdditionalOptions
                                            option={option}
                                            attachments={
                                                option?.attachments_filename
                                            }
                                            onReport={onReport}
                                            onAddAttachment={onAddAttachment}
                                            onAttachmentSelect={
                                                onAttachmentSelect
                                            }
                                        />
                                    )}
                                </Grid>
                            );
                        })}
                    </Grid>
                    {canHaveComments && (
                        <Grid item xs={12} md={6}>
                            <Input
                                id="additionalOptInputF"
                                onChange={onAnswerCommentChange}
                                placeholder={"Comments"}
                                multiline
                                minRows={3}
                                maxRows={6}
                            />
                        </Grid>
                    )}
                </Grid>

                {/* EDITOR MODAL */}
                <EditorModal
                    open={isEditorModalOpen}
                    onClose={toggleEditorModal}
                    handleSave={onEditorSave}
                    defaultValue={currentOption?.reportcard}
                    label={
                        currentOption
                            ? currentOption.label
                            : extractTextFromHTML(data.label)
                    }
                />

                {/* ATTACHMENT MODAL */}
                <AttachmentModal
                    open={isAttachmentModalOpen}
                    onClose={toggleAttachmentModal}
                    label={currentAttachment}
                    optionLabel={
                        currentOption
                            ? currentOption.label
                            : extractTextFromHTML(data.label)
                    }
                    onDeleteAttachment={onDeleteAttachment}
                />
            </Grid>
        );
    }
);

export default RadioGroupWithFiles;

RadioGroupWithFiles.config = {
    key: "RadioGroupWithFiles",
    element: "CustomElement",
    canPopulateFromApi: false,
    canHaveAlternateForm: false,
    canHaveOptionValue: true,
    canHaveOptionCorrect: false,
    canHavePageBreakBefore: false,
    type: "custom",
    forwardRef: true,
    static: false,
    field_name: "radiogroup_with_files_",
    name: "Radio Group with Files",
    options: [
        {
            key: "abc1",
            text: "Placeholder 1",
            value: "1",
        },
    ],
    icon: "fa fa-circle-dot",
    label: "<b>1. Placeholder label</b>",
    props: { canHaveComments: true },
};

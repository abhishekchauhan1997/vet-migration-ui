import React, { useEffect, useState, useMemo, useRef } from "react";
import produce from "immer";

// * ui elements *
import { Grid } from "@mui/material";
import Autocomplete from "UIComponents/Autocomplete";
import Input from "UIComponents/Input";
import AdditionalOptions from "../common/AdditionalOptions";
import EditorModal from "../common/EditorModal";
import AttachmentModal from "../common/AttachmentModal";

// * utils *
import { extractTextFromHTML } from "utils/appUtils";

const mapOptions = (option, mapCorrect) => {
    return {
        id: option.key,
        label: option.text,
        opted: false,
        reportcard: "",
        attachments_filename: [],
        attachments_url: [],
        ...(mapCorrect && option.correct !== undefined
            ? { correct: option.correct }
            : {}),
    };
};

const SelectWithFiles = React.forwardRef(
    ({ name, data, update, canHaveComments }, ref) => {
        // refs
        const firstLoad = useRef(false);

        const getDefaultOption = () => {
            const defaultOption = data.options
                .map((option) => mapOptions(option, true))
                .find((option) => option.correct);

            if (!defaultOption) return null;

            // deleting correct property to match original
            defaultOption.opted = true;
            delete defaultOption.correct;

            return defaultOption;
        };

        const getOptions = () => {
            const defaultOption = getDefaultOption();
            const mappedOptions = data.options.map(mapOptions);

            if (!defaultOption) return mappedOptions;

            const defaultIdx = mappedOptions.findIndex(
                (option) => option.id === defaultOption.id
            );
            mappedOptions[defaultIdx].opted = true;

            return mappedOptions;
        };

        // local state
        const [options, setOptions] = useState(getOptions);
        const [currentOption, setCurrentOption] = useState(getDefaultOption);
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
                    answer_comment: "",
                    reportcard: "",
                    attachments_filename: [],
                    attachments_url: [],
                });

                firstLoad.current = true;
            }
        }, [updateCustomValue, options]);

        const onSelectChange = (option) => {
            if (!option) setCurrentOption(null);

            const selectedOption = options.find((opt) => opt.id === option.id);
            if (selectedOption) setCurrentOption(selectedOption);

            const updatedOptions = produce(options, (optionsCopy) => {
                optionsCopy.forEach((option) => (option.opted = false));

                const changedIndex = optionsCopy.findIndex(
                    (opt) => opt.id === option.id
                );

                if (changedIndex !== -1) {
                    optionsCopy[changedIndex].opted = true;
                }
            });

            setOptions(updatedOptions);
            updateCustomValue({ options: updatedOptions });
        };

        const onReport = (option) => {
            const selectedOption = options.find((opt) => opt.id === option.id);
            if (selectedOption) setCurrentOption(selectedOption);

            toggleEditorModal();
        };

        const onEditorSave = (val) => {
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

        const onAddAttachment = (option, file) => {
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
                    setCurrentOption((currOption) => ({
                        ...currOption,
                        attachments_filename: [
                            ...currOption.attachments_filename,
                            file.name,
                        ],
                    }));
                }
            });

            setOptions(updatedOptions);
            updateCustomValue({ options: updatedOptions });
        };

        const onAttachmentSelect = (option, attachment) => {
            setCurrentAttachment(attachment);

            const selectedOption = options.find((opt) => opt.id === option.id);
            if (selectedOption) setCurrentOption(selectedOption);

            toggleAttachmentModal();
        };

        const onDeleteAttachment = () => {
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
                        setCurrentOption((currOption) => ({
                            ...currOption,
                            attachments_filename:
                                currOption.attachments_filename.filter(
                                    (_, idx) => idx !== attachmentIdx
                                ),
                        }));
                    }
                }
            });

            setOptions(updatedOptions);
            updateCustomValue({ options: updatedOptions });

            toggleAttachmentModal();
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
            <Grid container spacing={2}>
                <Grid item xs={10} md={10}>
                    <Autocomplete
                        // multiple
                        options={data.options.map(mapOptions) ?? []}
                        value={currentOption}
                        handleChange={(_, val) => onSelectChange(val)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                    />
                </Grid>
                <Grid
                    item
                    xs={2}
                    md={2}
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <AdditionalOptions
                        option={currentOption}
                        attachments={currentOption?.attachments_filename}
                        onReport={onReport}
                        onAddAttachment={onAddAttachment}
                        onAttachmentSelect={onAttachmentSelect}
                    />
                </Grid>

                {canHaveComments && (
                    <Grid item xs={12} md={6}>
                        <Input
                            onChange={onAnswerCommentChange}
                            placeholder={"Comments"}
                            multiline
                            minRows={3}
                            maxRows={6}
                            id="additionalOptInputD"
                        />
                    </Grid>
                )}

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

export default SelectWithFiles;

SelectWithFiles.config = {
    key: "SelectWithFiles",
    element: "CustomElement",
    canPopulateFromApi: false,
    canHaveAlternateForm: false,
    canHaveOptionValue: true,
    canHaveOptionCorrect: true,
    canHavePageBreakBefore: false,
    type: "custom",
    forwardRef: true,
    static: false,
    field_name: "select_with_files_",
    name: "Select with Files",
    options: [
        {
            key: "abc1",
            text: "Placeholder 1",
            value: "1",
        },
    ],
    icon: "fa-solid fa-circle-chevron-down",
    label: "<b>1. Placeholder label</b>",
    props: { canHaveComments: true },
};

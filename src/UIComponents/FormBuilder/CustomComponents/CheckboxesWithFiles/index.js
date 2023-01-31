import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import produce from "immer";

// * ui elements *
import { Grid } from "@mui/material";
import Input from "UIComponents/Input";
import { Checkbox } from "UIComponents/Checkbox";
import AdditionalOptions from "../common/AdditionalOptions";
import EditorModal from "../common/EditorModal";
import AttachmentModal from "../common/AttachmentModal";

// * utils *
import { extractTextFromHTML } from "utils/appUtils";

const mapOptions = (option) => {
    return {
        id: option.key,
        label: option.text,
        opted: false,
        reportcard: "",
        attachments_filename: [],
        attachments_url: [],
    };
};

const CheckboxesWithFiles = React.forwardRef(
    (
        { name, data, update, callback, markAllAsNormal, canHaveComments },
        ref
    ) => {
        // refs
        const firstLoad = useRef(false);

        // local state
        const [normal, setNormal] = useState({
            isNormal: false,
            attachments: [],
            reportCard: "",
        });
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

        const setToNormal = useCallback(() => {
            setOptions((currOptions) => {
                const updatedOptions = produce(currOptions, (optionsCopy) => {
                    optionsCopy.forEach((option) => (option.opted = false));
                });

                updateCustomValue({
                    options: updatedOptions,
                    answer_type: "normal",
                });

                return updatedOptions;
            });

            setNormal((currNormal) => ({ ...currNormal, isNormal: true }));
        }, [updateCustomValue]);

        useEffect(() => {
            if (markAllAsNormal) {
                setToNormal();
            } else {
                setNormal((currNormal) => ({
                    ...currNormal,
                    isNormal: false,
                }));
            }
        }, [markAllAsNormal, setToNormal]);

        const onNormalCheckboxChange = (checked) => {
            setNormal((currNormal) => ({ ...currNormal, isNormal: checked }));

            if (checked) {
                setToNormal();
            } else {
                updateCustomValue({
                    answer_type: checked ? "normal" : "abnormal",
                });
            }
        };

        const onCheckboxChange = (id, checked) => {
            const updatedOptions = produce(options, (optionsCopy) => {
                const changedIndex = optionsCopy.findIndex(
                    (option) => option.id === id
                );

                if (changedIndex !== -1) {
                    optionsCopy[changedIndex].opted = checked;
                }
            });

            setOptions(updatedOptions);

            if (checked) {
                setNormal((currNormal) => ({ ...currNormal, isNormal: false }));
            }

            callback?.("REMOVE_MARK_AS_NORMAL", {});

            updateCustomValue({
                options: updatedOptions,
                answer_type: "abnormal",
            });
        };

        const onReport = (option) => {
            // for normal
            if (!option) {
                setCurrentOption(null);
                toggleEditorModal();

                return;
            }

            // for dynamic options
            setCurrentOption(option);
            toggleEditorModal();
        };

        const onAddAttachment = (option, file) => {
            // for normal
            if (!option) {
                const updatedNormal = produce(normal, (normalCopy) => {
                    normalCopy.attachments.push(file.name);
                });

                setNormal(updatedNormal);
                updateCustomValue({
                    attachments_filename: updatedNormal.attachments,
                });

                return;
            }

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

            // for normal
            if (!option) {
                toggleAttachmentModal();
                setCurrentOption(null);

                return;
            }

            // for dynamic options
            setCurrentOption(option);
            toggleAttachmentModal();
        };

        const onDeleteAttachment = () => {
            // for normal
            if (!currentOption) {
                const updatedNormal = produce(normal, (normalCopy) => {
                    const attachmentIdx = normalCopy.attachments.findIndex(
                        (attachment) => attachment === currentAttachment
                    );

                    if (attachmentIdx !== -1) {
                        normalCopy.attachments.splice(attachmentIdx, 1);
                    }
                });

                setNormal(updatedNormal);
                updateCustomValue({
                    attachments_filename: updatedNormal.attachments,
                });

                toggleAttachmentModal();

                return;
            }

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
            // for normal
            if (!currentOption) {
                setNormal((currNormal) => ({ ...currNormal, reportCard: val }));
                updateCustomValue({ reportcard: val });
                toggleEditorModal();

                return;
            }

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
                        <Grid display="flex" item xs={12}>
                            <Checkbox
                                label={"Normal"}
                                checked={normal.isNormal}
                                onChange={(ev) =>
                                    onNormalCheckboxChange(ev.target.checked)
                                }
                            />
                            <AdditionalOptions
                                attachments={normal.attachments}
                                onReport={onReport}
                                onAddAttachment={onAddAttachment}
                                onAttachmentSelect={onAttachmentSelect}
                            />
                        </Grid>
                        {options?.map((option) => {
                            return (
                                <Grid
                                    display="flex"
                                    key={option.id}
                                    item
                                    xs={6}
                                    md={3}
                                >
                                    <Checkbox
                                        label={option.label}
                                        checked={option.opted}
                                        onChange={(ev) =>
                                            onCheckboxChange(
                                                option.id,
                                                ev.target.checked
                                            )
                                        }
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
                                onChange={onAnswerCommentChange}
                                placeholder={"Comments"}
                                multiline
                                minRows={3}
                                maxRows={6}
                                id="canHaveCommentId"
                            />
                        </Grid>
                    )}
                </Grid>

                {/* EDITOR MODAL */}
                <EditorModal
                    open={isEditorModalOpen}
                    onClose={toggleEditorModal}
                    handleSave={onEditorSave}
                    defaultValue={
                        currentOption
                            ? currentOption.reportcard
                            : normal.reportCard
                    }
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

export default CheckboxesWithFiles;

CheckboxesWithFiles.config = {
    key: "CheckboxesWithFiles",
    element: "CustomElement",
    canPopulateFromApi: false,
    canHaveAlternateForm: false,
    canHaveOptionValue: false,
    canHaveOptionCorrect: false,
    canHavePageBreakBefore: false,
    type: "custom",
    forwardRef: true,
    static: false,
    field_name: "checkboxes_with_files_",
    name: "Checkboxes with Files",
    options: [
        {
            key: "abc1",
            text: "Placeholder 1",
            value: "1",
        },
    ],
    icon: "fa fa-check-to-slot",
    label: "<b>1. Placeholder label</b>",
    props: { canHaveComments: true },
};

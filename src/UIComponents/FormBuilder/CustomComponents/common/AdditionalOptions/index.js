import React, { useRef } from "react";

// * ui elements *
import { Stack, Tooltip } from "@mui/material";
import IconButton from "UIComponents/IconButton";
import Icon from "components/IconComponent";

const AdditionalOptions = ({
    option = null,
    attachments = [],
    onReport = () => {},
    onAddAttachment = () => {},
    onAttachmentSelect = () => {},
}) => {
    // refs
    const filePicker = useRef(null);

    return (
        <Stack direction="row">
            <Tooltip arrow title={"Report"}>
                <IconButton
                    sx={{ marginBottom: 1.5 }}
                    onClick={() => onReport(option)}
                >
                    <Icon type={"whiteboard"} />
                </IconButton>
            </Tooltip>
            <Tooltip arrow title={"Add Attachment"}>
                <IconButton
                    sx={{ marginBottom: 1.5 }}
                    onClick={() => filePicker.current?.click()}
                >
                    <Icon type={"file-circle-plus"} />
                </IconButton>
            </Tooltip>

            {attachments.map((attachment) => {
                return (
                    <Tooltip key={attachment} arrow title={attachment}>
                        <IconButton
                            onClick={() =>
                                onAttachmentSelect(option, attachment)
                            }
                            sx={{ marginBottom: 1.5, color: "green" }}
                        >
                            <Icon type={"paper-clip"} />
                        </IconButton>
                    </Tooltip>
                );
            })}

            <input
                id="additionalOptInput"
                ref={filePicker}
                type={"file"}
                style={{ display: "none" }}
                onChange={(ev) => onAddAttachment(option, ev.target.files[0])}
            />
        </Stack>
    );
};

export default AdditionalOptions;

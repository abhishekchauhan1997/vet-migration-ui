import React from "react";

// * ui elements *
import Button from "UIComponents/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "UIComponents/Dialog";

const AttachmentModal = ({
    open,
    label = "",
    optionLabel = "",
    onClose = () => {},
    onDeleteAttachment = () => {},
}) => {
    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="md"
            scroll={"paper"}
            PaperProps={{ sx: { padding: 0 } }}
        >
            <div className="flex aiC formHeader">
                <Dialog.DialogTitle sx={{ padding: "10px 20px" }}>
                    {label}
                </Dialog.DialogTitle>

                <Dialog.DialogActions
                    sx={{ padding: 0 }}
                    className="formButtons-container flex flexG justifyE"
                >
                    <Button onClick={onClose} defaultColor variant="icon">
                        {<CloseIcon />}
                    </Button>
                </Dialog.DialogActions>
            </div>
            <Dialog.DialogContent
                sx={{
                    padding: "10px",
                    marginInline: "10px",
                    scrollBehavior: "smooth",
                    textAlign: "center",
                }}
                dividers
            >
                File operation for {optionLabel}
            </Dialog.DialogContent>
            <Dialog.DialogActions sx={{ padding: "10px 20px" }}>
                <Button variant="outlined" onClick={onDeleteAttachment}>
                    Delete File
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </Dialog.DialogActions>
        </Dialog>
    );
};

export default AttachmentModal;

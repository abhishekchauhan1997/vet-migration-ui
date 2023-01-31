import React, { useRef } from "react";

// * ui elements *
import Button from "UIComponents/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "UIComponents/Dialog";
import WYSIWYGEditor from "UIComponents/WYSIWYGEditor";

const EditorModal = ({
    open,
    label = "",
    defaultValue,
    onClose = () => {},
    handleSave = () => {},
}) => {
    // refs
    const htmlState = useRef("");

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
                    Report Card for {label}
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
                }}
                dividers
            >
                <WYSIWYGEditor
                    defaultValue={defaultValue}
                    options={{ height: 250, dialogsInBody: true }}
                    onChange={(html) => (htmlState.current = html)}
                />
            </Dialog.DialogContent>
            <Dialog.DialogActions sx={{ padding: "10px 20px" }}>
                <Button onClick={() => handleSave(htmlState.current)}>
                    Save
                </Button>
            </Dialog.DialogActions>
        </Dialog>
    );
};

export default EditorModal;

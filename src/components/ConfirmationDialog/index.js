import { IconButton } from "@mui/material";
import React from "react";
import Button from "UIComponents/Button";
import Dialog from "UIComponents/Dialog";
import Icon from "../IconComponent";

const ConfirmationDialog = ({
    id,
    children,
    title = "Confirm bulk action",
    content = "This action will affect all items in Inbox. Are you sure you want to continue?",
    open = Boolean,
    closeIcon = true,
    dividers = true,
    CancelBtnLabel = "Cancel",
    ConfirmBtnLabel = "OK",
    handleClose = () => {},
    handleSubmit = () => {},
}) => {
    return (
        <Dialog
            fullWidth={true}
            open={open}
            id={`dialog-${id}`}
            onClose={handleClose}
            aria-labelledby={`aria-dialog-${id}`}
            aria-describedby={`aria-dialog-${id}-describedby`}
        >
            <Dialog.DialogTitle>
                {title}
                {closeIcon ? (
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "#3b4468",
                            fontWeight: 500,
                        }}
                    >
                        <Icon type="delete" className="dialog_icon" />
                    </IconButton>
                ) : null}
            </Dialog.DialogTitle>
            <Dialog.DialogContent dividers={dividers}>
                {content.length !== 0 && (
                    <Dialog.DialogContentText>
                        {content}
                    </Dialog.DialogContentText>
                )}
                {children}
            </Dialog.DialogContent>
            <Dialog.DialogActions>
                <Button variant="text" onClick={handleClose}>
                    {CancelBtnLabel}
                </Button>

                <Button onClick={handleSubmit} autoFocus>
                    {ConfirmBtnLabel}
                </Button>
            </Dialog.DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;

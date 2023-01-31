import { IconButton } from "@mui/material";
import React from "react";
import Button from "UIComponents/Button";
import Dialog from "UIComponents/Dialog";
import Icon from "../IconComponent";

const DialogForm = ({
    id,
    children,
    title = "",
    content = "",
    open = Boolean,
    closeIcon = Boolean,
    dividers = Boolean,
    disabled = Boolean,
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
            <form id={id} onSubmit={handleSubmit}>
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
                        Cancel
                    </Button>
                    <Button type="submit" form={id} autoFocus>
                        Save
                    </Button>
                </Dialog.DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogForm;

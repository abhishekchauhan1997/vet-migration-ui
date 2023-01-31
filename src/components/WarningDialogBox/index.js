import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Button from "UIComponents/Button";
import Dialog from "UIComponents/Dialog";
import Icon from "../IconComponent";

const WarningDialog = ({
    id,
    children,
    title = "",
    content = "",
    open = false,
    dividers = false,
    loading = false,
    CancelBtnLabel,
    ConfirmBtnLabel,
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
            sx={{ textAlign: "center" }}
            PaperProps={{
                sx: { maxWidth: "470px" },
            }}
        >
            <Box
                aria-label="warning"
                sx={{
                    marginTop: "40px",
                    color: "rgb(245, 124, 0)",
                    fontWeight: 500,
                }}
            >
                <Icon
                    type="warning"
                    style={{
                        color: "rgb(245, 124, 0)",
                        width: "80px",
                        height: "80px",
                    }}
                />
            </Box>
            <Dialog.DialogTitle>{title}</Dialog.DialogTitle>
            <Dialog.DialogContent dividers={dividers}>
                {content.length !== 0 && (
                    <Dialog.DialogContentText>
                        {content}
                    </Dialog.DialogContentText>
                )}
                {children}
            </Dialog.DialogContent>
            <Dialog.DialogActions sx={{ justifyContent: "center" }}>
                <Button
                    variant="text"
                    onClick={handleClose}
                    style={{
                        color: "#fff",
                        background: "#F44336",
                    }}
                >
                    {CancelBtnLabel}
                </Button>
                <Button
                    onClick={handleSubmit}
                    style={{
                        color: "#fff",
                        background: "#43A047",
                    }}
                    autoFocus
                >
                    {loading ? (
                        <CircularProgress
                            style={{
                                width: "14px",
                                height: "14px",
                                color: "#fff",
                            }}
                        />
                    ) : (
                        ConfirmBtnLabel
                    )}
                </Button>
            </Dialog.DialogActions>
        </Dialog>
    );
};

export default WarningDialog;

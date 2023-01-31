import { AppContext } from "context/AppContext";
import React, { useContext } from "react";
import Snackbar from "UIComponents/Snackbar";
import Slide from "@mui/material/Slide";

const AppSnackbar = () => {
    const { alert, setAlert } = useContext(AppContext);
    const handleClose = () => {
        setAlert({ ...alert, open: false });
    };
    return (
        <Snackbar
            open={alert.open}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            handleClose={handleClose}
            TransitionComponent={Slide}
            message={alert.message}
            severity={alert.severity}
        />
    );
};

export default AppSnackbar;

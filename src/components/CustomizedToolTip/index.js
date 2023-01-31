import * as React from "react";
import { styled } from "@mui/material/styles";
import { Tooltip as MuiTooltip } from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";

export const LightTooltip = styled(({ className, ...props }) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

export const BootstrapTooltip = styled(({ className, ...props }) => (
    <MuiTooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

export const HtmlTooltip = styled(({ className, ...props }) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#fff",
        color: "#3b4468",
        width: 250,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #6e8dfb",
        padding: 0,
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: "#6e8dfb",
    },
}));

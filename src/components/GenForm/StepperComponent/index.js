import * as React from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Box, StepButton, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#784af4",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#784af4",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
        color: "#784af4",
        zIndex: 1,
        fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            boxShadow:
                "0px 3px 1px -2px rgb(32 75 226 / 20%), 0px 2px 2px 0px rgb(32 75 226 / 14%), 0px 1px 5px 0px rgb(32 75 226 / 12%)",
            background: "linear-gradient(85.97deg, #6e8dfb 0%, #52a3ff 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            boxShadow:
                "0px 3px 1px -2px rgb(32 75 226 / 20%), 0px 2px 2px 0px rgb(32 75 226 / 14%), 0px 1px 5px 0px rgb(32 75 226 / 12%)",
            background: "linear-gradient(85.97deg, #6e8dfb 0%, #52a3ff 100%)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        boxShadow:
            "0px 3px 1px -2px rgb(32 75 226 / 20%), 0px 2px 2px 0px rgb(32 75 226 / 14%), 0px 1px 5px 0px rgb(32 75 226 / 12%)",
        background: "linear-gradient(85.97deg, #6e8dfb 0%, #52a3ff 100%)",
        "&:hover": {
            boxShadow:
                "0px 2px 4px -1px rgb(32 75 226 / 30%), 0px 4px 5px 0px rgb(32 75 226 / 14%), 0px 1px 10px 0px rgb(32 75 226 / 12%)",
        },
    }),
    ...(ownerState.completed && {
        boxShadow:
            "0px 3px 1px -2px rgb(32 75 226 / 20%), 0px 2px 2px 0px rgb(32 75 226 / 14%), 0px 1px 5px 0px rgb(32 75 226 / 12%)",
        background: "linear-gradient(85.97deg, #fff 0%, #fff 100%)",
        "&:hover": {
            boxShadow:
                "0px 2px 4px -1px rgb(32 75 226 / 30%), 0px 4px 5px 0px rgb(32 75 226 / 14%), 0px 1px 10px 0px rgb(32 75 226 / 12%)",
        },
    }),
    ...(ownerState.error && {
        boxShadow:
            "0px 3px 1px -2px rgb(32 75 226 / 20%), 0px 2px 2px 0px rgb(32 75 226 / 14%), 0px 1px 5px 0px rgb(32 75 226 / 12%)",
        background: "linear-gradient(85.97deg, #fff 0%, #fff 100%)",
        "&:hover": {
            boxShadow:
                "0px 2px 4px -1px rgb(32 75 226 / 30%), 0px 4px 5px 0px rgb(32 75 226 / 14%), 0px 1px 10px 0px rgb(32 75 226 / 12%)",
        },
    }),
}));

function ColorlibStepIcon(props) {
    const {
        active,
        completed,
        error,
        className,
        index,
        icons,
        isStepCompleted,
    } = props;
    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active, error }}
            className={className}
        >
            {error ? (
                <ErrorIcon color="error" />
            ) : completed && !isStepCompleted ? (
                <Check color="success" />
            ) : (
                icons[String(index + 1)]
            )}
        </ColorlibStepIconRoot>
    );
}

function ColorlibConnectorSteppers(props) {
    const {
        steps,
        className,
        icons,
        activeStep,
        orientation,
        handleStepButton,
    } = props;

    console.log("Steps are", steps);
    const isStepFailed = (step) => {
        return step === activeStep;
    };
    const isStepCompleted = (step) => {
        return step === activeStep;
    };
    return (
        <Box sx={{ width: "100%" }}>
            <Stepper
                alternativeLabel
                orientation={orientation}
                activeStep={activeStep}
                connector={<ColorlibConnector />}
            >
                {steps.map((step, index) => (
                    <Step
                        key={step?.label}
                        active={activeStep === index}
                        completed={!(activeStep === index) && step?.completed}
                        disabled={activeStep === index || !step?.completed}
                    >
                        <StepButton onClick={() => handleStepButton(index)}>
                            <StepLabel
                                error={step?.error ?? false}
                                StepIconComponent={ColorlibStepIcon}
                                StepIconProps={{
                                    icons,
                                    index,
                                    className,
                                    isStepCompleted: isStepCompleted(index),
                                }}
                            >
                                {step?.label}
                                {isStepFailed(index) && step?.error ? (
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="error"
                                        >
                                            {step?.helperText ?? "sssss"}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </StepLabel>
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

function QontoConnectorSteppers(props) {
    const { steps, active, completed, className } = props;

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper
                alternativeLabel
                activeStep={1}
                connector={<QontoConnector />}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            StepIconComponent={QontoStepIcon}
                            StepIconProps={{
                                active,
                                completed,

                                className,
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export { ColorlibConnectorSteppers, QontoConnectorSteppers };

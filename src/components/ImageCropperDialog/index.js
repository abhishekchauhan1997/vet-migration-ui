import {
    CircularProgress,
    IconButton,
    MenuItem,
    Select as MuiSelect,
    Slider,
} from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Button from "UIComponents/Button";
import Dialog from "UIComponents/Dialog";
import Icon from "../IconComponent";
import getCroppedImg from "./utils/imageCrop";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
    components: {
        MuiSelect: {
            styleOverrides: {
                select: {
                    "&.MuiSelect-select	": {
                        paddingBottom: "2px !important",
                        paddingTop: "2px !important",
                    },
                },
            },
        },
    },
});

const aspectRatios = [
    { value: 4 / 3, text: "4/3" },
    { value: 16 / 9, text: "16/9" },
    { value: 1 / 2, text: "1/2" },
];

const ImageCropperDailog = ({
    id,
    title = "",
    content = "",
    open = Boolean,
    closeIcon = Boolean,
    dividers = Boolean,
    inputImg,
    zoomInit,
    cropInit,
    aspectInit,
    onCancel,
    setCroppedImageFor,
    resetImage,
}) => {
    if (zoomInit == null) {
        zoomInit = 1;
    }
    if (cropInit == null) {
        cropInit = { x: 0, y: 0 };
    }
    if (aspectInit == null) {
        aspectInit = aspectRatios[0];
    }
    const [crop, setCrop] = useState(cropInit);
    const [zoom, setZoom] = useState(zoomInit);
    const [aspect, setAspect] = useState(aspectInit);
    const [loading, setLoading] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onAspectChange = (e) => {
        const value = e.target.value;
        const ratio = aspectRatios.find((ratio) => ratio.value === value);
        setAspect(ratio);
    };

    const onCropComplete = (_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    const onCrop = async () => {
        setLoading(true);
        const croppedImageUrl = await getCroppedImg(
            inputImg,
            croppedAreaPixels
        );
        if (croppedImageUrl) {
            setCroppedImageFor(crop, zoom, aspect, croppedImageUrl);
            setLoading(false);
        }
    };

    const onResetImage = () => {
        resetImage(inputImg);
    };

    return (
        <Dialog
            fullWidth={true}
            open={open}
            id={`dialog-${id}`}
            onClose={onCancel}
            aria-labelledby={`aria-dialog-${id}`}
            aria-describedby={`aria-dialog-${id}-describedby`}
        >
            <Dialog.DialogTitle>
                {title}
                {closeIcon ? (
                    <IconButton
                        aria-label="close"
                        onClick={onCancel}
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
                <div className="cropper">
                    <Cropper
                        image={inputImg}
                        zoom={zoom}
                        crop={crop}
                        aspect={aspect.value}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropComplete}
                    />
                </div>
            </Dialog.DialogContent>
            <Dialog.DialogActions
                style={{
                    display: "grid",
                    gridTemplateColumns: "100%",
                    gridRowGap: " 10px",
                    textAlign: "center",
                    justifyContent: "center",
                }}
            >
                <div className="controls">
                    <Slider
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => {
                            onZoomChange(e.target.value);
                        }}
                        className="slider"
                    />
                    <ThemeProvider theme={theme}>
                        <MuiSelect
                            labelId="aspect-ratio-select"
                            id="aspect-ratio-select"
                            value={aspect.value}
                            onChange={onAspectChange}
                            style={{
                                paddingBottom: "2px",
                                paddingTop: "2px",
                                border: " 1px solid #DADFF1",
                                background: "#F5F6FA",
                                color: "#3b4468",
                                borderRadius: "3px",
                            }}
                        >
                            {aspectRatios.map((ratio) => (
                                <MenuItem key={ratio.text} value={ratio.value}>
                                    {ratio.text}
                                </MenuItem>
                            ))}
                        </MuiSelect>
                    </ThemeProvider>
                </div>
                <div className="controls">
                    <Button variant="text" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={onResetImage} autoFocus>
                        Reset
                    </Button>
                    <Button onClick={onCrop} autoFocus>
                        {loading ? (
                            <CircularProgress
                                style={{
                                    width: "14px",
                                    height: "14px",
                                    color: "#fff",
                                }}
                            />
                        ) : (
                            "Crop"
                        )}
                    </Button>
                </div>
            </Dialog.DialogActions>
        </Dialog>
    );
};

export default ImageCropperDailog;

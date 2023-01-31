import { IconButton, Paper } from "@mui/material";
import Icon from "../IconComponent";

const FilePreview = ({ onCancel, src, srcset, alt, filename }) => {
    return (
        <Paper style={{ marginBottom: "20px" }}>
            <div className="file_preview">
                <IconButton
                    aria-label="close"
                    disableFocusRipple={true}
                    disableRipple={true}
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
                <div className="file_preview_frame">
                    <img
                        className="file_preview_img"
                        src={src}
                        srcSet={srcset}
                        alt={alt}
                        loading="eager"
                    />
                    <p className="file-footer-caption text-ellipsis ">
                        {filename?.split(".")[0]}
                    </p>
                </div>
            </div>
        </Paper>
    );
};

export default FilePreview;

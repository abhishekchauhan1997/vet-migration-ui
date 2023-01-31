import Icon from "components/IconComponent";
// import "./preview_styles.scss";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import pdfImg from "../../../../assets/images/icon-pdf.png";
import { Fragment } from "react";

const UploadPreviewer = ({
    files,
    uploadPhotoRef,
    dispatcher,
    type = "text",
}) => {
    const handleCancelOnFilePreview = (index) => {
        // ** close icon logic goes here for file preview
        uploadPhotoRef.current.value = "";
        let temp = [...(files ?? [])];
        temp.splice(index, 1);
        dispatcher(temp);
    };
    return (
        <div className="upload-previewBox">
            <Stack sx={{ width: "100%" }} spacing={2}>
                {files.map((item, index) => (
                    <Fragment key={`${item.file_name}_${index}`}>
                        <Card
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                height: 66,
                                p: "8px",
                            }}
                            key={`${item.file_name}_${index}`}
                        >
                            {type === "link" ? (
                                <>
                                    <Link
                                        href={`${item.file_content}?w=248&fit=crop&auto=format`}
                                        target="_blank"
                                        rel="noreferrer"
                                        underline="none"
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 50, height: 50 }}
                                            image={
                                                ["pdf", "doc", "docx"].includes(
                                                    item.file_ext
                                                )
                                                    ? pdfImg
                                                    : item.file_content
                                            }
                                            alt={item.file_name}
                                        />
                                    </Link>

                                    <CardContent
                                        sx={{
                                            p: "0px 16px 0px 16px",
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Link
                                            href={`${item.file_content}?w=248&fit=crop&auto=format`}
                                            target="_blank"
                                            rel="noreferrer"
                                            underline="hover"
                                        >
                                            {item.file_name}
                                        </Link>
                                    </CardContent>
                                </>
                            ) : (
                                <>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 50, height: 50 }}
                                        image={
                                            ["pdf", "doc", "docx"].includes(
                                                item.file_ext
                                            )
                                                ? pdfImg
                                                : item.file_content
                                        }
                                        alt={item.file_name}
                                    />

                                    <CardContent
                                        sx={{
                                            p: "0px 16px 0px 16px",
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Typography
                                            component="div"
                                            variant="subtitle1"
                                            sx={{ color: "#3b4468" }}
                                        >
                                            {item.file_name}
                                        </Typography>
                                    </CardContent>
                                </>
                            )}
                            <CardActions sx={{ alignItems: "center" }}>
                                <IconButton
                                    aria-label="close"
                                    onClick={() =>
                                        handleCancelOnFilePreview(index)
                                    }
                                    sx={{
                                        color: "#3b4468",
                                    }}
                                >
                                    <Icon
                                        type="delete"
                                        className="dialog_icon"
                                    />
                                </IconButton>
                            </CardActions>
                        </Card>
                        {type !== "link" &&
                            item.file_size > 1024 * 1024 * 5 && (
                                <Typography
                                    component="p"
                                    variant="text"
                                    sx={{
                                        color: "crimson",
                                        textAlign: "center",
                                        fontSize: "12px",
                                    }}
                                    style={{ marginTop: "4px" }}
                                >
                                    {item.file_name} file should be less than 5
                                    mb
                                </Typography>
                            )}
                    </Fragment>
                ))}
            </Stack>
        </div>
    );
};

export default UploadPreviewer;

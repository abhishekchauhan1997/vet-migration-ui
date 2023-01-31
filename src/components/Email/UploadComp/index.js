import FileInput from "components/Form/FileInput";
import Icon from "components/IconComponent";

const UploadComp = ({
    fieldDetails,
    dispatcher,
    helperText,
    id,
    uploadPhotoRef,
}) => {
    const handleUploadFile = (e, name) => {
        if (name === id) {
            return uploadPhotoRef.current.click();
        }
    };

    const fileInputChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            Promise.all(
                files.map((file) => {
                    return new Promise((resolve, reject) => {
                        let fileObj = {
                            file_name: `${file.name?.split(".")[0]}`.replace(
                                " ",
                                "_"
                            ),
                            file_ext: file.name?.split(".")[1],
                            file_size: file.size,
                        };
                        const reader = new FileReader();
                        reader.addEventListener("load", (ev) => {
                            resolve({
                                ...fileObj,
                                file_content: ev.target.result,
                            });
                        });
                        reader.addEventListener("error", reject);
                        reader.readAsDataURL(file);
                    });
                })
            ).then(
                (images) => {
                    dispatcher(images);
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    };

    return (
        <div>
            <FileInput
                label={fieldDetails?.label}
                name={id}
                id={id}
                accept=".pdf,.doc,.docx,image/*,video/*"
                inputRef={uploadPhotoRef}
                content="Browse"
                helperText={helperText}
                handleClick={(e) => handleUploadFile(e, id)}
                handleFileChange={(e) => fileInputChange(e, id)}
                startIcon={
                    <Icon type="upload" className="form_fileInputIcon" />
                }
                multiple
            ></FileInput>
        </div>
    );
};

export default UploadComp;

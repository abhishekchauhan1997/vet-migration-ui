import { CircularProgress } from "@mui/material";
import Button from "UIComponents/Button";
import Card from "UIComponents/Card";

const FormHeader = ({
    title,
    content,
    disabled,
    onClick,
    isCancelBtn,
    handleCancelBtn,
    loading = false,
    cancelCnt,
    ...props
}) => {
    return (
        <Card {...props} className="form_header">
            <Card.Body className="card_title">{title}</Card.Body>
            <Card.Body className="formHeader_cardBody">
                {isCancelBtn && (
                    <Button
                        color="secondary"
                        variant="outlined"
                        className="card_btn"
                        onClick={handleCancelBtn}
                    >
                        {cancelCnt ?? "Cancel"}
                    </Button>
                )}
                {content && (
                    <Button
                        type="submit"
                        disabled={disabled}
                        className="card_btn"
                        onClick={onClick}
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
                            content
                        )}
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default FormHeader;

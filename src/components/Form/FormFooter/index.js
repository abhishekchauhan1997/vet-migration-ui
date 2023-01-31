import { CircularProgress } from "@mui/material";
import Button from "UIComponents/Button";
import Card from "UIComponents/Card";

const FormFooter = ({
    content,
    disabled,
    children,
    isCancelBtn,
    handleCancelBtn,
    loading = false,
    onClick,
    cancelCnt,
    ...props
}) => {
    return (
        <Card className="form_footer">
            <Card.Body className="formFooter_cardBody">
                {children ?? (
                    <>
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
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default FormFooter;

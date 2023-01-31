// * ui elements *
import { PDFViewer } from "@react-pdf/renderer";
import Button from "UIComponents/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "UIComponents/Dialog";

const PDFModal = ({
    open = false,
    title = "View PDF",
    options = {},
    closeModal = () => {},
    document,
}) => {
    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="md"
            scroll={"paper"}
            PaperProps={{
                sx: { padding: 0 },
            }}
        >
            <div className="flex aiC formHeader">
                <Dialog.DialogTitle sx={{ padding: "10px 20px" }}>
                    {title}
                </Dialog.DialogTitle>

                <Dialog.DialogActions
                    sx={{ padding: 0 }}
                    className="formButtons-container flex flexG justifyE"
                >
                    <Button onClick={closeModal} defaultColor variant="icon">
                        {<CloseIcon />}
                    </Button>
                </Dialog.DialogActions>
            </div>
            <Dialog.DialogContent
                sx={{
                    padding: "10px",
                    marginInline: "10px",
                    scrollBehavior: "smooth",
                    overflowY: "hidden",
                    height: "calc(100vh - 250px)",
                }}
                dividers
            >
                <PDFViewer
                    style={{
                        border: "none",
                        width: "100%",
                        height: "100%",
                    }}
                    {...options}
                >
                    {document}
                </PDFViewer>
            </Dialog.DialogContent>
        </Dialog>
    );
};

export default PDFModal;

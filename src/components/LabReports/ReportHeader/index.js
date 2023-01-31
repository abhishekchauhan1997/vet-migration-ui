import Button from "UIComponents/Button";
import Card from "UIComponents/Card";
import { setItemSession } from "utils/appUtils";

const ReportHeader = ({
    title,
    review,
    reports,
    actionBtns,
    cmdReport,
    setCmdReport,
}) => {
    const handleButtonClick = (status) => {
        setItemSession("referrer", { cmdreport: status });
        setCmdReport(status);
    };
    return (
        <Card className="card_header">
            <h5 style={{ margin: "10px 0px" }}>
                {title} {review} {cmdReport} {reports}
            </h5>
            <div className="zoetis_btn">
                {actionBtns?.map((item, index) => (
                    <Button
                        key={index}
                        color={item?.color}
                        onClick={() => handleButtonClick(item?.status)}
                        className="card_btn h40"
                    >
                        {item.text}
                    </Button>
                ))}
            </div>
        </Card>
    );
};
export default ReportHeader;

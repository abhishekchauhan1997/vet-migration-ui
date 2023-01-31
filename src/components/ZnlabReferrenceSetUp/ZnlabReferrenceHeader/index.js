import Button from "UIComponents/Button";
import Card from "UIComponents/Card";

const ZnlabsReferrenceHeader = ({ title, actionBtns, handleImportItemBtn }) => {
    const buttonActionMapping = () => {
        handleImportItemBtn();
    };

    return (
        <Card className="card_header znlabsSetup_header">
            <h5>{title}</h5>
            <div>
                {actionBtns?.map((item, index) => (
                    <Button
                        key={index}
                        onClick={buttonActionMapping}
                        className={`${item?.variant} card_btn h40`}
                    >
                        {item.text}
                    </Button>
                ))}
            </div>
        </Card>
    );
};
export default ZnlabsReferrenceHeader;

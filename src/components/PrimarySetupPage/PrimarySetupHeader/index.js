import Button from "UIComponents/Button";
import Card from "UIComponents/Card";

const PrimarSetupheader = ({ title, actionBtns, handleBtn }) => {
    const buttonActionMapping = {
        addBtn: () => handleBtn(),
    };

    return (
        <Card className="card_header znlabsSetup_header">
            <h5>{title}</h5>
            <div>
                {actionBtns?.map((item, index) => (
                    <Button
                        key={index}
                        onClick={buttonActionMapping[item?.key]}
                        className={`${item?.variant} card_btn h40`}
                    >
                        {item.text}
                    </Button>
                ))}
            </div>
        </Card>
    );
};
export default PrimarSetupheader;

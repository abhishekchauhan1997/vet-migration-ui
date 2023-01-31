import Button from "UIComponents/Button";
import Card from "UIComponents/Card";

const PrimarSetupheader = ({ title, actionBtns, handleBtn, setAddNew }) => {
    const buttonActionMapping = {
        addBtn: () => {
            handleBtn();
            setAddNew(true);
        },
    };

    return (
        <Card className="card_header znlabsSetup_header">
            <p
                style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {title}
            </p>
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

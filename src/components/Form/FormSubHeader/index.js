import Card from "UIComponents/Card";

const FormSubHeader = ({ title }) => {
    return (
        <Card className="form_sub_header">
            <Card.Body>{title}</Card.Body>
        </Card>
    );
};

export default FormSubHeader;

import classnames from "classnames";
import Button from "UIComponents/Button";
import { Checkbox } from "UIComponents/Checkbox";
import Input from "UIComponents/Input";

const InputContainer = ({ id, children, className }) => {
    return (
        <div id={id} className={classnames("form_input", className)}>
            {children}
        </div>
    );
};

export const InputWithButton = ({
    content,
    handleClick = () => {},
    ...props
}) => {
    return (
        <div className="form_input_btn">
            <Input {...props} />
            <Button onClick={handleClick} className="h40">
                {content}
            </Button>
        </div>
    );
};

export const CheckBoxGroup = ({
    arr = [],
    handleCheck = () => {},
    ...props
}) => {
    return (
        <div className="flexC">
            {arr.map((item, index) => (
                <div className="flexC" key={index}>
                    <Checkbox
                        {...props}
                        id={item.id}
                        name={item.name}
                        handleChange={(e) => handleCheck(e, item.name)}
                    />
                    <Input.InputLabel required={item.required}>
                        {item.label}
                    </Input.InputLabel>
                </div>
            ))}
        </div>
    );
};

export default InputContainer;

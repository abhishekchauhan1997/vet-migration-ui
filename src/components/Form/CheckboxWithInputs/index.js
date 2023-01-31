import { Checkbox } from "UIComponents/Checkbox";
import Input from "UIComponents/Input";

const CheckboxWithInputs = ({
    idx,
    field = {},
    checked,
    defaultValue,
    handleCheck = () => {},
}) => {
    return (
        <>
            <Input.FormControl
                className="form_input_checkbox"
                id={field.id}
                key={field.id}
                idx={idx}
            >
                <Input.FormLabel required={field.required}>
                    {field.label}
                </Input.FormLabel>
                <Checkbox
                    name={field.name}
                    checked={checked}
                    handleChange={(e) => handleCheck(e, field.name)}
                />
            </Input.FormControl>
            {checked &&
                field?.inputs?.map((item, index) => {
                    return (
                        <Input.FormControl
                            id={item.id}
                            key={item.id}
                            className="form_input"
                        >
                            <Input.FormLabel required={item.required}>
                                {item.label}
                            </Input.FormLabel>
                            <Input
                                type={item.type}
                                name={item.name}
                                placeholder={item.label}
                                required={item.required}
                                defaultValue={defaultValue}
                                autoFocus={idx === 0}
                            />
                        </Input.FormControl>
                    );
                })}
        </>
    );
};

export default CheckboxWithInputs;

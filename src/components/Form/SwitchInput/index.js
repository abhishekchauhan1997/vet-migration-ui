import Input from "UIComponents/Input";
import ControlledSwitches from "UIComponents/Switch";

const SwitchInput = ({ id, field, label, status, handleCheck }) => {
    return (
        <Input.FormControl id={field.id} key={field.id} className="form_input">
            <Input.FormLabel required={field.required}>{label}</Input.FormLabel>
            <ControlledSwitches
                id={id}
                name={field.name}
                checked={status}
                handleChange={handleCheck}
            />
        </Input.FormControl>
    );
};

export default SwitchInput;

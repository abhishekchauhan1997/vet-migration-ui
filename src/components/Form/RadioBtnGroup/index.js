import Input from "UIComponents/Input";
import Radio from "UIComponents/Radio";

const RadioBtnGroup = ({ field, label, radioValue, handleCheck }) => {
    return (
        <Input.FormControl id={field.id} key={field.id} className="form_input">
            <Input.FormLabel>{label}</Input.FormLabel>
            <div className="checkbox_group">
                {field?.checkboxGroup?.map((item, index) => (
                    <div key={item.id} className="flexC">
                        <Radio
                            id={item.id}
                            name={item.name}
                            checked={radioValue === index + 1}
                            handleChange={(e) => handleCheck(e, index)}
                            value={item.value}
                        />
                        <Input.FormLabel>{item.label}</Input.FormLabel>
                    </div>
                ))}
            </div>
        </Input.FormControl>
    );
};

export default RadioBtnGroup;

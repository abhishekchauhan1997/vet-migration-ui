import classNames from "classnames";
import { Checkbox } from "UIComponents/Checkbox";
import Autocomplete from "UIComponents/Autocomplete";
import Input from "UIComponents/Input";

const CheckboxWithAutocomplete = ({
    idx,
    field = {},
    checked,
    value,
    formControlClass,
    checkboxClass,
    selectClass,
    options = {},
    openSelectState = {},
    handleCheck = () => {},
    handleChange = () => {},
    handleOpenState = () => {},
    handleCloseState = () => {},
    loadingState = () => {},
}) => {
    return (
        <>
            <Input.FormControl
                className={classNames(
                    checked ? formControlClass : "form_input_checkbox"
                )}
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
                    className={classNames(checkboxClass)}
                    handleChange={(e) => handleCheck(e, field.name)}
                />
                {checked &&
                    field?.inputs?.map((item, index) => {
                        return (
                            <Autocomplete
                                id={item.id}
                                key={item.id}
                                options={options[item.name]}
                                name={item.name}
                                multiple={item.multiple}
                                required={item.required}
                                placeholder={item.label}
                                freeSolo={item.freeSolo}
                                className={classNames(selectClass)}
                                handleChange={(e, value) =>
                                    handleChange(value, item.name)
                                }
                                value={value}
                                onOpen={(e) => handleOpenState(e, item.name)}
                                onClose={(e) => handleCloseState(e, item.name)}
                                loading={loadingState(item.name) ? true : false}
                                open={openSelectState[field.name]}
                            />
                        );
                    })}
            </Input.FormControl>
        </>
    );
};

export default CheckboxWithAutocomplete;

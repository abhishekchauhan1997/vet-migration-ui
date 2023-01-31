import { FormControlLabel, RadioGroup } from "@mui/material";
import classNames from "classnames";
import Input from "UIComponents/Input";
import Radio from "UIComponents/Radio";

const RadioGroupWrapper = ({
    label,
    field,
    isInput,
    value,
    defaultVal,
    className,
    handleRadioChange,
}) => {
    return (
        <Input.FormControl id={field.id} className="form_input">
            {label && (
                <Input.FormLabel
                    id={`${field.id}-row-radio-buttons-group-label`}
                >
                    {label}
                </Input.FormLabel>
            )}
            <div className={classNames(className)}>
                {isInput && (
                    <Input
                        type={field.type}
                        name={field.name}
                        autoFocus={field.autoFocus}
                        placeholder={field.placeholder}
                        defaultValue={value}
                        inputProps={{ maxLength: field.maxlength }}
                    />
                )}
                <RadioGroup
                    row
                    value={defaultVal ?? field?.choice}
                    aria-labelledby={`${label}-row-radio-buttons-group-label`}
                    name={`${field.name}-radio-buttons-group`}
                    onChange={handleRadioChange}
                >
                    {field?.radioGroups?.map((item) => (
                        <FormControlLabel
                            id={item.id}
                            key={item.id}
                            value={item.value}
                            control={<Radio />}
                            label={item.label}
                            name={item.name}
                        />
                    ))}
                </RadioGroup>
            </div>
        </Input.FormControl>
    );
};

export default RadioGroupWrapper;

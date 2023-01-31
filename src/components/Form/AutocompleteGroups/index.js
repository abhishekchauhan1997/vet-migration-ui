import classNames from "classnames";
import Autocomplete from "UIComponents/Autocomplete";
import Button from "UIComponents/Button";
import Input from "UIComponents/Input";

const AutocompleteGroup = ({
    idx,
    field = {},
    selectedVal,
    label,
    value = {},
    formControlClass,
    selectClass,
    options = {},
    openSelectState = {},
    handleChange = () => {},
    handleOpenState = () => {},
    handleCloseState = () => {},
    loadingState = () => {},
    handleClick = () => {},
}) => {
    return (
        <>
            <Input.FormControl
                className={classNames(formControlClass)}
                id={field.id}
                key={field.id}
                idx={idx}
            >
                {label && (
                    <Input.FormLabel required={field.required}>
                        {label}
                    </Input.FormLabel>
                )}

                <Autocomplete
                    id={field.id}
                    key={field.id}
                    options={options[field.name]}
                    name={field.name}
                    multiple={field.multiple}
                    required={field.required}
                    placeholder={field.label}
                    freeSolo={field.freeSolo}
                    className={classNames(selectClass)}
                    handleChange={(e, value) => handleChange(value, field.name)}
                    value={selectedVal}
                    onOpen={(e) => handleOpenState(e, field.name)}
                    onClose={(e) => handleCloseState(e, field.name)}
                    loading={loadingState(field.name) ? true : false}
                    // open={openSelectState[field.name]}
                />

                {(selectedVal !== null || undefined) &&
                    field?.selectGroup?.map((item, index) => {
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
                                value={value[item.name]}
                                onOpen={(e) => handleOpenState(e, item.name)}
                                onClose={(e) => handleCloseState(e, item.name)}
                                loading={loadingState(item.name) ? true : false}
                                // open={openSelectState[field.name]}
                            />
                        );
                    })}
                <Button className="h40" onClick={handleClick}>
                    Add
                </Button>
            </Input.FormControl>
        </>
    );
};

export default AutocompleteGroup;

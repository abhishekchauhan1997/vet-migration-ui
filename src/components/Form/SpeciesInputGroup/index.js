import { FormHelperText } from "@mui/material";
import Autocomplete from "UIComponents/Autocomplete";
import Input from "UIComponents/Input";

const SpeciesTypeFormGroup = ({
    field = {},
    formData = {},
    species = {},
    openSelectState = {},
    options = [],
    handleChange = () => {},
    handleOpenState = () => {},
    handleCloseState = () => {},
    loadingState = () => {},
}) => {
    return (
        <>
            <Input.FormControl
                id={`${field.id}_formGroup`}
                key={field.id}
                className="form_input"
            >
                <Input.FormLabel
                    required={field.required}
                    error={
                        (species === null || undefined) && field.showHelperText
                            ? true
                            : false
                    }
                >
                    {field.label}
                </Input.FormLabel>
                <div>
                    <Autocomplete
                        options={options[field.name]}
                        name={field.name}
                        multiple={field.multiple}
                        required={field.required}
                        placeholder={field.placeholder}
                        freeSolo={field.freeSolo}
                        value={formData[field.name]}
                        isOptionEqualToValue={(option, value) =>
                            option.title === value.title
                        }
                        handleChange={(e, value) =>
                            handleChange(value, field.name)
                        }
                        onOpen={(e) => handleOpenState(e, field.name)}
                        onClose={(e) => handleCloseState(e, field.name)}
                        loading={loadingState(field.name) ? true : false}
                        open={openSelectState[field.name]}
                        error={
                            (species === null || undefined) &&
                            field.showHelperText
                                ? 1
                                : 0
                        }
                    />
                    {(species === null || undefined) &&
                        field.showHelperText && (
                            <FormHelperText className="error_helpertext">
                                {field.helperText}
                            </FormHelperText>
                        )}
                </div>
            </Input.FormControl>
            {(species !== null || undefined) &&
                field?.selectGroup.map((item) => (
                    <Input.FormControl
                        id={`${item.id}_formGroup`}
                        key={item.id}
                        className="form_input"
                    >
                        <Input.FormLabel required={item.required}>
                            {item.label}
                        </Input.FormLabel>
                        <Autocomplete
                            options={options[item.name]}
                            name={item.name}
                            multiple={item.multiple}
                            required={item.required}
                            placeholder={item.placeholder}
                            freeSolo={item.freeSolo}
                            value={formData[item.name]}
                            isOptionEqualToValue={(option, value) =>
                                option.title === value.title
                            }
                            handleChange={(e, value) =>
                                handleChange(value, item.name)
                            }
                            onOpen={(e) => handleOpenState(e, item.name)}
                            onClose={(e) => handleCloseState(e, item.name)}
                            loading={loadingState(item.name) ? true : false}
                            open={openSelectState[item.name]}
                        />
                    </Input.FormControl>
                ))}
        </>
    );
};

export default SpeciesTypeFormGroup;

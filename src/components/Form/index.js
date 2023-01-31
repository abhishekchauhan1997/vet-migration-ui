import { FormHelperText } from "@mui/material";
import Autocomplete from "UIComponents/Autocomplete";
import { Checkbox } from "UIComponents/Checkbox";
import DatePicker from "UIComponents/DatePicker";
import Input from "UIComponents/Input";
import Icon from "../IconComponent";

const Form = ({
    label,
    field = {},
    index = Number,
    value,
    inputVal,
    options = [],
    openSelectState = Boolean,
    handleLoadingStateForSelectInput = () => {},
    handleOpenState = () => {},
    handleCloseState = () => {},
    handleCheck = () => {},
    handleSelect = () => {},
    handleFocusOnInput = () => {},
    handleOnBlurInput = () => {},
    handleInputChange = () => {},
    ...props
}) => {
    if (field.type === "textarea") {
        return (
            <Input.FormControl
                id={field.id}
                key={field.id}
                className="form_input"
                error={field.showHelperText ? true : false}
            >
                <Input.FormLabel required={field.required}>
                    {label}
                </Input.FormLabel>
                <div>
                    <textarea
                        type={field.type}
                        required={field.required}
                        name={field.name}
                        id={field.id}
                        className="text_area"
                        placeholder={label}
                        rows={4}
                        cols={5}
                        defaultValue={value}
                    ></textarea>
                    {field.showHelperText && (
                        <FormHelperText className="error_helpertext">
                            {field.helperText}
                        </FormHelperText>
                    )}
                </div>
            </Input.FormControl>
        );
    }
    if (field.type === "date") {
        return (
            <Input.FormControl
                id={field.id}
                key={field.id}
                className="form_input form_dateInput"
                error={field.showHelperText ? true : false}
            >
                <Input.FormLabel required={field.required}>
                    {label}
                </Input.FormLabel>
                <div>
                    <DatePicker
                        name={field.name}
                        placeholder={field.format}
                        disabled={props.isDisabled}
                        // inputFormat={field.format}
                        value={value}
                        onChange={(value) => handleSelect(value, field.name)}
                        onError={(reason, value) => console.log(reason, value)}
                    />
                    {field.showHelperText && (
                        <FormHelperText className="error_helpertext">
                            {field.helperText}
                        </FormHelperText>
                    )}
                </div>
            </Input.FormControl>
        );
    }
    if (field.multiple && field.freeSolo) {
        return (
            // ** multiple select inputs val in autocomplete

            <Input.FormControl
                id={field.id}
                key={field.id}
                className="form_input"
                error={field.showHelperText ? true : false}
            >
                <Input.FormLabel required={field.required}>
                    {label}
                </Input.FormLabel>
                <div>
                    <Autocomplete
                        options={[]}
                        name={field.name}
                        multiple={field.multiple}
                        required={field.required}
                        placeholder={field.label}
                        freeSolo={field.freeSolo}
                        handleChange={(e, value) =>
                            handleSelect(value, field.name)
                        }
                        value={value}
                        error={field.showHelperText ? 1 : 0}
                    />
                    {field.showHelperText && (
                        <FormHelperText className="error_helpertext">
                            {field.helperText}
                        </FormHelperText>
                    )}
                </div>
            </Input.FormControl>
        );
    }
    if (field.isAutocomplete) {
        return (
            <Input.FormControl
                id={field.id}
                key={field.id}
                className="form_input"
                error={field.showHelperText ? true : false}
            >
                <Input.FormLabel required={field.required}>
                    {label}
                </Input.FormLabel>
                <div>
                    <Autocomplete
                        name={field.name}
                        options={options}
                        multiple={field.multiple}
                        required={field.required}
                        placeholder={field.label}
                        freeSolo={field.freeSolo}
                        open={openSelectState}
                        error={field.showHelperText ? 1 : 0}
                        loading={
                            handleLoadingStateForSelectInput(field.name)
                                ? true
                                : false
                        }
                        onOpen={(e) => handleOpenState(e, field.name)}
                        onClose={(e) => handleCloseState(e, field.name)}
                        handleChange={(e, value) =>
                            handleSelect(value, field.name)
                        }
                        isOptionEqualToValue={(option, value) =>
                            option.title === value.title
                        }
                        value={value}
                    />
                    {field.showHelperText && (
                        <FormHelperText className="error_helpertext">
                            {field.helperText}
                        </FormHelperText>
                    )}
                </div>
            </Input.FormControl>
        );
    }
    if (field.isCheckbox) {
        return (
            <Input.FormControl
                className="form_input_checkbox"
                id={field.id}
                key={field.id}
                error={field.showHelperText ? true : false}
            >
                <Input.FormLabel required={field.required}>
                    {label}
                </Input.FormLabel>
                <div>
                    <Checkbox
                        name={field.name}
                        checked={value}
                        handleChange={(e) => handleCheck(e, field.name)}
                    />
                    {field.showHelperText && (
                        <FormHelperText className="error_helpertext">
                            {field.helperText}
                        </FormHelperText>
                    )}
                </div>
            </Input.FormControl>
        );
    }

    return (
        <Input.FormControl
            id={field.id}
            key={field.id}
            className="form_input"
            error={field.showHelperText ? true : false}
        >
            <Input.FormLabel
                required={field.required}
                className={
                    field.showWarningHelperText ? "warning_helpertext" : ""
                }
            >
                {label}
            </Input.FormLabel>
            <div>
                <Input
                    type={field.type}
                    name={field.name}
                    autoFocus={field.autoFocus}
                    placeholder={field.label}
                    defaultValue={value}
                    value={inputVal}
                    inputProps={{ maxLength: field.maxlength }}
                    onChange={(e) => handleInputChange(e, field.name)}
                    onFocus={(e) => handleFocusOnInput(e, field.name)}
                    onBlur={(e) => handleOnBlurInput(e, field.name)}
                    className={
                        field.showWarningHelperText ? "warning_inputborder" : ""
                    }
                    endAdornment={
                        field.showWarningHelperText && (
                            <Icon
                                type="warning"
                                className="emr_icon warning_helpertext pR8"
                            />
                        )
                    }
                />
                {field.showHelperText && (
                    <FormHelperText className="error_helpertext">
                        {field.helperText}
                    </FormHelperText>
                )}
                {field.showSuccessHelperText && (
                    <FormHelperText className="success_helpertext">
                        {field.helperText}
                    </FormHelperText>
                )}
                {field.showWarningHelperText && (
                    <FormHelperText className="warning_helpertext">
                        {field.helperText}
                    </FormHelperText>
                )}
            </div>
        </Input.FormControl>
    );
};

export default Form;

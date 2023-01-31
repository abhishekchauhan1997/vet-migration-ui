import { FormHelperText } from "@mui/material";
import classNames from "classnames";
import React from "react";
import Autocomplete from "UIComponents/Autocomplete";
import Input from "UIComponents/Input";

const PhonetypeWithInputs = React.forwardRef(function PhonetypeWithInputs(
    {
        field = {},
        className,
        value,
        inputValue,
        options = [],
        openSelectState = {},
        phonetype = {},
        handleChange = () => {},
        onInputChange = () => {},
        handleOpenState = () => {},
        handleCloseState = () => {},
        loadingState = () => {},
        handleFocus = () => {},
        handleMouseEnter = () => {},
        handleMouseLeave = () => {},
    },
    inputRef
) {
    return (
        <Input.FormControl id={field.id} key={field.id} className="form_input">
            <Input.FormLabel
                required={field.required}
                error={
                    (phonetype === null || undefined) && field.showHelperText
                        ? true
                        : false
                }
            >
                {field.label}
            </Input.FormLabel>
            <div className={classNames(className)}>
                <Autocomplete
                    options={options}
                    name={field.name}
                    multiple={field.multiple}
                    required={field.required}
                    placeholder={field.placeholder}
                    freeSolo={field.freeSolo}
                    value={value}
                    isOptionEqualToValue={(option, value) =>
                        option.title === value.title
                    }
                    error={
                        (phonetype === null || undefined) &&
                        field.showHelperText
                            ? 1
                            : 0
                    }
                    handleChange={(e, value) => handleChange(value, field.name)}
                    open={openSelectState[field.name]}
                    onOpen={(e) => handleOpenState(e, field.name)}
                    onClose={(e) => handleCloseState(e, field.name)}
                    loading={loadingState(field.name) ? true : false}
                />
                {(phonetype === null || undefined) && field.showHelperText && (
                    <FormHelperText className="error_helpertext">
                        {field.helperText}
                    </FormHelperText>
                )}
                {(phonetype !== null || undefined) &&
                    field?.inputs?.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <input type="hidden" />
                                <Input
                                    type="text"
                                    name={item.name}
                                    id={item.id}
                                    required={false}
                                    placeholder={phonetype?.format}
                                    data-placeholder={"1234567"}
                                    value={inputValue}
                                    error={field.showHelperText ? true : false}
                                    onFocus={(e) => handleFocus(e, item.name)}
                                    onMouseOver={(e) =>
                                        handleMouseEnter(
                                            e,
                                            item?.name,
                                            phonetype?.format
                                        )
                                    }
                                    onMouseOut={(e) =>
                                        handleMouseLeave(e, item?.name)
                                    }
                                    onChange={(e) =>
                                        onInputChange(
                                            e,
                                            item?.name,
                                            phonetype?.format
                                        )
                                    }
                                    maxLength={phonetype?.format?.length}
                                />
                                {field.showHelperText && (
                                    <FormHelperText
                                        className="error_helpertext"
                                        style={{
                                            marginBottom: "-20px",
                                            whiteSpace: "nowrap",
                                            fontSize: "10px",
                                        }}
                                    >
                                        {field.helperText}
                                    </FormHelperText>
                                )}
                            </div>
                        );
                    })}
            </div>
        </Input.FormControl>
    );
});

export default PhonetypeWithInputs;

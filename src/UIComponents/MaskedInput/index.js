import React, { useState } from "react";
import Input from "UIComponents/Input";

const MaskedInput = ({
    ariaLabel,
    placeholder,
    onChange,
    type = "",
    defaultValue = "",
    _testingClassName_,
    ...props
}) => {
    const [inputVal, setInputVal] = useState(defaultValue);

    //* --------- validator start------
    const isNumberOrLetter = (val) =>
        (val !== " " && !Number.isNaN(val) && val >= 0 && val <= 9) ||
        /[a-zA-Z]/.test(val);
    const isNumber = (val) =>
        val !== " " && !Number.isNaN(val) && val >= 0 && val <= 9;
    const isLetter = (val) => /[a-zA-Z]/.test(val);
    //* --------- validator end------

    const handleInputChange = (e) => {
        const value = e.target.value;
        const format = placeholder;
        if (value.length > format.length) return;
        let currentValue = "";

        // checking the if new value added
        const isCharAdded = value.length > inputVal.length;

        let newInputVal = "";
        if (isCharAdded) {
            // checking the placeholder value with current value, length-1
            const formatValue = format[value.length - 1];
            currentValue = value[value.length - 1];
            // if provided value is same as placeholder value the updating the newInputVal variable else if not matching with formatted value then
            let check = false;
            if (isNumber(formatValue)) {
                check = isNumber(currentValue);
            } else if (isLetter(formatValue)) {
                check = isLetter(currentValue);
            }
            if (check) {
                newInputVal = value;
            } else if (!isNumberOrLetter(formatValue)) {
                newInputVal = inputVal + formatValue + currentValue;
            } else {
                // if check false
                return newInputVal;
            }
        }
        if (value.length < format.length) {
            if (isCharAdded) {
                const nextFormatVal = format[value.length];
                // form adding special character
                if (!isNumberOrLetter(nextFormatVal)) {
                    newInputVal = value + nextFormatVal;
                }
            } else {
                newInputVal = inputVal;
                currentValue = inputVal[inputVal.length - 1];
                // this one for deleting special character
                if (!isNumberOrLetter(currentValue)) {
                    newInputVal = inputVal.slice(0, inputVal.length - 2);
                } else {
                    newInputVal = value;
                }
            }
        }
        // if (type === "number") {
        //     PhoneNoValidation(newInputVal);
        // } else {
        setInputVal(newInputVal);
        onChange(newInputVal);
        // }
    };
    return (
        <Input
            value={inputVal}
            inputProps={ariaLabel}
            placeholder={placeholder}
            onChange={handleInputChange}
            _testingClassName_={_testingClassName_}
            {...props}
        />
    );
};

export default MaskedInput;

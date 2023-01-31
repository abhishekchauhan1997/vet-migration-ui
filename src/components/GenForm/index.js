import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormContextProvider } from "../../context/FormContext";
import { validateByRegex } from "../../utils/appUtils";

const Form = ({ children, lastElementId, onSubmit, ...props }) => {
  const event = useRef({});
  const [elements, setElements] = useState([]);
  const [errorFields, setErrorFields] = useState([]);
  let collectedFields = useRef();

  useEffect(() => {
    event.current = {};
    collectedFields.current = [];
  }, []);

  const getErrorFields = (fields) => {
    let errorFields = [];
    fields.forEach((field) => {
      let newHelper = "";
      // TODO: field check should not be done here, proper helper text should come from the component; needs fix
      if (
        field.id !== "username" &&
        field.id !== "password" &&
        field.id !== "confirmPassword" &&
        // TODO: below check will result in: field.value === "", use [null, undefined, ""].includes(field.value)
        field.value === (null || undefined || "")
      ) {
        newHelper = "This field is required";
      } else {
        newHelper = field?.helper ?? "Enter proper values";
      }
      const { type, value } = field ?? {};
      let val = true;
      if (type) {
        val = validateByRegex(type, value);
      }
      // Custom validation check for required field and non required
      if (
        field.required &&
        (field.error ||
          (Array.isArray(field.value)
            ? field.value?.length === 0
            : field.value?.trim?.()?.length === 0) ||
          field.value === false ||
          field.value === null ||
          !val ||
          field.handleErrorBeforeSubmit?.(field.value))
      ) {
        errorFields.push({ ...field, helperText: newHelper });
      } else if (field.handleErrorBeforeSubmit?.(field.value)) {
        errorFields.push({ ...field, helperText: field?.helper });
      }
    });
    return errorFields;
  };

  const sendFormData = useCallback(
    (collectedFields) => {
      const fields = {};
      collectedFields.forEach((field) => {
        // remove this conditon
        // ! replacing all consecutive spaces and around the string
        if (
          ![undefined, null].includes(field.value) &&
          field.value.toString().length > 0
        )
          fields[field.id] =
            typeof field.value === "string"
              ? field.value.trim().replaceAll(/\s+/g, " ")
              : field.value;
      });
      onSubmit?.(fields, event.current);
      setElements([]);
    },
    [onSubmit]
  );

  const prepareValidateFields = useCallback(
    (collectedFields) => {
      let requiredFields = [];
      let optionalFields = [];

      collectedFields.forEach((field) => {
        if (field.required || field.handleErrorBeforeSubmit) {
          requiredFields.push(field);
        } else {
          optionalFields.push(field);
        }
      });

      const errorFields = getErrorFields(requiredFields);
      setErrorFields(
        errorFields.map((field) => ({
          id: field.id,
          helperText: field.helperText,
        }))
      );
      if (errorFields.length > 0) {
        setElements([]);

        errorFields[0]?.onFocus
          ? errorFields[0]?.onFocus()
          : elements[errorFields[0]?.id]?.focus();
      } else {
        sendFormData([...requiredFields, ...optionalFields]);
      }
    },
    [elements, sendFormData]
  );

  const fieldCollector = useCallback(
    (getFieldCallback) => {
      if (elements.length > 0) {
        const field = getFieldCallback((id) => elements[id]);
        collectedFields.current.push(field);
        if (lastElementId === field.id) {
          prepareValidateFields(collectedFields.current);
          collectedFields.current = [];
        }
      }
    },
    [elements, lastElementId, prepareValidateFields]
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    event.current = e;
    collectedFields.current = [];
    setElements(e.target.elements);
  };

  const value = {
    errorFields,
    fieldCollector,
  };

  return (
    <FormContextProvider value={value}>
      <form {...props} onSubmit={handleFormSubmit}>
        {children}
      </form>
    </FormContextProvider>
  );
};

export default Form;

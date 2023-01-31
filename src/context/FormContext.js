import { createContext, useContext } from "react";

const FormContext = createContext({
    errorFields: [],
    fieldCollector: () => {},
});

const useFormContext = () => {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};

export { useFormContext };
export const FormContextProvider = FormContext.Provider;

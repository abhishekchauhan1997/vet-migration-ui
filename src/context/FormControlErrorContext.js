import { createContext, useContext } from "react";

const FormControlErrorContext = createContext({
    error: false,
});

const useFormControlErrorContext = () => {
    const context = useContext(FormControlErrorContext);
    if (context === undefined) {
        throw new Error(
            "useFormControlErrorContext must be used within a FormControl"
        );
    }
    return context;
};

export { useFormControlErrorContext };
export const FormControlErrorContextProvider = FormControlErrorContext.Provider;

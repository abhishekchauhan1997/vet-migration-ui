import { createContext, useContext } from "react";

const IntlContext = createContext({
    locale: "en-US",
    messages: [],
});

const useIntlContext = () => {
    const context = useContext(IntlContext);
    if (context === undefined) {
        throw new Error("useIntlContext must be used within a IntlProvider");
    }
    return context;
};

export { useIntlContext };
export const IntlContextProvider = ({ children, locale, messages }) => {
    return (
        <IntlContext.Provider value={{ locale, messages }}>
            {children}
        </IntlContext.Provider>
    );
};

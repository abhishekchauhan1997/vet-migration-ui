import { useCallback } from "react";
import { IntlContextProvider, useIntlContext } from "./IntlContext";
import messageParser from "./messageParser";

const FormattedText = ({ id, values }) => {
    const { messages } = useIntlContext();
    const message = messageParser(id, messages, values);
    return message;
};

const useTranslation = () => {
    const { messages } = useIntlContext();
    const translate = useCallback(
        (id) => {
            const message = messageParser(id, messages);
            return message;
        },
        [messages]
    );
    return { translate };
};

export { IntlContextProvider, useIntlContext, FormattedText, useTranslation };

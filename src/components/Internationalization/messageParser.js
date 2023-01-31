const pluralRule = {
    cardinal: {
        zero: (value) => value === 0,
        plural: (value) => value !== 1,
    },
    ordinal: {
        one: (value) => value % 10 === 1 && value % 100 !== 11,
        two: (value) => value % 10 === 2 && value % 100 !== 12,
        few: (value) => value % 10 === 3 && value % 100 !== 13,
        other: () => true,
    },
};

const pluralFallback = {
    cardinal: {
        zero: "plural",
    },
};

const getPluralSuffix = (value, ordinal = false) => {
    const type = ordinal ? "ordinal" : "cardinal";
    for (let key in pluralRule[type]) {
        if (pluralRule[type][key](value)) {
            return key;
        }
    }
    return null;
};

const getPluralFallbackSuffix = (suffix, ordinal = false) => {
    const type = ordinal ? "ordinal" : "cardinal";
    return pluralFallback?.[type]?.[suffix] ?? null;
};

const getPluralizedMessage = (message, value, id, messages) => {
    let pluralizedMessage = message;
    let interpolationValue = value;
    if ((interpolationValue ?? false)?.constructor?.name === "Object") {
        const { value, ordinal } = interpolationValue;
        const idSuffix = getPluralSuffix(value, ordinal);
        const newId = idSuffix ? `${id}_${idSuffix}` : id;
        if (messages[newId]) {
            pluralizedMessage = messages[newId];
        } else {
            const fallbackSuffix = getPluralFallbackSuffix(idSuffix, ordinal);
            const newId = `${id}_${fallbackSuffix}`;
            pluralizedMessage = messages[newId] ?? message;
        }
        interpolationValue = value;
    }
    return { pluralizedMessage, interpolationValue };
};

// TODO: Improve the replace function with flatten array, to support html entities

const messageParser = (id = "", messages = {}, values = {}) => {
    if (Object.keys(messages).length === 0) return "";

    return Object.keys(values)
        .reduce((newMessage, key) => {
            let message = newMessage;
            let value = values[key];

            const nesting = newMessage
                ?.match(new RegExp(`{(.*?[:] ?{{.*?)( ?}){3}`, "g"))
                ?.find((group) => group.includes(key));
            if (nesting?.length > 0) {
                const [partialId, unParsedValueKey] = nesting
                    ?.replace(/[{} ]/g, "")
                    .split(":");
                const newId = id.replace(/(\.)(?!.*\.).*/, `.${partialId}`);
                const valueKey = unParsedValueKey.replace(/[{}]/g, "");
                const valuesObject = { [valueKey]: values[valueKey] };

                message = message?.replace(
                    new RegExp(nesting),
                    messageParser(newId, messages, valuesObject)
                );
            } else {
                const { pluralizedMessage, interpolationValue } =
                    getPluralizedMessage(message, value, id, messages);

                message = pluralizedMessage;
                value = interpolationValue;
            }

            const pattern = new RegExp(`{{${key}}}`, "g");
            return message?.replace?.(pattern, value ?? "");
        }, messages[id])
        ?.replace(/{{.*}}/g, "");
};

export default messageParser;

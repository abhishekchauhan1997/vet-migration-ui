import Icon from "../../IconComponent";

export const formattingLabel = (format, icon, inputLabel) => {
    const label =
        format || icon ? (
            <span>
                {inputLabel}({format})&nbsp;
                {icon && <Icon type={icon} />}{" "}
            </span>
        ) : (
            inputLabel
        );

    return label;
};

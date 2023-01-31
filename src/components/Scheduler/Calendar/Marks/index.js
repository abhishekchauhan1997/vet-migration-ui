import React from "react";

const Mark = ({
    x = 0,
    y = 0,
    children,
    style = {},
    height = 0,
    width = "100%",
    ...props
}) => {
    return (
        <div
            {...props}
            className={`calendar-mark${
                props?.className ? " " + props.className : ""
            }`}
            style={{
                ...style,
                width,
                height,
                transform: `translate(${x}px, ${y}px)`,
            }}
        >
            {children}
        </div>
    );
};

export { Mark };

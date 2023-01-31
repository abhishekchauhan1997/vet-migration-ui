import React from "react";
import { getPositionDimensionStyles } from "../utils";

const Event = React.forwardRef(
    (
        {
            x = 0,
            y = 0,
            children,
            style = {},
            height = 0,
            width = "100%",
            isPositionVertical = true,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                {...props}
                className={`calendar-event${
                    props?.className ? " " + props.className : ""
                }`}
                style={{
                    ...getPositionDimensionStyles({
                        x,
                        y,
                        width,
                        height,
                        isPositionVertical,
                    }),
                    ...style,
                }}
            >
                {children}
            </div>
        );
    }
);

Event.Head = ({ children, ...props }) => {
    return (
        <div
            {...props}
            className={`calendar-eventHead${
                props?.className ? " " + props.className : ""
            }`}
        >
            {children}
        </div>
    );
};

Event.Body = ({ children, ...props }) => {
    return (
        <div
            {...props}
            className={`calendar-eventBody${
                props?.className ? " " + props.className : ""
            }`}
        >
            {children}
        </div>
    );
};

export { Event };

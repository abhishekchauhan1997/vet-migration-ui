import React from "react";
import classnames from "classnames";
import "./spacer_styles.scss";

const Spacer = ({
    component: Component = "div",
    className,
    children,
    isVertical,
    ...props
}) => {
    return (
        <Component
            {...props}
            className={classnames("des_space", className, {
                vertical: isVertical,
            })}
        >
            {children}
        </Component>
    );
};

export default Spacer;

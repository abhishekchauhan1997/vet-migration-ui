import classnames from "classnames";
import React from "react";

const Chip = ({ children, className, fluid = false, ...props }) => {
    return (
        <div
            {...props}
            className={classnames("des_chip", className, { fluid })}
        >
            {typeof children === "string" ? <p>{children}</p> : children}
        </div>
    );
};

export default Chip;

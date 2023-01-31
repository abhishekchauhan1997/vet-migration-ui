import classnames from "classnames";
import React from "react";

const IconText = ({ children, className, ...props }) => {
    return (
        <p {...props} className={classnames("des_iconText", className)}>
            {children}
        </p>
    );
};

export default IconText;

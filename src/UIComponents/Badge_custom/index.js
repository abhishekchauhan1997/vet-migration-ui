import React from "react";
import classnames from "classnames";

const Badge = ({ children, badgeContent, className, ...props }) => {
  return (
    <>
      <span {...props} className={classnames("des_badgeRoot", className)}>
        {children}
        <span className="des_badge">{badgeContent}</span>
      </span>
    </>
  );
};

export default Badge;

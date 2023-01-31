import React from "react";
import classnames from "classnames";

const Divider = ({ className, ...props }) => {
  return (
    <li
      {...props}
      style={{
        margin: "0px",
        borderBottom: "1px solid #ddd",
      }}
      className={classnames("des_divider", className)}
    ></li>
  );
};

export default Divider;

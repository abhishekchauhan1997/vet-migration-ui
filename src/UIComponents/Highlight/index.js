import React from "react";
import "./highlight_styles.scss";

const Highlight = ({ children }) => {
    return <mark className="text-highlight">{children}</mark>;
};

export default Highlight;

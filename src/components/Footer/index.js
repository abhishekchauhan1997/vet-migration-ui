import React from "react";
import IconText from "UIComponents/IconText";
import Icon from "../IconComponent";

const Footer = () => {
    return (
        <div className="footer">
            <IconText>
                <Icon type="copyright" />{" "}
                <span>{new Date().getFullYear()}</span>
            </IconText>
            <div className="flex mL10"
            >
                <span className="footer_vetport_logo"></span>
                <span className="mL5">
                    VETport LLC. All rights reserved.{" "}
                </span>
            </div>
        </div>
    );
};

export default Footer;

import { HtmlTooltip } from "components/CustomizedToolTip";
import React, { Fragment } from "react";
import IconButton from "UIComponents/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const DescTooltipWithInfo = ({
    title = "Description",
    placement = "left",
    data,
}) => {
    return (
        <div>
            <HtmlTooltip
                arrow
                placement={placement}
                title={
                    <Fragment>
                        <div style={{ padding: "0px" }}>
                            <div
                                style={{
                                    background:
                                        "linear-gradient(85.97deg, #6e8dfb 0%, #52a3ff 100%)",
                                    color: "#fff",
                                    padding: "10px",
                                    fontWeight: 700,
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                    fontSize: "14px",
                                }}
                            >
                                {title}
                            </div>
                            <div
                                style={{
                                    padding: "10px",
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {data}
                            </div>
                        </div>
                    </Fragment>
                }
            >
                <IconButton>
                    <InfoIcon
                        sx={{ fontSize: "18px", cursor: "pointer" }}
                        color={"primary"}
                    />
                </IconButton>
            </HtmlTooltip>
        </div>
    );
};

export default DescTooltipWithInfo;

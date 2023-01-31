import { HtmlTooltip } from "components/CustomizedToolTip";
import InfoIcon from "@mui/icons-material/Info";
import { Fragment } from "react";
import { Box } from "@mui/material";

const DescTooltip = ({ data, placement = "left" }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <HtmlTooltip
                arrow
                placement={placement}
                title={
                    <Fragment>
                        <Box style={{ padding: "0px" }}>
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
                                Description
                            </div>
                            <div style={{ padding: "10px", fontSize: "14PX" }}>
                                {data.desc ?? "No Description Available!!"}
                            </div>
                        </Box>
                    </Fragment>
                }
            >
                <InfoIcon style={{ fontSize: "18px", cursor: "pointer" }} />
            </HtmlTooltip>
            <span style={{ marginLeft: "8px" }}>{data.name}</span>
        </div>
    );
};

export default DescTooltip;

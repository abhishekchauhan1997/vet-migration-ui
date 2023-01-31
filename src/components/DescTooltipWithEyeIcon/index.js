import { HtmlTooltip } from "components/CustomizedToolTip";
import { Fragment } from "react";
import { Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "UIComponents/IconButton";
const DescTooltipWithEyeIcon = ({ data, placement = "left" }) => {
    //**data should be [{name:"some Name", rate:"some rate"},{....},{....}] or { name: "test", rate: 5 } */
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
                                Details
                            </div>
                            {data.length > 0 ? (
                                <div
                                    style={{
                                        padding: "10px",
                                        fontSize: "14PX",
                                        display: "flex",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {data.map((item) => {
                                        return (
                                            <Box
                                                key={item.rate}
                                                style={{ marginRight: "15px" }}
                                            >
                                                <p style={{ fontWeight: 600 }}>
                                                    {item.name ?? "No Name"}
                                                </p>
                                                <p>
                                                    {`${item.rate}%` ??
                                                        "Rate None"}
                                                </p>
                                            </Box>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        padding: "10px",
                                        fontSize: "14PX",
                                    }}
                                >
                                    <p style={{ fontWeight: 600 }}>
                                        {data.name ?? "No Name"}
                                    </p>
                                    <p>{data.rate ?? "Rate Non"}</p>
                                    {/* {data.desc ?? "No Description Available!!"} */}
                                </div>
                            )}
                        </Box>
                    </Fragment>
                }
            >
                <IconButton>
                    <VisibilityIcon
                        sx={{ fontSize: "18px", cursor: "pointer" }}
                        color={"primary"}
                    />
                </IconButton>
            </HtmlTooltip>
            {/* <span style={{ marginLeft: "8px" }}>{data.name}</span> */}
        </div>
    );
};

export default DescTooltipWithEyeIcon;

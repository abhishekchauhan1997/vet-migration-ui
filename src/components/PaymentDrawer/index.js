import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

// * data *
import paymentData from "./data.json";

// * ui elements *
import Drawer from "UIComponents/Drawer";
import Icon from "components/IconComponent";
import { ListItem, ListItemText, Tooltip } from "@mui/material";
import { Close } from "@mui/icons-material";
import List from "UIComponents/List";
import Button from "UIComponents/Button";
import IconButton from "UIComponents/IconButton";

const PaymentDrawer = ({ onClose, openDrawer }) => {
    // local state
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = paymentData;
        setData(data);
    }, []);

    const { data: paymentItems } = data ?? {};

    return (
        <Drawer
            isOpen={openDrawer}
            onClose={onClose}
            className="maxVH overflow-auto"
        >
            <List>
                <ListItem
                    className="w100 pt8"
                    secondaryAction={
                        <Close
                            edge="end"
                            style={{ color: "#616886" }}
                            className="curP"
                            onClick={onClose}
                        />
                    }
                ></ListItem>
            </List>

            <List>
                {paymentItems?.map((paymentDataItem) => (
                    <PaymentItem
                        key={paymentDataItem.id}
                        paymentData={paymentDataItem}
                        onClose={onClose}
                    />
                ))}
            </List>
        </Drawer>
    );
};

export default PaymentDrawer;

const PaymentItem = ({ paymentData, onClose }) => {
    const iconActionMapping = useMemo(
        () => ({
            mail: () => {
                onclose();
            },
        }),
        []
    );

    if (paymentData.type === "export") {
        return (
            <ListItem>
                <ListItemText
                    primary={paymentData.label}
                    primaryTypographyProps={{
                        fontSize: 14,
                        color: "#596284",
                        cursor: "default",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "30%",
                    }}
                >
                    {paymentData?.data?.map((exportItem) =>
                        exportItem.link ? (
                            <Link
                                to={exportItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                            >
                                <Tooltip
                                    arrow
                                    title={exportItem.label}
                                    key={exportItem.id}
                                >
                                    <IconButton
                                        onClick={
                                            iconActionMapping[exportItem.icon]
                                        }
                                        size={"medium"}
                                    >
                                        <Icon type={exportItem.icon} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        ) : (
                            <Tooltip
                                arrow
                                title={exportItem.label}
                                key={exportItem.id}
                            >
                                <IconButton
                                    onClick={iconActionMapping[exportItem.icon]}
                                    size={"medium"}
                                >
                                    <Icon type={exportItem.icon} />
                                </IconButton>
                            </Tooltip>
                        )
                    )}
                </div>
            </ListItem>
        );
    }

    return (
        <Link
            to={paymentData.path}
            onClick={onClose}
            state={paymentData.state ?? null}
        >
            <ListItem>
                <ListItemText
                    primary={paymentData.label}
                    primaryTypographyProps={{
                        fontSize: 14,
                        color: "#596284",
                        cursor: "default",
                    }}
                />

                <Button style={{ width: "30%" }}>
                    {paymentData.type === "currencyLink" ? "$ " : ""}
                    {paymentData.data}
                </Button>
            </ListItem>
        </Link>
    );
};

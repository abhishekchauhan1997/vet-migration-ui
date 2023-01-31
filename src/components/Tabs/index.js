import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
};

const a11yProps = (index) => {
    return {
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
    };
};

export default function TabsComponent({
    orientation,
    variant,
    tab = [],
    tabPanel = [],
}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                ...(orientation === "vertical" && {
                    flexGrow: 1,
                    display: "flex",
                    bgcolor: "background.paper",
                }),
            }}
        >
            <Tabs
                orientation={orientation}
                variant={variant}
                value={value}
                onChange={handleChange}
                aria-label="tabs"
                sx={{
                    ...(orientation === "vertical"
                        ? { borderRight: 1 }
                        : { borderBottom: 1 }),
                    borderColor: "divider",
                }}
            >
                {tab &&
                    tab.length !== 0 &&
                    tab.map((item, index) => (
                        <Tab
                            key={index}
                            label={item.label}
                            {...a11yProps(index)}
                        />
                    ))}
            </Tabs>
            {tabPanel &&
                tabPanel.length !== 0 &&
                tabPanel.map((item, index) => (
                    <TabPanel
                        key={index}
                        value={value}
                        index={index}
                        children={item.children}
                    ></TabPanel>
                ))}
        </Box>
    );
}

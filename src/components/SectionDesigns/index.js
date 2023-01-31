import { Grid, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Card from "UIComponents/Card";
import Paper from "UIComponents/Paper";

const SectionDesign = ({ title, list = [], index }) => {
    return (
        <Paper key={index}>
            <Card sx={{ backgroundColor: "#1d2545" }}>
                <Grid>
                    <p
                        style={{
                            fontSize: "17px",
                            fontWeight: 600,
                            color: "#fff",
                            textTransform: "uppercase",
                        }}
                    >
                        {title}
                    </p>
                </Grid>
            </Card>
            <Grid sx={{ padding: "10px 20px", fontSize: "14px" }}>
                <Stack spacing={1}>
                    {list?.map((item) => (
                        <Link
                            key={item.id}
                            to={item?.goto ?? "#"}
                            style={{ color: "#0000EE " }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </Stack>
            </Grid>
        </Paper>
    );
};

export default SectionDesign;

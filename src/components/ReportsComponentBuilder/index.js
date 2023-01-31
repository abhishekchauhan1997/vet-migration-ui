import React, { useCallback, useMemo } from "react";

import { Grid } from "@mui/material";
import Card from "UIComponents/Card";
import SectionDesign from "components/SectionDesigns";

const ReportsComponentBuilder = ({ title, list = [], slice = 2 }) => {
    const getCellSection = (data) => {
        return data
            ?.sort((a, b) => a.order - b.order)
            ?.map((item, index) => (
                <Grid item xs={12} key={index}>
                    <SectionDesign
                        index={index}
                        title={item.title}
                        list={item.items}
                    />
                </Grid>
            ));
    };

    const getColumnSection = () => {
        let nodes = [];
        const nodeSection = (breakpoint = 6, column, index) => {
            return (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={breakpoint}
                    container
                    spacing={1}
                    key={index}
                >
                    {column.length > 0 && getCellSection(column)}
                </Grid>
            );
        };

        for (let index = 0; index < slice; index++) {
            let breakPoint = Math.ceil(12 / slice);
            nodes.push(nodeSection(breakPoint, slicedCols[index], index));
        }
        return nodes;
    };

    const slicingListIntoCols = useCallback(() => {
        if (list?.length > 0) {
            let range = Math.ceil(list.length / slice);
            let startIndex = 0;
            let endIndex = range;
            let columns = {};
            for (let index = 0; index < slice; index++) {
                columns = {
                    ...columns,
                    [index]: list.slice(startIndex, endIndex),
                };
                startIndex = startIndex + range;
                endIndex = endIndex + range;
            }
            return columns;
        }
    }, [list, slice]);

    const slicedCols = useMemo(() => {
        return slicingListIntoCols();
    }, [slicingListIntoCols]);

    return (
        <>
            <Card sx={{ mb: 2 }}>
                <Grid>
                    <p
                        style={{
                            fontSize: "17px",
                            fontWeight: 600,
                        }}
                    >
                        {title}
                    </p>
                </Grid>
            </Card>

            {list?.length > 0 && (
                <Grid container spacing={1}>
                    {getColumnSection()}
                </Grid>
            )}
        </>
    );
};

export default ReportsComponentBuilder;

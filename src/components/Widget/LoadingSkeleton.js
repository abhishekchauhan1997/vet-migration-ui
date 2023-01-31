import { Grid, Skeleton } from "@mui/material";
import Card from "UIComponents/Card";

const CpWidgetLoadingSkeleton = ({ widgetType }) => {
    return (
        <>
            {(widgetType === "cpWidgetClient" ||
                widgetType === "otcWidget") && (
                <Card>
                    <Grid container>
                        <Grid item xs={12} sx={{ padding: "8px" }}>
                            <Skeleton
                                sx={{ width: "70%" }}
                                animation="wave"
                                variant="rectangular"
                                height={25}
                            />
                        </Grid>
                    </Grid>
                </Card>
            )}
            {widgetType === "cpWidget" && (
                <>
                    <Card>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Skeleton
                                    sx={{ width: "70%" }}
                                    animation="wave"
                                    variant="rectangular"
                                    height={25}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton
                                    sx={{ width: "70%" }}
                                    height={25}
                                    animation="wave"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton
                                    height={30}
                                    animation="wave"
                                    variant="rectangular"
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </>
            )}
        </>
    );
};

export default CpWidgetLoadingSkeleton;

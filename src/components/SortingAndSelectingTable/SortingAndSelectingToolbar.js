import DeleteIcon from "@mui/icons-material/Delete";
import {
    alpha,
    createTheme,
    IconButton,
    ThemeProvider,
    Toolbar as MuiToolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { Fragment } from "react";

const SortingAndSelectingTableToolbar = ({
    numSelected,
    component,
    handleClickHandler,
    showDeleteIcon,
}) => {
    const theme = createTheme({
        components: {
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        minHeight:
                            (!component && numSelected > 0 && "56px") ||
                            (!component && "0px !important") ||
                            "56px",
                    },
                },
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <MuiToolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity
                            ),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Fragment>
                        {showDeleteIcon && numSelected > 0 && (
                            <Tooltip
                                title="Delete"
                                onClick={handleClickHandler}
                            >
                                <IconButton
                                    sx={{ padding: "0px" }}
                                    disableRipple
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Typography
                            sx={{ flex: "1 1 100%", marginLeft: "8px" }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            {numSelected} selected
                        </Typography>
                    </Fragment>
                ) : (
                    component
                )}
            </MuiToolbar>
        </ThemeProvider>
    );
};

export default SortingAndSelectingTableToolbar;

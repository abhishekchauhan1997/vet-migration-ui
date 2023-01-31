import { Box, Divider, IconButton, MenuItem, MenuList } from "@mui/material";
import React, { useState } from "react";
import { StyledMenu } from "UIComponents/CustomMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormControlLabel from "components/GenForm/FormControlLabel";
import Checkbox from "components/GenForm/Checkbox";

const PatientDropDown = ({
    activeItems,
    inactiveItems,
    showIcon = false,
    endIcon = false,
    fieldDetails,
    handlePatientClick,
    ...props
}) => {
    let ITEM_HEIGHT = 32;
    const [anchorEl, setAnchorEl] = useState(null);
    const [showInactive, setShowInactive] = useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setShowInactive(false);
    };

    const handleMenuItemClick = (id) => {
        handlePatientClick(id);
        handleClose();
    };

    const getMenuItems = (data = []) => {
        return data?.map((item, index) => (
            <Box key={item?._id} sx={{ height: "32px" }}>
                <MenuItem
                    dense={true}
                    onClick={() => handleMenuItemClick(item?._id)}
                    disableRipple
                    disableGutters
                    sx={{
                        pl: "8px",
                        textTransform: "capitalize",
                        color:
                            item.status === 2
                                ? "#df514c"
                                : item.status === 3
                                ? "#bd0000"
                                : "#3b4468",
                    }}
                >
                    {item?.name} ({item.patientNo ?? 25})
                </MenuItem>
                {index < data.length - 1 && (
                    <Divider
                        style={{
                            marginBottom: 0,
                            marginTop: 0,
                        }}
                    />
                )}
            </Box>
        ));
    };

    return (
        <Box>
            <IconButton
                id={props.id}
                aria-controls={open ? "patient-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                // disableElevation
                onClick={handleClick}
                style={{
                    marginLeft: "-1px",
                    marginRight: "4px",
                    padding: 0,
                }}
                {...props}
            >
                {
                    <KeyboardArrowDownIcon
                        style={{
                            marginTop: "-1px",
                        }}
                    />
                }
            </IconButton>
            <StyledMenu
                id="customized-menu"
                MenuListProps={{
                    "aria-labelledby": "customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 6.5,
                        width: "40ch",
                    },
                }}
            >
                <MenuList>
                    {activeItems?.length !== 0 && getMenuItems(activeItems)}
                    {inactiveItems?.length > 0 && (
                        <Box>
                            <MenuItem>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={showInactive ?? false}
                                            onChange={(e) =>
                                                setShowInactive(
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    }
                                    label={fieldDetails?.label}
                                />
                            </MenuItem>
                        </Box>
                    )}
                    {showInactive && getMenuItems(inactiveItems)}
                </MenuList>
            </StyledMenu>
        </Box>
    );
};

export default PatientDropDown;

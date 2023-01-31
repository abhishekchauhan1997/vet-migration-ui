import React, { useContext, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import RealTimeClock from "../Utility/RealTimeClock";
import Search from "../Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import {
    avatarName,
    hideScrollBar,
    removeItemLocal,
    removeItemSession,
    showScrollBar,
} from "utils/appUtils";
import { ButtonGroup, IconButton, Tooltip, Zoom } from "@mui/material";
import CustomizedBadges from "UIComponents/StyledBadge";
import SideNavigationMenu from "../SideNavigationMenu";
import ProfileNavMenuBar from "../ProfileNavMenuBar";
import Navbar from "../Navbar";
import ResNavbar from "../Navbar/ResNavbar";
import ClinicDrawer from "../ClinicDrawer";
import { API_BASEURL, API_ENABLED, screens } from "utils/constants";
import Button from "UIComponents/Button";
import usePageDataContext from "hooks/usePageDataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "hooks/useAuth";
import { PermissionContext } from "context/permissionContext";
import useSessionContext from "hooks/useSessionContext";

const Header = () => {
    const navigate = useNavigate();
    const { loginStatus } = useAuth();
    const { width } = usePageDataContext();
    const {
        clinic,
        provider,
        setSessionData,
        setWidgetType,
        setPatient,
        setClinic,
        setProvider,
        setClient,
    } = useSessionContext();

    const { setLoggedIn } = useContext(PermissionContext);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
    const [openClinicDrawer, setOpenClinicDrawer] = useState(false);
    const searchRef = useRef("");

    const handleLogout = () => {
        if (API_ENABLED) {
            axios
                .get(`${API_BASEURL}/logout`)
                .then((response) => {
                    loginStatus(false);
                    navigate("/login");
                    removeItemLocal("user_details");
                    removeItemSession("session");
                    setLoggedIn(false);
                    setSessionData({});
                    setWidgetType(null);
                    setClient(null);
                    setPatient(null);
                    setClinic(null);
                    setProvider(null);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            loginStatus(false);
            navigate("/login");
        }
    };

    const handleSearch = () => {
        if (searchRef?.current?.value?.length === 0) return;
        navigate("/client_patient_search", {
            state: { query: searchRef?.current?.value },
        });
        searchRef.current.value = "";
    };

    return (
        <header className="header font_clrTheme">
            <div className="flexC">
                <IconButton
                    className="menu_bar"
                    sx={{ marginLeft: "-10px" }}
                    aria-label="Hamburger menu icon"
                    onClick={() => setOpenDrawer(!openDrawer)}
                >
                    <MenuIcon
                        id="sideNavigation"
                        className="font_clrTheme bold"
                    />
                </IconButton>
                <div className="flexC" id="logo_typo">
                    <Button
                        variant="text"
                        sx={{ padding: "5px", textTransform: "capitalize" }}
                        onClick={() => setOpenClinicDrawer(!openClinicDrawer)}
                        className="typography curP typo_logo bold typo"
                    >
                        {clinic?.name}
                    </Button>
                    <ClinicDrawer
                        onClose={() => setOpenClinicDrawer(false)}
                        openDrawer={openClinicDrawer}
                        clinicId={clinic?._id}
                    />
                    <RealTimeClock className="typography curP clock" />
                </div>
                {width >= screens.desktop && <Navbar />}
                <div className="rightContentContainer flex justifyE">
                    {width >= screens.tablet && (
                        <Search
                            id="search_bar"
                            inputRef={searchRef}
                            handleSearch={handleSearch}
                        />
                    )}
                    <div className="flexC actions_group_header">
                        <Tooltip
                            title={
                                <a href="/home">
                                    Coming Soon! Whiteboard Layout Revision
                                </a>
                            }
                            arrow
                            TransitionComponent={Zoom}
                            placement="bottom-start"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        bgcolor: "blue",
                                        height: "34px",
                                        display: "flex",
                                        background:
                                            "linear-gradient(89.28deg, #6E8DFB 0%, #52A3FF 100%)",
                                        boxShadow:
                                            "0px 4px 10px rgba(0, 0, 0, 0.05)",
                                        borderRadius: "3px",
                                        alignItems: "center",
                                        fontSize: "15px",
                                        fontWeight: "medium",
                                        transformOrigin: "right top !important",
                                        "& .MuiTooltip-arrow": {
                                            color: "#6E8DFB",
                                            boxShadow:
                                                "0px -4px 15px rgba(0, 0, 0, 0.15)",
                                        },
                                    },
                                },
                            }}
                        >
                            <IconButton
                                className="notify_icon"
                                aria-label="Notification bell icon"
                            >
                                <CustomizedBadges
                                    variant="dot"
                                    childern={
                                        <NotificationsOutlinedIcon className="font_clrTheme" />
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                        <ButtonGroup
                            disableElevation
                            variant="contained"
                            className="flexC curP h30"
                        >
                            <Button
                                style={{
                                    borderRight: "0px",
                                    minHeight: "100%",
                                }}
                                onClick={() => {
                                    hideScrollBar();
                                    setOpenProfileDrawer(!openProfileDrawer);
                                }}
                            >
                                {avatarName(
                                    `${provider?.firstName ?? ""} ${
                                        provider?.lastName ?? ""
                                    }`
                                )}
                            </Button>
                            <ProfileNavMenuBar
                                onClose={() => {
                                    showScrollBar();
                                    setOpenProfileDrawer(false);
                                }}
                                openDrawer={openProfileDrawer}
                            />
                            <Button
                                variant="text"
                                className="logout_icon border"
                                aria-label="Logout icon"
                                onClick={handleLogout}
                            >
                                <PowerSettingsNewOutlinedIcon
                                    sx={{ color: "#FF4500" }}
                                />
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            {width < screens.desktop && (
                <div className="flexC res_nav">
                    {width < screens.tablet && (
                        <Search
                            id="res_search_bar"
                            inputRef={searchRef}
                            handleSearch={handleSearch}
                        />
                    )}
                    <ResNavbar width={width} />
                </div>
            )}
            <SideNavigationMenu
                title={clinic?.name}
                openDrawer={openDrawer}
                onClose={() => setOpenDrawer(false)}
                openClinic={() => setOpenClinicDrawer(true)}
            />
        </header>
    );
};

export default Header;

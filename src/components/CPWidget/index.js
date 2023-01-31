import React, { forwardRef, useEffect, useMemo, useState } from "react";
import {
    Badge,
    Button,
    Grid,
    IconButton,
    Link,
    Card,
    Typography,
    Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmailIcon from "@mui/icons-material/Email";
import Data from "./data.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PatientDrawer from "../PatientDrawer";
import PaymentDrawer from "components/PaymentDrawer";
import { NavLink as RouterNavLink } from "react-router-dom";
import useGetPageDataContext from "hooks/usePageDataContext";
import ChangeProviderModal from "./ProviderModal";
import useSessionContext from "hooks/useSessionContext";
import dayjs from "dayjs";
import PatientDropDown from "./PatientDropDown";
import CustomizedMenus from "UIComponents/CustomMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SmsWidgetModal from "components/SmsWidgetModal";
import useSessionOverwrite from "hooks/useSessionOverwrite";
import { useSmsModal } from "components/SmsWidgetModal/hooks";

const theme = createTheme({
    typography: {
        fontSize: 13,
        fontWeightMedium: 600,
    },
    components: {
        MuiGrid: {
            styleOverrides: {
                item: {
                    "&>*": {
                        marginRight: "0px !important",
                        "&:last-child": {
                            marginRight: "0 !important",
                        },
                    },
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    right: "-5px",
                    height: "18px",
                    fontSize: "11px",
                    minWidth: "16px",
                    paddingInline: "4px",
                    border: "2px solid #fff",
                    backgroundImage:
                        "linear-gradient(39.81deg, #FF4500 26.89%, #FF7846 73.11%)",
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: "#3b4468",
                    "&.cartIcon": {
                        color: "#ffa000",
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#3b4468",
                },
                subtitle2: {
                    "&.red": {
                        color: "#E8363F",
                    },
                    "&.green": {
                        color: "#0B6720",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                text: {
                    minWidth: 0,
                    borderRadius: 3,
                    padding: "2px 5px",
                },
            },
        },
    },
});

const NavLink = forwardRef((props, ref) => (
    <RouterNavLink
        ref={ref}
        to={props.to}
        state={props.state}
        className={({ isActive }) =>
            `${props.className} ${isActive ? props.activeClassName : ""}`
        }
    >
        {props.children}
    </RouterNavLink>
));

const CPWidget = () => {
    const {
        setOpenClientDrawer,
        setOpenPatientDrawer,
        openPatientDrawer,
        setClientDrawerSessionId,
        setPatientDrawerSessionId,
        openProviderModal,
        setOpenProviderModal,
        setPatientDrawerData,
    } = useGetPageDataContext();
    const { encounter, patient, client } = useSessionContext();
    const { handlePatientClickFun } = useSessionOverwrite();
    const {
        handlePnumberClick,
        onClose,
        phonetype,
        openSmsModal,
        setOpenSmsModal,
        setPhoneType,
    } = useSmsModal();
    const [data, setData] = useState({});
    const [openPaymentDrawer, setOpenPaymentDrawer] = useState(false);
    const {
        encounters = [],
        title = "",
        fieldDetails = {},
        actionLabels = {},
    } = data ?? {};

    let activeClassName = "cpWidget_encounterMenuBorder";

    const togglePaymentDrawer = () => {
        setOpenPaymentDrawer(!openPaymentDrawer);
    };

    const handlePatientClick = (id) => {
        setPatientDrawerData({});
        setPatientDrawerSessionId(null);
        handlePatientClickFun(id);
    };

    const pnumbers = useMemo(
        () =>
            client?.phone?.map((x) => ({
                ...x,
                name: x.pnumber,
                disabled: x.sms === 8 ? true : false,
            })),
        [client?.phone]
    );
    const memoziedAge = useMemo(() => {
        // Jan 23 2021(1 Yr - 9 Mo)
        if (patient?.dob) {
            const date1 = dayjs();
            const date2 = dayjs(patient?.dob);
            let mo = date1.diff(date2, "month");
            let yr = date1.diff(date2, "y");
            mo = mo - 12 * yr;
            let dob = date2.format(patient?.dobFormat ?? "MMM DD YYYY");
            return `${dob} (${yr < 0 ? 0 : yr} Yr - ${mo < 0 ? 0 : mo} Mo)`;
        }
    }, [patient?.dob, patient?.dobFormat]);

    const memoziedWt = useMemo(() => {
        // 0.0 Lb (0.0 Kg)
        if (patient?.wt) {
            let formatWt = "";
            for (const key in patient?.wt) {
                if (["lb", "oz"].includes(key))
                    formatWt = `${patient?.wt[key]?.toFixed(
                        1
                    )} ${key}${formatWt}`;
                else
                    formatWt = `${formatWt} (${patient?.wt[key]?.toFixed(
                        1
                    )} ${key})`;
            }
            return formatWt;
        }
    }, [patient?.wt]);

    const activePatients = useMemo(() => {
        if (patient?.patients?.length > 0) {
            return patient?.patients?.filter((item) => item.status === 1);
        }
    }, [patient?.patients]);

    const inactivePatients = useMemo(() => {
        if (patient?.patients?.length > 0) {
            return patient?.patients?.filter(
                (item) => item.status === 2 || item.status === 3
            );
        }
    }, [patient?.patients]);

    useEffect(() => {
        const data = Data;
        setData(data);
    }, []);

    useEffect(() => {
        if (client?.phone?.length > 0) {
            let item = client?.phone?.find((item) => item.isDefault === 1);
            setPhoneType(item);
        }
    }, [client?.phone, setPhoneType]);

    return (
        <ThemeProvider theme={theme}>
            {client?._id && (
                <Card elevation={0} className="cpWidget_client">
                    <Grid container className="posrel">
                        <Grid
                            item
                            xs={12}
                            className="flex aiBaseline cpWidget_clientWidget cpwidget_gap"
                        >
                            <Button
                                onClick={() => {
                                    setClientDrawerSessionId(client?._id);
                                    setOpenClientDrawer(true);
                                }}
                                variant="text"
                                className="text-capitalize"
                                sx={{ marginLeft: "-5px" }}
                            >
                                <Typography
                                    component="p"
                                    className="cpWidget_fontTypo text-ellipsis"
                                    variant="subtitle2"
                                >
                                    {client.firstName}&nbsp;
                                    {client.lastName}({client.clientNo ?? 10})
                                </Typography>
                            </Button>

                            {phonetype?.sms === 7 &&
                            client?.smsDecline === 8 ? (
                                <Button
                                    variant="text"
                                    onClick={() => setOpenSmsModal(true)}
                                >
                                    <Typography
                                        component="p"
                                        className="cpWidget_fontTypo text-ellipsis"
                                        variant="subtitle2"
                                    >
                                        {phonetype?.pnumber}
                                    </Typography>
                                </Button>
                            ) : (
                                <Typography
                                    component="p"
                                    className="cpWidget_fontTypo text-ellipsis"
                                    variant="subtitle2"
                                >
                                    {phonetype?.pnumber}
                                </Typography>
                            )}
                            {client?.smsDecline === 8 &&
                                pnumbers &&
                                pnumbers?.length > 0 && (
                                    <CustomizedMenus
                                        component={IconButton}
                                        style={{
                                            marginLeft: "-4px",
                                            padding: 0,
                                        }}
                                        id="pnumber-dropdown-menu"
                                        items={pnumbers}
                                        handleItemClick={handlePnumberClick}
                                        children={
                                            <KeyboardArrowDownIcon
                                                style={{
                                                    marginTop: "-1px",
                                                }}
                                            />
                                        }
                                    />
                                )}
                            <Link className="cpWidget_fontTypo" href={`/email`}>
                                <IconButton aria-label="email">
                                    <EmailIcon
                                        className="cpWidget_iconfontSize"
                                        fontSize="small"
                                    />
                                </IconButton>
                            </Link>
                            <Button
                                onClick={togglePaymentDrawer}
                                variant="text"
                            >
                                <Typography
                                    component="p"
                                    variant="subtitle2"
                                    className={`cpWidget_fontTypo text-ellipsis 
                                            ${
                                                client?.balance?.amount < 0
                                                    ? "green"
                                                    : "red"
                                            }`}
                                >
                                    $&nbsp;
                                    {client?.balance?.amount
                                        ? client?.balance?.amount
                                        : 0}
                                </Typography>
                            </Button>

                            <PaymentDrawer
                                openDrawer={openPaymentDrawer}
                                onClose={togglePaymentDrawer}
                            />

                            <IconButton
                                to={"/cart"}
                                component={NavLink}
                                aria-label="cart"
                                sx={{ placeSelf: "center" }}
                            >
                                <Badge
                                    color="secondary"
                                    badgeContent={
                                        client?.cartCount
                                            ? client?.cartCount
                                            : "0"
                                    }
                                >
                                    <ShoppingCartIcon
                                        fontSize="small"
                                        className="cartIcon cpWidget_iconfontSize"
                                    />
                                </Badge>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Card>
            )}
            {patient?._id && (
                <Card elevation={0} className="cpWidget_patient">
                    <Grid container className="posrel">
                        <>
                            <div className="cpWidget_patientWidget cpwidget_gap">
                                <div className="flex aiBaseline mR8">
                                    <Button
                                        variant="text"
                                        className="taL text-capitalize"
                                        sx={{ marginLeft: "-5px" }}
                                        onClick={() => {
                                            setPatientDrawerSessionId(
                                                patient?._id
                                            );
                                            setOpenPatientDrawer(
                                                !openPatientDrawer
                                            );
                                        }}
                                    >
                                        <Typography
                                            component="span"
                                            className="cpWidget_fontTypo text-ellipsis"
                                            variant="subtitle2"
                                        >
                                            {patient?.name} (
                                            {patient.patientNo ?? 25})
                                        </Typography>
                                    </Button>

                                    {(activePatients?.length > 0 ||
                                        inactivePatients?.length > 0) && (
                                        <PatientDropDown
                                            id="patient-dropdown-menu"
                                            activeItems={activePatients}
                                            inactiveItems={inactivePatients}
                                            fieldDetails={
                                                fieldDetails?.showInactive
                                            }
                                            handlePatientClick={
                                                handlePatientClick
                                            }
                                        />
                                    )}
                                    <PatientDrawer
                                        openDrawer={openPatientDrawer}
                                        onClose={() =>
                                            setOpenPatientDrawer(false)
                                        }
                                    />
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className="cpWidget_fontTypo text-ellipsis"
                                    >
                                        {patient?.species?.name}{" "}
                                        {patient?.breed?.name &&
                                            ` - ${patient?.breed?.name}`}{" "}
                                        {patient?.sex?.name &&
                                            ` - ${patient?.sex?.name}`}
                                    </Typography>
                                </div>

                                <div className="flex aiBaseline">
                                    {patient?.dob && (
                                        <Typography
                                            component="p"
                                            variant="body2"
                                            className="cpWidget_fontTypo text-ellipsis"
                                        >
                                            {memoziedAge ?? ""}
                                        </Typography>
                                    )}

                                    <Box width={10} />

                                    <div>
                                        <Button
                                            to="/vital_history_page"
                                            activeClassName={activeClassName}
                                            variant="text"
                                            component={NavLink}
                                            sx={{ textTransform: "capitalize" }}
                                        >
                                            <Typography
                                                component="span"
                                                className="cpWidget_fontTypo text-ellipsis"
                                            >
                                                {memoziedWt ?? "0.0 Lb (0.0Kg)"}
                                            </Typography>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="cpWidget_encounterWidget">
                                <div className="cpWidget_emrBlock">
                                    <div>
                                        <Button
                                            to="/emr_page"
                                            activeClassName={activeClassName}
                                            component={NavLink}
                                            variant="text"
                                            sx={{
                                                marginLeft: "-5px",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            <Typography
                                                component="span"
                                                className="cpWidget_subtitle text-ellipsis"
                                            >
                                                {encounter?.name ??
                                                    "Patient Health Record"}
                                            </Typography>
                                        </Button>
                                    </div>
                                    {encounter?.provider?._id && (
                                        <Button
                                            variant="text"
                                            onClick={() =>
                                                setOpenProviderModal(true)
                                            }
                                        >
                                            <Typography
                                                component="span"
                                                className="cpWidget_subtitle text-ellipsis text-capitalize"
                                            >
                                                {encounter?.provider?.firstName}
                                                &nbsp;
                                                {encounter?.provider?.lastName}
                                            </Typography>
                                        </Button>
                                    )}
                                </div>
                                <div className="cpWidget_encounterMenu">
                                    {encounters.map((item, index) => (
                                        <div key={item.title}>
                                            <Button
                                                component={NavLink}
                                                to={item.path}
                                                activeClassName={
                                                    activeClassName
                                                }
                                                sx={{
                                                    textTransform: "capitalize",
                                                }}
                                                state={item.state ?? null}
                                                variant="text"
                                            >
                                                <Typography
                                                    component="span"
                                                    className="cpWidget_subtitle text-ellipsis"
                                                >
                                                    {item.title}
                                                </Typography>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    </Grid>
                </Card>
            )}
            <ChangeProviderModal
                title={title}
                provider={{
                    _id: encounter?.provider?._id,
                    name: `${encounter?.provider?.firstName} ${encounter?.provider?.lastName}`,
                }}
                fieldDetails={fieldDetails}
                dialogLabels={actionLabels}
                open={openProviderModal}
                onClose={() => setOpenProviderModal(false)}
            />
            <SmsWidgetModal
                open={openSmsModal}
                onClose={onClose}
                phonetype={phonetype}
            />
        </ThemeProvider>
    );
};

export default CPWidget;

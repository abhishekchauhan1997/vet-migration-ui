import Drawer from "UIComponents/Drawer";
import clientDetails from "dummyData/clientData.json";
import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Skeleton,
} from "@mui/material";
import { Close, Email, PhoneAndroid } from "@mui/icons-material";
import List from "UIComponents/List";
import ImageIcon from "@mui/icons-material/Image";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import Button from "UIComponents/Button";
import TableContainer from "UIComponents/Table";
import { TableCellData, TableHeader } from "../TableUtility";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetPageDataContext from "hooks/usePageDataContext";
import axios from "axios";
import { API_BASENAME, API_BASEURL } from "utils/constants";
import Menu from "components/SideNavigationMenu/Menu";
import FormControlLabel from "components/GenForm/FormControlLabel";
import Checkbox from "components/GenForm/Checkbox";
import useSessionContext from "hooks/useSessionContext";
import useSessionOverwrite from "hooks/useSessionOverwrite";
import { useSmsModal } from "components/SmsWidgetModal/hooks";
import SmsWidgetModal from "components/SmsWidgetModal";

const columns = [
    { id: "patient", label: "Patient", minWidth: 200 },
    { id: "species", label: "Species", minWidth: 200 },
];
const TableContent = ({ patients, handlePatientClick }) => {
    return (
        <TableContainer>
            <TableContainer.Table stickyHeader aria-label="client_table">
                <TableHeader cols={columns} className="cell_padd" />
                <TableContainer.TableBody>
                    {patients.map((row) => {
                        return (
                            <TableContainer.TableRows key={row._id}>
                                <TableCellData
                                    children={
                                        <p
                                            onClick={() =>
                                                handlePatientClick(row)
                                            }
                                        >
                                            {row.name} ({row.patientNo ?? 11})
                                        </p>
                                    }
                                    className="cell_padd"
                                    action={true}
                                />
                                <TableCellData
                                    children={row.species}
                                    className="cell_padd"
                                    action={false}
                                />
                            </TableContainer.TableRows>
                        );
                    })}
                </TableContainer.TableBody>
            </TableContainer.Table>
        </TableContainer>
    );
};
const ClientDrawer = () => {
    const navigate = useNavigate();
    const { openClientDrawer, setOpenClientDrawer, clientDrawerSessionId } =
        useGetPageDataContext();
    const { client } = useSessionContext();
    const { handlePatientClickFun } = useSessionOverwrite();
    const { handlePnumberClick, openSmsModal, onClose, phonetype } =
        useSmsModal();
    const [clientDrawerData, setClientDrawerData] = useState({});
    const [data, setData] = useState([]);
    const [showInactive, setShowInactive] = useState(false);

    const getClientDataById = useCallback(async (id) => {
        try {
            let { data } = await axios.get(
                `${API_BASEURL}${API_BASENAME}/client/registration/fetch/dashboard/${id}`
            );
            setClientDrawerData(data[0]);
        } catch (err) {
            throw new Error(err);
        }
    }, []);
    const handleClose = () => {
        setOpenClientDrawer(false);
    };

    const handlePatientClick = (row) => {
        setOpenClientDrawer(false);
        handlePatientClickFun(row?._id);
    };

    const activePatients = useMemo(() => {
        if (clientDrawerData?.patients?.length > 0) {
            return clientDrawerData?.patients?.filter(
                (item) => item.status === 1
            );
        }
    }, [clientDrawerData?.patients]);

    const inactivePatients = useMemo(() => {
        if (clientDrawerData?.patients?.length > 0) {
            return clientDrawerData?.patients?.filter(
                (item) => item.status === 2 || item.status === 3
            );
        }
    }, [clientDrawerData?.patients]);

    useEffect(() => {
        const data = clientDetails;
        setData(data);
    }, []);

    useEffect(() => {
        if (clientDrawerSessionId) getClientDataById(clientDrawerSessionId);
    }, [clientDrawerSessionId, getClientDataById]);

    return (
        <>
            <Drawer
                isOpen={openClientDrawer}
                onClose={handleClose}
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
                                onClick={handleClose}
                            />
                        }
                    ></ListItem>
                    <List.Item>
                        {clientDrawerData?.profileUrl && (
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                        )}
                        <ListItemText
                            primary={
                                clientDrawerData?._id ? (
                                    `${clientDrawerData?.firstName} ${clientDrawerData?.lastName}`
                                ) : (
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                        sx={{ fontSize: "2rem" }}
                                        width="180px"
                                    />
                                )
                            }
                            primaryTypographyProps={{
                                color: "#3B4468",
                                fontWeight: "bold",
                                fontSize: "20px",
                                textTransform: "capitalize",
                            }}
                            onClick={() => {
                                handleClose();
                                navigate(`/client_profile/${client?._id}`);
                            }}
                        />
                    </List.Item>
                    {clientDrawerData?.phone?.length > 0 ? (
                        clientDrawerData?.phone?.map((item, index) => (
                            <List.Item key={index} sx={{ cursor: "default" }}>
                                <ListItemIcon className="minW20">
                                    <PhoneAndroid
                                        style={{
                                            width: "13px",
                                            height: "13px",
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <p>
                                            {item?.pnumber}&nbsp;{" "}
                                            {item?.phoneType}
                                            &nbsp;
                                            {clientDrawerData?.smsDecline ===
                                                8 &&
                                                item?.sms === 7 && (
                                                    <b
                                                        onClick={() =>
                                                            handlePnumberClick(
                                                                item
                                                            )
                                                        }
                                                        style={{
                                                            textTransform:
                                                                "uppercase",
                                                            color: "#1E88E5",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        SMS
                                                    </b>
                                                )}
                                        </p>
                                    }
                                    primaryTypographyProps={{
                                        color: "#797F9A",
                                        fontWeight: "medium",
                                        fontSize: "13px",
                                    }}
                                ></ListItemText>
                            </List.Item>
                        ))
                    ) : (
                        <List.Item>
                            <ListItemIcon className="minW20">
                                <PhoneAndroid
                                    style={{ width: "13px", height: "13px" }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                        sx={{ fontSize: "1rem" }}
                                        width="150px"
                                    />
                                }
                            ></ListItemText>
                        </List.Item>
                    )}
                    {clientDrawerData?.declineEmail === 8 && (
                        <List.Item>
                            <ListItemIcon className="minW20">
                                <Email
                                    style={{ width: "13px", height: "13px" }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    clientDrawerData?._id ? (
                                        clientDrawerData?.email
                                    ) : (
                                        <Skeleton
                                            variant="text"
                                            animation="wave"
                                            sx={{ fontSize: "1rem" }}
                                            width="150px"
                                        />
                                    )
                                }
                                primaryTypographyProps={{
                                    color: "#797F9A",
                                    fontWeight: "medium",
                                    fontSize: "13px",
                                }}
                            ></ListItemText>
                        </List.Item>
                    )}
                    <List.Item>
                        <ListItemIcon className="minW20">
                            <LocationOnSharpIcon
                                style={{ width: "13px", height: "13px" }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                clientDrawerData?._id ? (
                                    <p>
                                        {clientDrawerData?.address1}{" "}
                                        {clientDrawerData?.address2},{" "}
                                        <span
                                            style={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {" "}
                                            {clientDrawerData?.city},{" "}
                                        </span>
                                        <span
                                            style={{
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            {clientDrawerData?.state?.name}
                                        </span>
                                        -{clientDrawerData?.zipcode}
                                    </p>
                                ) : (
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                        sx={{ fontSize: "2rem" }}
                                    />
                                )
                            }
                            primaryTypographyProps={{
                                color: "#797F9A",
                                fontWeight: "medium",
                                fontSize: "13px",
                            }}
                        ></ListItemText>
                    </List.Item>
                    <List.Item>
                        <Button
                            onClick={() => {
                                handleClose();
                                navigate(
                                    `/client_profile/${clientDrawerData?._id}`
                                );
                            }}
                        >
                            Edit Details
                        </Button>
                    </List.Item>
                    <Divider className="mT10 mB10" />
                    <Menu
                        data={data?.items}
                        defaultSelected="reports_Logs"
                        onClose={handleClose}
                    />
                </List>
                <Divider className="mT10 mB10" />
                <ListItem style={{ cursor: "default" }}>
                    <ListItemText
                        primary="Patients"
                        primaryTypographyProps={{
                            fontWeight: "bold",
                            color: "#596284",
                            cursor: "default",
                        }}
                    />
                    <Button
                        onClick={() => {
                            handleClose();
                            navigate("/add_patient");
                        }}
                    >
                        Add Patient
                    </Button>
                </ListItem>
                {activePatients?.length > 0 && (
                    <div className="w100 mT10">
                        <TableContent
                            patients={activePatients}
                            handlePatientClick={handlePatientClick}
                        />
                    </div>
                )}

                {inactivePatients?.length > 0 && (
                    <ListItem>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showInactive ?? false}
                                    onChange={(e) =>
                                        setShowInactive(e.target.checked)
                                    }
                                />
                            }
                            label={data?.fieldDetails?.showInactive?.label}
                        />
                    </ListItem>
                )}

                {showInactive && (
                    <div className="w100 mT10">
                        <TableContent
                            patients={inactivePatients}
                            handlePatientClick={handlePatientClick}
                        />
                    </div>
                )}
            </Drawer>
            <SmsWidgetModal
                open={openSmsModal}
                onClose={onClose}
                phonetype={phonetype}
            />
        </>
    );
};

export default ClientDrawer;

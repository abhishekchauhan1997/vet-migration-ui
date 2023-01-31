import Drawer from "UIComponents/Drawer";
import patientDetails from "dummyData/patientData.json";
import {
    Divider,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import List from "UIComponents/List";
import Button from "UIComponents/Button";
import TableContainer from "UIComponents/Table";
import { TableCellData, TableCellWithChip, TableHeader } from "../TableUtility";
import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "components/SideNavigationMenu/Menu";
import useSessionContext from "hooks/useSessionContext";
import useSessionOverwrite from "hooks/useSessionOverwrite";
import useGetPageDataContext from "hooks/usePageDataContext";
import axios from "axios";
import { API_BASENAME, API_BASEURL } from "utils/constants";
import dayjs from "dayjs";

const columns = [
    { id: "encounter", label: "Encounter", minWidth: 200 },
    { id: "status", label: "Status", minWidth: 200 },
    { id: "followUp", label: "followUp", minWidth: 200 },
];

const TableContent = ({ rows, handleEncClickFunc, updateStatus }) => {
    return (
        <TableContainer>
            <TableContainer.Table stickyHeader aria-label="patient_table">
                <TableHeader cols={columns} className="cell_pxy" />
                <TableContainer.TableBody>
                    {rows?.map((row, index) => {
                        return (
                            <TableContainer.TableRows
                                key={row._id}
                                sx={{ verticalAlign: "top" }}
                            >
                                <TableCellData
                                    children={
                                        <>
                                            <Link
                                                component="button"
                                                variant="body2"
                                                onClick={() =>
                                                    handleEncClickFunc(row)
                                                }
                                                underline="hover"
                                            >
                                                {row.name}
                                            </Link>
                                            <p
                                                style={{
                                                    fontStyle: "normal",
                                                    fontWeight: "600",
                                                    fontSize: "11px",
                                                    lineHeight: "13px",
                                                    letterSpacing: "0.05em",
                                                    color: "#7984AB",
                                                    marginTop: "5px",
                                                }}
                                            >
                                                {row.provider.name}{" "}
                                                {dayjs(row.createdAt).format(
                                                    "DD MMM YYYY HH:mm"
                                                )}
                                            </p>
                                        </>
                                    }
                                    style={{ padding: "8px 4px" }}
                                />
                                <TableCellWithChip
                                    data={row.status === 1 ? "OPEN" : "CLOSED"}
                                    className="cell_py"
                                    action={true}
                                    handler={() => updateStatus(row)}
                                />
                                <TableCellWithChip
                                    data={row.followUp === 1 ? "ON" : "OFF"}
                                    className="cell_py"
                                    action={true}
                                />
                            </TableContainer.TableRows>
                        );
                    })}
                </TableContainer.TableBody>
            </TableContainer.Table>
        </TableContainer>
    );
};

const PatientDrawer = ({ onClose, openDrawer }) => {
    const navigate = useNavigate();
    const { patient, setEncounter, encounter } = useSessionContext();
    const {
        patientDrawerSessionId,
        patientDrawerData,
        setPatientDrawerData,
        setAlert,
    } = useGetPageDataContext();
    const { handleEncounterClickFun } = useSessionOverwrite();
    const [data, setData] = useState([]);

    const getPatientDataById = useCallback(
        async (id) => {
            try {
                let { data } = await axios.get(
                    `${API_BASEURL}${API_BASENAME}/patient/registration/fetch/dashboard/${id}`
                );
                setPatientDrawerData(data[0]);
            } catch (err) {
                throw new Error(err);
            }
        },
        [setPatientDrawerData]
    );

    const handleEncClick = (row) => {
        onClose();
        handleEncounterClickFun(row?._id);
    };

    const postEncData = (row) => {
        axios({
            method: "put",
            url: `${API_BASEURL}${API_BASENAME}/encounter/registration/update/${row?._id}`,

            data: { status: row.status === 1 ? 2 : 1 },
        })
            .then(({ data }) => {
                setPatientDrawerData((prev) => ({
                    ...prev,
                    encounters: prev?.encounters?.map((x) =>
                        x._id === row?._id
                            ? { ...x, status: row.status === 1 ? 2 : 1 }
                            : x
                    ),
                }));
                if (row?._id === encounter?._id) {
                    setEncounter({
                        ...encounter,
                        status: row.status === 1 ? 2 : 1,
                    });
                }
                setAlert({
                    open: true,
                    message: "Status Changed Succssfully",
                    severity: "success",
                });
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    useEffect(() => {
        const data = patientDetails;
        setData(data);
    }, []);

    useEffect(() => {
        if (patientDrawerSessionId) getPatientDataById(patientDrawerSessionId);
    }, [patientDrawerSessionId, getPatientDataById]);

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
                <List.Item>
                    <ListItemText
                        primary={
                            patientDrawerData?._id ? (
                                patientDrawerData?.name
                            ) : (
                                <Skeleton
                                    variant="text"
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
                    />
                </List.Item>
                {patientDrawerData?._id ? (
                    patientDrawerData?.photo?.imageUrl && (
                        <List.Item className="justifyC aiC">
                            <ListItemAvatar className="img_border_menu">
                                <img
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    src={patientDrawerData?.photo?.imageUrl}
                                    alt="patient_img"
                                />
                            </ListItemAvatar>
                        </List.Item>
                    )
                ) : (
                    <List.Item className="justifyC aiC">
                        <Skeleton variant="rounded" width={100} height={100} />
                    </List.Item>
                )}
                <List.Item>
                    <Button
                        onClick={() => {
                            onClose();
                            navigate(`/modify_patient/${patient?._id}`);
                        }}
                    >
                        Edit Details
                    </Button>
                </List.Item>
                <Divider />
                <Menu
                    data={data?.items}
                    defaultSelected="appointments"
                    onClose={onClose}
                />
            </List>
            <Divider />
            <ListItem style={{ cursor: "default" }}>
                <ListItemText
                    primary="Encounters"
                    primaryTypographyProps={{
                        fontWeight: "bold",
                        color: "#596284",
                        cursor: "default",
                    }}
                />
                <Button
                    component={NavLink}
                    to="/add_encounter"
                    onClick={onClose}
                >
                    Add Encounter
                </Button>
            </ListItem>
            {patientDrawerData?._id ? (
                patientDrawerData?.encounters?.length > 0 && (
                    <div className="mT10">
                        <TableContent
                            rows={patientDrawerData?.encounters ?? []}
                            handleEncClickFunc={handleEncClick}
                            updateStatus={postEncData}
                        />
                    </div>
                )
            ) : (
                <Skeleton variant="rounded" width="100%" height={100} />
            )}
        </Drawer>
    );
};

export default PatientDrawer;

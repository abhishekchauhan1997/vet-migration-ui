import Drawer from "UIComponents/Drawer";
import profileDetails from "dummyData/userDetails.json";
import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import List from "UIComponents/List";
import ImageIcon from "@mui/icons-material/Image";
import TableContainer from "UIComponents/Table";
import { TableCellData, TableHeader } from "../TableUtility";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Menu from "components/SideNavigationMenu/Menu";
import useSessionContext from "hooks/useSessionContext";

const columns = [
    { id: "client", label: "Client", minWidth: 200 },
    { id: "patient", label: "Patient", minWidth: 200 },
    { id: "encounter", label: "Encounter", minWidth: 200 },
];

const TableContent = () => {
    return (
        <TableContainer sx={{ maxHeight: 348 }}>
            <TableContainer.Table stickyHeader aria-label="user_table">
                <TableHeader cols={columns} className=" cell_padd" />
                <TableContainer.TableBody>
                    {profileDetails?.recentPatients.map((row, index) => {
                        return (
                            <TableContainer.TableRows key={row.clientId}>
                                <TableCellData
                                    children={row.clientName}
                                    className="cell_padd"
                                    action={true}
                                />
                                <TableCellData
                                    children={row.patientName}
                                    className="cell_padd"
                                    action={true}
                                />
                                <TableCellData
                                    children={row.encounterName}
                                    className="cell_padd"
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

const ProfileNavMenuBar = ({ onClose, openDrawer }) => {
    const { provider } = useSessionContext();
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = profileDetails;
        setData(data);
    }, []);

    return (
        <Drawer
            isOpen={openDrawer}
            isPositionRight={true}
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
                            onClick={() => onClose()}
                        />
                    }
                ></ListItem>
                <List.Item>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${provider?.firstName} ${provider?.lastName}`}
                        secondary={provider?.email}
                        primaryTypographyProps={{
                            color: "#3B4468",
                            fontWeight: "bold",
                            fontSize: "20px",
                        }}
                        secondaryTypographyProps={{
                            color: "#797F9A",
                            fontWeight: "medium",
                            fontSize: "13px",
                        }}
                    />
                </List.Item>
                <Menu
                    data={data?.items}
                    defaultSelected="clockIn_Out"
                    onClose={onClose}
                />
            </List>
            <Divider />
            <ListItem style={{ cursor: "default" }}>
                <ListItemText
                    primary="My Recent Patients"
                    primaryTypographyProps={{
                        fontWeight: "bold",
                        color: "#596284",
                        cursor: "default",
                    }}
                />
            </ListItem>
            <div className="w100 overflow-hid">
                <TableContent />
            </div>
        </Drawer>
    );
};

export default ProfileNavMenuBar;

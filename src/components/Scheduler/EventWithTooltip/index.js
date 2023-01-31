import MuiTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React from "react";
import { Event as CalendarEvent } from "../Calendar";

const Tooltip = styled(({ className, ...props }) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: "0px 0px 10px rgb(0 0 0 / 15%)",
        fontSize: 11,
        padding: "10px",
        ".text": {
            color: "#3b4468",
            fontSize: "13px",
            lineHeight: "20px",
            "&:not(:last-child)": {
                marginBottom: "5px",
            },
        },
    },
}));

const Event = ({ tooltip, placement, ...props }) => {
    const { client = {}, patient = {}, appointment = {} } = tooltip ?? {};
    return (
        <Tooltip
            followCursor
            title={
                <>
                    <p className="text">
                        {patient.name} ({patient.id}) {patient.species}{" "}
                        {patient.breed} {patient.sex} {patient.dob}
                    </p>
                    <p className="text">
                        {client.name} ({client.id}) {client.phone}
                    </p>
                    <p className="text">Created By: {appointment.createdBy}</p>
                    <p className="text">Created On: {appointment.createdOn}</p>
                    <p className="text">
                        Appointment Type: {appointment.appointmentType}
                    </p>
                    <p className="text">Reason: {appointment.reason}</p>
                    <p className="text">
                        Assigned To: {appointment.assignedTo}
                    </p>
                    <p className="text">Note: {appointment.note}</p>
                    <p className="text">Start Date: {appointment.startDate}</p>
                    <p className="text">End Date: {appointment.endDate}</p>
                </>
            }
            placement={placement ?? "bottom-start"}
        >
            <CalendarEvent {...props} />
        </Tooltip>
    );
};

Event.Head = CalendarEvent.Head;
Event.Body = CalendarEvent.Body;

export default Event;

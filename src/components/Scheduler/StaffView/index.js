import { Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    getSlotHeight,
    getTimeOffsetFromEvent,
    TimeScaleViewWithMarksEvents,
} from "../Calendar";
import Event from "../EventWithTooltip";
import Data from "./../data.json";

const StaffView = ({
    staffList = Data.staffList,
    interval,
    timeFormat,
    startTime,
    endTime,
    isPositionVertical,
    appointmentCountList = Data.appointmentCountList,
}) => {
    const navigate = useNavigate();
    const columns = staffList.map((staff) => ({
        text: `${staff.name} (${
            appointmentCountList.find(
                (appointment) => appointment.staffId === staff.id
            )?.count ?? 0
        })`,
        data: staff,
    }));

    const slotDetails = {
        interval,
        startTime,
        endTime,
        slotHeight: getSlotHeight(interval),
    };
    const handleHeaderClick = (e, staff) => {
        e.preventDefault();
        e.stopPropagation();
        navigate("/staff_schedule", { state: staff });
    };

    const handleColumnDoubleClick = (e, staff) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target !== e.currentTarget) return;
        const time = getTimeOffsetFromEvent({
            event: e,
            interval,
            startTime,
            isPositionVertical,
            slotHeight: slotDetails.slotHeight,
        });
        console.log(time, staff);
    };

    const handleMarkClick = (e, data) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target !== e.currentTarget) return;
        const time = getTimeOffsetFromEvent({
            event: e,
            interval,
            startTime,
            isPositionVertical,
            slotHeight: slotDetails.slotHeight,
            targetElement: e.target.parentElement,
        });
        console.log(time, data);
    };

    const handleAppointmentClick = (e, data) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(data);
    };
    return (
        <TimeScaleViewWithMarksEvents
            columns={columns}
            marks={Data.scheduleList}
            events={Data.appointmentsList}
            className="staffView"
            EventComponent={Event}
            timeFormat={timeFormat}
            slotDetails={slotDetails}
            getEventProps={({ tooltip }) => ({
                tooltip,
            })}
            isPositionVertical={isPositionVertical}
            markClickHandler={handleMarkClick}
            eventClickHandler={handleAppointmentClick}
            headerClickHandler={handleHeaderClick}
            columnDoubleClickHandler={handleColumnDoubleClick}
            eventAccessor={({ event, column, columns }) =>
                event.staffId === columns[column].data.id
            }
            markAccessor={({ mark, column, columns }) =>
                mark.staffId === columns[column].data.id
            }
            columnHeadRenderer={(columnData) => {
                return (
                    <Tooltip title={columnData.text} arrow>
                        <span className="clickable">{columnData.text}</span>
                    </Tooltip>
                );
            }}
        />
    );
};

export default StaffView;

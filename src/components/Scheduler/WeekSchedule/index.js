import React from "react";
import { TimeScaleViewWithMarksEvents } from "../Calendar";
import Event from "../EventWithTooltip";

const WeekSchedule = ({
    events = [],
    dates = [],
    timeFormat,
    slotDetails,
    isPositionVertical,
    handleColumnClick,
}) => {
    return (
        <TimeScaleViewWithMarksEvents
            events={events}
            columns={dates}
            EventComponent={Event}
            timeFormat={timeFormat}
            slotDetails={slotDetails}
            getEventProps={({ tooltip }) => ({
                tooltip,
            })}
            isPositionVertical={isPositionVertical}
            columnClickHandler={handleColumnClick}
            eventAccessor={({ event, column, columns }) => {
                return event.date.label === columns[column].label;
            }}
        />
    );
};

export default WeekSchedule;

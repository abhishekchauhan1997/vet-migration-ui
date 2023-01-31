import React from "react";
import {
    getSlotHeight,
    getTimeOffsetFromEvent,
    TimeScaleViewWithMarksEvents,
} from "../Calendar";
import Event from "../EventWithTooltip";

const DaySchedule = ({
    date,
    events = [],
    timeFormat,
    slotDetails,
    isPositionVertical,
    handleColumnDoubleClick,
}) => {
    const columnDoubleClickHandler = (e) => {
        const time = getTimeOffsetFromEvent({
            event: e,
            isPositionVertical,
            interval: slotDetails.interval,
            startTime: slotDetails.startTime,
            slotHeight: getSlotHeight(slotDetails.interval),
        });
        handleColumnDoubleClick(e, time);
    };
    return (
        <TimeScaleViewWithMarksEvents
            events={events}
            columns={[date]}
            EventComponent={Event}
            timeFormat={timeFormat}
            slotDetails={slotDetails}
            getEventProps={({ tooltip }) => ({
                tooltip,
            })}
            isPositionVertical={isPositionVertical}
            columnDoubleClickHandler={
                handleColumnDoubleClick ? columnDoubleClickHandler : false
            }
            eventAccessor={({ event, column, columns }) =>
                event.date.label === columns[column].label
            }
        />
    );
};

export default DaySchedule;

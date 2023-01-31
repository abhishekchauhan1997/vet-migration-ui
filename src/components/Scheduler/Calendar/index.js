import React from "react";
import CalendarHeader from "./Header";
import CalendarContent from "./Content";
import MonthView from "./MonthView";
// import MonthViewWithEvents from "./MonthViewWithEvents";
import TimeScaleView from "./TimeScaleView";
import TimeScaleViewWithMarksEvents from "./TimeScaleViewWithMarksEvents";
import { Mark } from "./Marks";
import { Event } from "./Events";
import {
    getTimeTicks,
    getFormattedTime,
    getMarksParameters,
    getEventsParameters,
    getSlotHeight,
    getDaysInRange,
    getCalendarDate,
    getHourMinFromDate,
    getHourMinFromTime,
    getTimeOffsetFromEvent,
    getTimeDifferenceInMinutes,
    getPositionDimensionStyles,
} from "./utils";

const Calendar = ({ children }) => {
    return <div className="calendar-container">{children}</div>;
};

export default Calendar;

export {
    CalendarHeader,
    CalendarContent,
    MonthView,
    // MonthViewWithEvents,
    TimeScaleView,
    TimeScaleViewWithMarksEvents,
    Mark,
    Event,
    getTimeTicks,
    getFormattedTime,
    getMarksParameters,
    getEventsParameters,
    getSlotHeight,
    getDaysInRange,
    getCalendarDate,
    getHourMinFromDate,
    getHourMinFromTime,
    getTimeOffsetFromEvent,
    getTimeDifferenceInMinutes,
    getPositionDimensionStyles,
};

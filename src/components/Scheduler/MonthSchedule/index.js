import dayjs from "dayjs";
import React from "react";
import { MonthView, getCalendarDate } from "../Calendar";
import Event from "../EventWithTooltip";
import "./monthSchedule_styles.scss";
const EVENT_HEIGHT = 27;

const getEventRoundOffDate = (dateTime, type) => {
    return dayjs(dateTime)
        .set("hour", 0)
        .set("minute", 0)
        .add(type === "end" ? 1 : 0, "day");
};

const getEventsSortByWidth = (events) =>
    events.sort((event1, event2) => {
        const event1TimeDifference = getEventRoundOffDate(
            event1.endDate,
            "end"
        ).diff(getEventRoundOffDate(event1.startDate, "start"), "day");
        const event2TimeDifference = getEventRoundOffDate(
            event2.endDate,
            "end"
        ).diff(event2.startDate, "day");
        return event2TimeDifference - event1TimeDifference;
    });

const isEventOverlapping = (currentEvent, prevEvent) => {
    if (
        !(
            (getEventRoundOffDate(currentEvent.startDate).diff(
                getEventRoundOffDate(prevEvent.startDate),
                "day"
            ) <= 0 &&
                getEventRoundOffDate(currentEvent.endDate, "end").diff(
                    getEventRoundOffDate(prevEvent.startDate),
                    "day"
                ) <= 0) ||
            (getEventRoundOffDate(currentEvent.startDate).diff(
                getEventRoundOffDate(prevEvent.endDate, "end"),
                "day"
            ) >= 0 &&
                getEventRoundOffDate(currentEvent.endDate, "end").diff(
                    getEventRoundOffDate(prevEvent.endDate, "end"),
                    "day"
                ) >= 0)
        )
    ) {
        return true;
    }
    return false;
};

const getEventWidth = (startDate, endDate) => {
    const timeDifference = dayjs(endDate).add(1, "day").diff(startDate, "day");
    return `calc((100% / 7) * ${timeDifference} - 2px)`;
};

const getEventsWithPosition = (events) => {
    let eventsWithPosition = [];
    events.forEach((event) => {
        const overlappingEvents = eventsWithPosition.filter((positionedEvent) =>
            isEventOverlapping(event, positionedEvent.data)
        );

        let y = 0;

        if (overlappingEvents.length > 0) {
            for (let i = 0; i < overlappingEvents.length; i++) {
                if (overlappingEvents[i].y > y) {
                    break;
                } else y += EVENT_HEIGHT;
            }
        }

        eventsWithPosition.push({
            data: event,
            y,
            width: getEventWidth(event.startDate, event.endDate),
        });
    });
    return eventsWithPosition;
};

const getDayEvents = (events, date) =>
    events.filter((event) => {
        const [startDay, startMonth, startYear] = [
            dayjs(event.data.startDate).get("date"),
            dayjs(event.data.startDate).get("month") + 1,
            dayjs(event.data.startDate).get("year"),
        ];
        const eventEndDate = dayjs(event.data.endDate).add(1, "day");

        const [endDay, endMonth, endYear] = [
            dayjs(eventEndDate).get("date"),
            dayjs(eventEndDate).get("month") + 1,
            dayjs(eventEndDate).get("year"),
        ];
        const endDate = dayjs()
            .set("date", date.day)
            .set("month", date.month - 1)
            .set("year", date.year)
            .add(1, "day");

        const nextDate = {
            day: dayjs(endDate).get("date"),
            month: dayjs(endDate).get("month") + 1,
            year: dayjs(endDate).get("year"),
        };
        return (
            (date.day === startDay &&
                date.month === startMonth &&
                date.year === startYear) ||
            (nextDate.day === endDay &&
                nextDate.month === endMonth &&
                nextDate.year === endYear)
        );
    });

const getOnDayEvents = (events, date) =>
    events.filter((event) => {
        const [startDay, startMonth, startYear] = [
            dayjs(event.data.startDate).get("date"),
            dayjs(event.data.startDate).get("month") + 1,
            dayjs(event.data.startDate).get("year"),
        ];
        return (
            date.day === startDay &&
            date.month === startMonth &&
            date.year === startYear
        );
    });

const withCalendarDaysMatrixParameters = ({
    month,
    year,
    events,
    calendarDays,
}) => {
    const calendarDaysMatrixParameters = [];
    const positionedEvents = getEventsWithPosition(
        getEventsSortByWidth(events)
    );
    calendarDays.forEach((week, weekIndex) => {
        week.forEach((dateDetails, dayIndex) => {
            const date = getCalendarDate({ ...dateDetails, month, year });

            const dayEvents = getDayEvents(positionedEvents, date);

            const onDayEvents = getOnDayEvents(dayEvents, date);

            const maxY = Math.max(...dayEvents.map((event) => event.y));

            if (calendarDaysMatrixParameters[weekIndex] === undefined)
                calendarDaysMatrixParameters[weekIndex] = [];
            const cellHeight = maxY + EVENT_HEIGHT;
            calendarDaysMatrixParameters[weekIndex][dayIndex] = {
                data: dateDetails,
                events: onDayEvents,
                style:
                    dayEvents.length > 0
                        ? { minHeight: `${cellHeight}px` }
                        : {},
            };
        });
    });
    return calendarDaysMatrixParameters;
};

const eventClickHandler = (e, event) => {
    console.log(event);
};

const MonthSchedule = ({
    month,
    year,
    events = [],
    calendarDays,
    handleDayClick,
}) => {
    return (
        <MonthView
            year={year}
            month={month}
            classNames={{ month: "monthSchedule-view", week: "month-week" }}
            dayClickHandler={handleDayClick}
            calendarDays={withCalendarDaysMatrixParameters({
                month,
                year,
                events,
                calendarDays,
            })}
            monthBodyRenderer={({ data }) => {
                return data.events.map((event) => (
                    <Event
                        key={event.data.id}
                        style={{
                            top: "unset",
                            left: "unset",
                            width: event.width,
                            height: EVENT_HEIGHT,
                            transform: `translateY(${event.y}px)`,
                        }}
                        tooltip={event.data.tooltip}
                        onClick={
                            !event.data.readOnly
                                ? (e) => eventClickHandler?.(e, event)
                                : null
                        }
                    >
                        <Event.Head
                            style={{
                                color: "#fff",
                                backgroundColor: event.data.typeColor,
                            }}
                        >
                            {event.data.status}
                        </Event.Head>
                    </Event>
                ));
            }}
        />
    );
};

export default MonthSchedule;

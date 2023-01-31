import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
    CalendarContent,
    getFormattedTime,
    getHourMinFromDate,
    getTimeDifferenceInMinutes,
    getTimeTicks,
} from "../Calendar";
import Data from "./../data.json";
import Event from "../EventWithTooltip";

const EVENT_HEIGHT = 27;

const eventClickHandler = (e, event) => {
    console.log(event);
};

const setDateWithTime = ({
    date,
    time: { timeFormat, hours, minutes, period = "" },
}) => {
    const formattedHours =
        timeFormat === 12 && period.toLowerCase() === "pm"
            ? hours < 12
                ? 12 + hours
                : hours
            : hours === 12
            ? 0
            : hours;
    return dayjs(date)
        .set("hour", formattedHours)
        .set("minute", minutes)
        .set("second", 0);
};

function useResponsiveBreakpoints(elRef) {
    const [size, setSize] = useState({ width: null, height: null });
    const observer = useRef(
        new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;

            setSize({ width, height });
        })
    );

    useEffect(() => {
        const el = elRef.current;
        const observerEl = observer.current;
        if (elRef.current) {
            observerEl.observe(el);
        }
        return () => {
            observerEl.unobserve(el);
        };
    }, [elRef, observer]);
    return size;
}

const TimelineView = ({
    staffList = Data.staffList,
    interval,
    timeFormat,
    startTime,
    endTime,
    date,
    appointmentCountList = Data.appointmentCountList,
}) => {
    const staffColumnRef = useRef(null);

    const { width } = useResponsiveBreakpoints(staffColumnRef);

    const ticks = getTimeTicks({
        startTime,
        endTime,
        interval,
        timeFormat,
    });

    const handleStaffClick = (id) => {
        console.log(id);
    };

    const getEventsBetweenTime = (events, currentDateTime, nextDateTime) =>
        events.filter(
            (event) =>
                dayjs(event.data.startDate).diff(currentDateTime, "minute") >=
                    0 &&
                dayjs(event.data.startDate).diff(nextDateTime, "minute") < 0
        ) ?? [];

    const getEventRoundOffTime = (datetime, type) => {
        return dayjs(datetime)[type === "start" ? "subtract" : "add"](
            type === "start"
                ? dayjs(datetime).get("minute")
                : interval - dayjs(datetime).get("minute"),
            "minute"
        );
    };

    const isEventOverlapping = (currentEvent, prevEvent) =>
        !(
            (getTimeDifferenceInMinutes(
                getHourMinFromDate(
                    getEventRoundOffTime(currentEvent.startDate, "start")
                ),
                getHourMinFromDate(
                    getEventRoundOffTime(prevEvent.startDate, "start")
                )
            ) <= 0 &&
                getTimeDifferenceInMinutes(
                    getHourMinFromDate(
                        getEventRoundOffTime(currentEvent.endDate, "end")
                    ),
                    getHourMinFromDate(
                        getEventRoundOffTime(prevEvent.startDate, "start")
                    )
                ) <= 0) ||
            (getTimeDifferenceInMinutes(
                getHourMinFromDate(
                    getEventRoundOffTime(currentEvent.startDate, "start")
                ),
                getHourMinFromDate(
                    getEventRoundOffTime(prevEvent.endDate, "end")
                )
            ) >= 0 &&
                getTimeDifferenceInMinutes(
                    getHourMinFromDate(
                        getEventRoundOffTime(currentEvent.endDate, "end")
                    ),
                    getHourMinFromDate(
                        getEventRoundOffTime(prevEvent.endDate, "end")
                    )
                ) >= 0)
        );

    const getEventWidth = (startDate, endDate) => {
        const roundedOffStartDate = dayjs(
            getEventRoundOffTime(startDate, "start")
        );
        const roundedOffEndDate = dayjs(getEventRoundOffTime(endDate, "end"));
        const timeDifference = getTimeDifferenceInMinutes(
            [roundedOffEndDate.get("hour"), roundedOffEndDate.get("minute")],
            [roundedOffStartDate.get("hour"), roundedOffStartDate.get("minute")]
        );
        const tickDifference = timeDifference / interval;
        return `calc(((100% - ${width}px) / ${ticks.length}) * ${tickDifference} - 2px)`;
    };

    const getEventsSortByWidth = (events) =>
        events.sort((event1, event2) => {
            const event1TimeDifference = getTimeDifferenceInMinutes(
                [
                    dayjs(getEventRoundOffTime(event1.endDate, "end")).get(
                        "hour"
                    ),
                    dayjs(getEventRoundOffTime(event1.endDate, "end")).get(
                        "minute"
                    ),
                ],
                [
                    dayjs(getEventRoundOffTime(event1.startDate, "start")).get(
                        "hour"
                    ),
                    dayjs(getEventRoundOffTime(event1.startDate, "start")).get(
                        "minute"
                    ),
                ]
            );
            const event2TimeDifference = getTimeDifferenceInMinutes(
                [
                    dayjs(getEventRoundOffTime(event2.endDate, "end")).get(
                        "hour"
                    ),
                    dayjs(getEventRoundOffTime(event2.endDate, "end")).get(
                        "minute"
                    ),
                ],
                [
                    dayjs(getEventRoundOffTime(event2.startDate, "start")).get(
                        "hour"
                    ),
                    dayjs(getEventRoundOffTime(event2.startDate, "start")).get(
                        "minute"
                    ),
                ]
            );
            return event2TimeDifference - event1TimeDifference;
        });

    const getEventsWithPosition = (events) => {
        let eventsWithPosition = [];
        events.forEach((event) => {
            const overlappingEventCount = eventsWithPosition.filter(
                (positionedEvent) =>
                    isEventOverlapping(event, positionedEvent.data)
            ).length;

            eventsWithPosition.push({
                data: event,
                y: EVENT_HEIGHT * overlappingEventCount,
                width: getEventWidth(event.startDate, event.endDate),
            });
        });
        return eventsWithPosition;
    };

    const events = Data.appointmentsList.map((eventDetails) => ({
        ...eventDetails,
        events: getEventsWithPosition(
            getEventsSortByWidth(eventDetails.events)
        ),
    }));

    return (
        <CalendarContent className="timelineView">
            <CalendarContent.Header>
                {({ Container, ...props }) => {
                    return (
                        <>
                            <Container
                                {...props}
                                ref={staffColumnRef}
                                className={`${props.className} staffColumn`}
                            />
                            {ticks.map((day) => {
                                const formattedTime = getFormattedTime({
                                    timeFormat,
                                    ...day,
                                });
                                return (
                                    <Container
                                        key={formattedTime}
                                        {...props}
                                        className={props?.className}
                                    >
                                        {formattedTime}
                                    </Container>
                                );
                            })}
                        </>
                    );
                }}
            </CalendarContent.Header>
            <CalendarContent.Body
                classNames={{ row: "staff-events" }}
                rowCount={staffList.length}
                colCount={ticks.length + 1}
            >
                {({ Container, row, column, ...props }) => {
                    const staff = staffList[row - 1];
                    if (column === 1) {
                        return (
                            <Container
                                {...props}
                                key={staff.id}
                                onClick={() => handleStaffClick(staff.id)}
                                className={props?.className ?? ""}
                            >
                                <div className="staffName">
                                    <p className="clickable">
                                        {`${staff.name} (${
                                            appointmentCountList.find(
                                                (appointment) =>
                                                    appointment.staffId ===
                                                    staff.id
                                            )?.count ?? 0
                                        })`}
                                    </p>
                                </div>
                            </Container>
                        );
                    }
                    const currentDateTime = setDateWithTime({
                        date: date.value,
                        time: {
                            timeFormat,
                            ...ticks[column - 2],
                        },
                    });
                    const nextDateTime = setDateWithTime({
                        date: date.value,
                        time: {
                            timeFormat,
                            ...ticks[column - 2],
                            minutes: ticks[column - 2].minutes + interval,
                        },
                    });
                    const eventsInDateTimeRange = getEventsBetweenTime(
                        events.find(
                            (appointmentDetails) =>
                                appointmentDetails.staffId === staff.id
                        )?.events ?? [],
                        currentDateTime,
                        nextDateTime
                    );
                    const lastEvent =
                        eventsInDateTimeRange[
                            eventsInDateTimeRange.length - 1
                        ] ?? {};
                    const timelineBodyHeight = lastEvent.y + EVENT_HEIGHT;
                    return (
                        <Container
                            {...props}
                            className={`${props.className} timelineBody-container`}
                        >
                            <div
                                className="timelineBody"
                                style={{
                                    minHeight: `${timelineBodyHeight}px`,
                                }}
                            >
                                {eventsInDateTimeRange.map((event) => (
                                    <Event
                                        key={event.data.id}
                                        style={{
                                            opacity: width === null ? 0 : 1,
                                            top: "unset",
                                            left: "unset",
                                            width: event.width,
                                            transform: `translateY(${event.y}px)`,
                                            height: EVENT_HEIGHT,
                                        }}
                                        tooltip={event.data.tooltip}
                                        onClick={
                                            !event.data.readOnly
                                                ? (e) =>
                                                      eventClickHandler?.(
                                                          e,
                                                          event
                                                      )
                                                : null
                                        }
                                    >
                                        <Event.Head
                                            style={{
                                                color: "#fff",
                                                backgroundColor:
                                                    event.data.typeColor,
                                            }}
                                        >
                                            {event.data.status}
                                        </Event.Head>
                                    </Event>
                                ))}
                            </div>
                        </Container>
                    );
                }}
            </CalendarContent.Body>
        </CalendarContent>
    );
};

export default TimelineView;

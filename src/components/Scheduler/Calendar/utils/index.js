import { getMarksParameters } from "./getMarksParameters";
import { getEventsParameters } from "./getEventsParameters";

const START_TIME = "startDate";
const END_TIME = "endDate";
const EVENT_HEIGHT = 70;

export const getHourlyTicks = ({ ticks, interval }) => {
    const hourlyTicks = [];
    const hourCount = 60 / interval;

    let tempTicks = [];
    for (let i = 0; i < ticks.length; i++) {
        if (i !== 0 && i % hourCount === 0) {
            hourlyTicks.push(tempTicks);
            tempTicks = [];
        }
        tempTicks.push(ticks[i]);
    }
    hourlyTicks.push(tempTicks);
    return hourlyTicks;
};

export const getTimeTicks = ({
    startTime,
    endTime,
    interval = 60,
    timeFormat = 12,
}) => {
    const offset = interval * 1000 * 60;
    let startDate = new Date("1/1/2001 " + startTime);
    const endDate = new Date("1/1/2001 " + endTime);
    const timeScale = [];

    do {
        if (startDate < endDate) {
            const hours = startDate.getHours();
            const minutes = startDate.getMinutes();
            const period = hours < 12 ? "AM" : "PM";
            timeScale.push(
                timeFormat === 12
                    ? { hours: hours === 12 ? 12 : hours % 12, minutes, period }
                    : { hours, minutes }
            );
        }
        startDate = new Date(startDate.getTime() + offset);
    } while (startDate < endDate);
    return timeScale;
};

export const getDaysInRange = (startDateString, endDateString, formatter) => {
    let dates = [];
    const theDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    while (theDate < endDate) {
        const date = new Date(theDate).toString();
        dates.push(formatter?.(date) ?? date);
        theDate.setDate(theDate.getDate() + 1);
    }
    dates.push(formatter?.(endDate.toString()) ?? endDate.toString());
    return dates;
};

export const getFormattedTime = ({ timeFormat, hours, minutes, period }) => {
    return timeFormat === 12
        ? `${("" + hours).padStart(2, 0)}:${("" + minutes).padStart(
              2,
              0
          )} ${period}`
        : `${("" + hours).padStart(2, 0)}:${("" + minutes).padStart(2, 0)}`;
};

export const getSlotHeight = (interval) => {
    const slotInterval = 15,
        slotMinHeight = 44;
    return interval > slotInterval
        ? slotMinHeight * (interval / slotInterval)
        : slotMinHeight;
};

export const getHourMinFromDate = (date) => {
    return [new Date(date).getHours(), new Date(date).getMinutes()];
};

export const getHourMinFromTime = (time) => {
    return time?.split?.(":").map?.((time) => parseInt(time, 10));
};

export const getTimeDifferenceInMinutes = (
    [hours2, minutes2],
    [hours1, minutes1]
) => {
    return (hours2 - hours1) * 60 + (minutes2 - minutes1);
};

export const getPositionDimension = ({
    data = [],
    startTime,
    interval,
    slotHeight,
    accessor,
    isPositionVertical = true,
}) => {
    const [position, dimension] = isPositionVertical
        ? ["y", "height"]
        : ["x", "width"];
    return data.map((eachData) => {
        const block = accessor?.(eachData) ?? eachData;
        return {
            data: eachData,
            [position]:
                (slotHeight *
                    getTimeDifferenceInMinutes(
                        getHourMinFromDate(block[START_TIME]),
                        getHourMinFromTime(startTime)
                    )) /
                interval,
            [dimension]: Math.max(
                EVENT_HEIGHT,
                (slotHeight *
                    getTimeDifferenceInMinutes(
                        getHourMinFromDate(block[END_TIME]),
                        getHourMinFromDate(block[START_TIME])
                    )) /
                    interval
            ),
        };
    });
};

export const getPositionDimensionStyles = ({
    x = 0,
    y = 0,
    height = 0,
    width = "100%",
    isPositionVertical = true,
}) => {
    let styles = {};
    if (isPositionVertical) {
        styles = {
            height,
            left: `${x}%`,
            width: `${width}%`,
            transform: `translateY(${y}px)`,
        };
    } else {
        styles = {
            width,
            top: `${y}%`,
            height: `${height}%`,
            transform: `translateX(${x}px)`,
        };
    }
    return styles;
};

// ----- TODO fix the position, should not be y -----
export const getEventsGroupByTime = (events, accessor) => {
    const eventsGroup = [];
    const getEventGroupIndex = (event) => {
        const eventData = accessor?.(event) ?? event;
        return eventsGroup.findIndex((group) => {
            return !(
                (getTimeDifferenceInMinutes(
                    getHourMinFromDate(eventData[START_TIME]),
                    getHourMinFromDate(group[START_TIME])
                ) <= 0 &&
                    getTimeDifferenceInMinutes(
                        getHourMinFromDate(eventData[END_TIME]),
                        getHourMinFromDate(group[START_TIME])
                    ) <= 0) ||
                (getTimeDifferenceInMinutes(
                    getHourMinFromDate(eventData[START_TIME]),
                    getHourMinFromDate(group[END_TIME])
                ) >= 0 &&
                    getTimeDifferenceInMinutes(
                        getHourMinFromDate(eventData[END_TIME]),
                        getHourMinFromDate(group[END_TIME])
                    ) >= 0 &&
                    group.y + event.height < event.y)
            );
        });
    };
    events.forEach((event) => {
        const eventData = accessor?.(event) ?? event;
        let eventGroupIndex = getEventGroupIndex(event);
        if (eventGroupIndex === -1) {
            eventsGroup.push({
                [START_TIME]: eventData[START_TIME],
                [END_TIME]: eventData[END_TIME],
                events: [],
                y: event.y,
            });
            eventGroupIndex = eventsGroup.length - 1;
        } else {
            if (
                getTimeDifferenceInMinutes(
                    getHourMinFromDate(eventData[START_TIME]),
                    getHourMinFromDate(eventsGroup[eventGroupIndex][START_TIME])
                ) <= 0
            ) {
                eventsGroup[eventGroupIndex][START_TIME] =
                    eventData[START_TIME];
                eventsGroup[eventGroupIndex].y = event.y;
            }
            if (
                getTimeDifferenceInMinutes(
                    getHourMinFromDate(eventData[END_TIME]),
                    getHourMinFromDate(eventsGroup[eventGroupIndex][END_TIME])
                ) >= 0
            )
                eventsGroup[eventGroupIndex][END_TIME] = eventData[END_TIME];
        }
        eventsGroup[eventGroupIndex].events.push(event);
    });
    return eventsGroup;
};

export const getEventsPositionInGroup = (events) => {
    const columnGroups = [];
    events.forEach((event) => {
        let isEventAdded = false;
        for (let i = 0; i < columnGroups.length; i++) {
            if (!columnGroups[i]) columnGroups[i] = [];
            let isOverlappingEvent = false;
            for (let j = 0; j < columnGroups[i].length; j++) {
                if (
                    event.y <=
                    columnGroups[i][j].y + columnGroups[i][j].height

                    // (getTimeDifferenceInMinutes(
                    //     getHourMinFromDate(event.data[START_TIME]),
                    //     getHourMinFromDate(columnGroups[i][j].data[START_TIME])
                    // ) >= 0 &&
                    //     getTimeDifferenceInMinutes(
                    //         getHourMinFromDate(event.data[START_TIME]),
                    //         getHourMinFromDate(
                    //             columnGroups[i][j].data[END_TIME]
                    //         )
                    //     ) < 0) ||
                    // (getTimeDifferenceInMinutes(
                    //     getHourMinFromDate(event.data[END_TIME]),
                    //     getHourMinFromDate(columnGroups[i][j].data[START_TIME])
                    // ) > 0 &&
                    //     getTimeDifferenceInMinutes(
                    //         getHourMinFromDate(event.data[END_TIME]),
                    //         getHourMinFromDate(
                    //             columnGroups[i][j].data[END_TIME]
                    //         )
                    //     ) <= 0)
                ) {
                    isOverlappingEvent = true;
                    break;
                }
            }
            if (!isOverlappingEvent) {
                columnGroups[i].push(event);
                isEventAdded = true;
                break;
            }
        }
        if (!isEventAdded) {
            columnGroups[columnGroups.length] = [];
            columnGroups[columnGroups.length - 1].push(event);
        }
    });
    return columnGroups;
};

export const getTimeOffsetFromEvent = ({
    event,
    interval,
    startTime,
    slotHeight,
    targetElement,
    isPositionVertical = true,
}) => {
    const rect = (targetElement ?? event.target).getBoundingClientRect();
    const pointerPosition = isPositionVertical
        ? event.clientY - rect.top
        : event.clientX - rect.left;
    const currentSlot = Math.floor(pointerPosition / slotHeight);
    const slotTimeInterval = currentSlot * interval;
    const slotStartHour = Math.floor(slotTimeInterval / 60);
    const slotStartMinute = slotTimeInterval % 60;
    const [startHour, startMinute] = getHourMinFromTime(startTime);

    return {
        hours: startHour + slotStartHour,
        minutes: startMinute + slotStartMinute,
    };

    // return getFormattedTime({
    //     timeFormat: 24,
    //     hours: startHour + slotStartHour,
    //     minutes: startMinute + slotStartMinute,
    // });
};

const getDaysAsMatrix = (rowCount, colCount, days) => {
    let daysMatrix = [];
    let counter = 0;
    for (let i = 0; i < rowCount; i++) {
        if (daysMatrix[i] === undefined) {
            daysMatrix[i] = [];
        }
        for (let j = 0; j < colCount; j++) {
            daysMatrix[i][j] = days[counter++];
        }
    }
    return daysMatrix;
};

const getCalendarDays = (month, year) => {
    const daysCount = new Date(year, month, 0).getDate();
    let startDayOfWeek = new Date(year, month - 1, 1).getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 7 : startDayOfWeek;
    const endDayOfWeek = new Date(year, month - 1, daysCount).getDay();
    const startOfMonthWeek =
        startDayOfWeek === 1
            ? 1
            : new Date(year, month - 1, 2 - startDayOfWeek).getDate();

    const endOfMonthWeek =
        endDayOfWeek === 0
            ? 0
            : new Date(year, month - 1, daysCount + 7 - endDayOfWeek).getDate();

    const days = [];
    for (let i = 0; i < startDayOfWeek - 1; i++) {
        days.push({ monthType: "prev", day: startOfMonthWeek + i });
    }
    for (let i = 1; i <= daysCount; i++) {
        days.push({ monthType: "current", day: i });
    }
    for (let i = 1; i <= endOfMonthWeek; i++) {
        days.push({ monthType: "next", day: i });
    }

    return days;
};

export const getCalendarDate = ({ monthType, day, month, year }) => {
    switch (monthType) {
        case "prev":
            return {
                day,
                month: month === 1 ? 12 : month - 1,
                year: month === 1 ? year - 1 : year,
            };
        case "next":
            return {
                day,
                month: month === 12 ? 1 : month + 1,
                year: month === 12 ? year + 1 : year,
            };
        default:
            return { day, month, year };
    }
};

export const getCalendarDaysMatrix = ({ month, year }) => {
    const colCount = 7;
    const days = getCalendarDays(month, year);
    const rowCount = days.length / colCount;
    const daysMatrix = getDaysAsMatrix(rowCount, colCount, days);
    return daysMatrix;
};

export { getMarksParameters, getEventsParameters };

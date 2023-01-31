import React from "react";
import { getCalendarDate, getCalendarDaysMatrix } from "../utils";
import CalendarContent from "./../Content";

const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const MonthView = ({
    calendarDays,
    month = new Date().getMonth() + 1,
    year = new Date().getFullYear(),
    classNames,
    monthBodyRenderer,
    dayClickHandler,
}) => {
    const monthTypeMapping = {
        current: "",
        prev: " prev-month",
        next: " next-month",
    };
    const date = new Date();
    const [today, currMonth, currYear] = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ];
    const isToday = (day) => {
        return day === today && month === currMonth && year === currYear;
    };

    const daysMatrix = calendarDays?.length
        ? calendarDays
        : getCalendarDaysMatrix({ month, year });

    return (
        <CalendarContent
            className={`month-view${
                classNames?.month ? ` ${classNames.month}` : ""
            }`}
        >
            <CalendarContent.Header>
                {({ Container, ...props }) =>
                    weekDays.map((day) => (
                        <Container
                            key={day}
                            {...props}
                            className={`${
                                props?.className ?? ""
                            } month-weekday`}
                        >
                            {day}
                        </Container>
                    ))
                }
            </CalendarContent.Header>
            <CalendarContent.Body
                classNames={{ row: classNames?.week }}
                rowCount={daysMatrix.length}
                colCount={daysMatrix[0].length}
            >
                {({ Container, row, column, ...props }) => {
                    const dayData = daysMatrix[row - 1][column - 1];
                    const { monthType, day } = dayData?.data ?? dayData;
                    return (
                        <Container
                            {...props}
                            className={`${props?.className ?? ""}${
                                monthTypeMapping[monthType]
                            }${
                                monthType === "current" && isToday(day)
                                    ? " today"
                                    : ""
                            }`}
                            onClick={(e) =>
                                dayClickHandler?.(
                                    e,
                                    getCalendarDate({
                                        monthType,
                                        day,
                                        month,
                                        year,
                                    })
                                )
                            }
                        >
                            <div className="month-head">
                                {`${day}`.padStart(2, "0")}
                            </div>
                            <div className="month-body" style={dayData?.style}>
                                {monthBodyRenderer?.({
                                    data: dayData,
                                    date: getCalendarDate({
                                        monthType,
                                        day,
                                        month,
                                        year,
                                    }),
                                    table: { row, column },
                                })}
                            </div>
                        </Container>
                    );
                }}
            </CalendarContent.Body>
        </CalendarContent>
    );
};

export default MonthView;

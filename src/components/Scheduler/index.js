import React, { useState } from "react";
import dayjs from "dayjs";
import Calendar, { CalendarHeader } from "./Calendar";
import StaffView from "./StaffView";
import TimelineView from "./TimelineView";
import DayAppointments from "./data/dayAppointments.json";
import WeekAppointments from "./data/weekAppointments.json";
import MonthAppointments from "./data/monthAppointments.json";
import DaySchedule from "./DaySchedule";
import WeekSchedule from "./WeekSchedule";
import MonthSchedule from "./MonthSchedule";
import { getCalendarDaysMatrix } from "./Calendar/utils";
import { ButtonGroup } from "@mui/material";
import Button from "UIComponents/Button";
import Icon from "components/IconComponent";
import AddModifyAppointment from "./AddModifyAppointment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const interval = 20,
    timeFormat = 12,
    startTime = "08:00 AM",
    endTime = "06:00 PM",
    isPositionVertical = true;

const getCalendarDateText = (type, date) => {
    switch (type) {
        case "week":
            return `${dayjs(getStartOfWeek(date)).format(
                "dddd, DD MMM YYYY"
            )} - ${dayjs(getStartOfWeek(date))
                .add(6, "day")
                .format("dddd, DD MMM YYYY")}`;
        case "month":
            return `${dayjs(date).format("MMMM YYYY")}`;
        default:
            return `${dayjs(date).format("dddd, DD MMM YYYY")}`;
    }
};

const slotDetails = {
    interval,
    startTime,
    endTime,
};

const getStartOfWeek = (date, type) => {
    let weekday = dayjs(date).day();
    weekday = weekday === 0 ? 7 : weekday;
    const startOfWeek = new Date(
        dayjs(date).year(),
        dayjs(date).month(),
        type === "prev"
            ? dayjs(date).date() - (weekday - 1) - 7
            : type === "next"
            ? dayjs(date).date() + (weekday - 1) + 7
            : dayjs(date).date() - (weekday - 1)
    );
    return startOfWeek;
};

const Scheduler = () => {
    const [date, setDate] = useState(new Date());
    const [activeBtn, setActiveBtn] = useState("month");
    const [showAddAppointmentModal, setShowAddAppointmentModal] =
        useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({});

    const customViewMapping = {
        staff: {
            title: "Staff",
            component: StaffView,
            props: {
                interval,
                timeFormat,
                endTime,
                startTime,
                isPositionVertical,
                date: { value: date, label: dayjs(date).format("DD MMM YYYY") },
            },
        },
        timeline: {
            title: "Timeline",
            component: TimelineView,
            props: {
                interval: 60,
                timeFormat,
                endTime,
                startTime,
                date: { value: date, label: dayjs(date).format("DD MMM YYYY") },
            },
        },
    };

    const calendarViewMapping = {
        day: {
            title: "Day",
            component: DaySchedule,
            props: {
                timeFormat,
                slotDetails,
                isPositionVertical,
                events: DayAppointments,
                date: { value: date, label: dayjs(date).format("DD MMM YYYY") },
                handleColumnDoubleClick: (_e, { hours, minutes }) => {
                    setAppointmentDetails({
                        startDateTime: dayjs(date)
                            .set("hour", hours)
                            .set("minutes", minutes)
                            .set("seconds", 0)
                            .toDate(),
                        endDateTime: dayjs(date)
                            .set("hour", hours)
                            .set("minutes", minutes + interval)
                            .set("seconds", 0)
                            .toDate(),
                    });
                    setShowAddAppointmentModal(true);
                },
            },
        },
        week: {
            title: "Week",
            component: WeekSchedule,
            props: {
                events: WeekAppointments,
                timeFormat,
                slotDetails,
                handleColumnClick: (e, newDate) => {
                    setDate(newDate);
                    setActiveBtn("day");
                },
                dates: new Array(7)
                    .fill(getStartOfWeek(date))
                    .map((val, index) => ({
                        value: dayjs(val).add(index, "day"),
                        label: dayjs(val)
                            .add(index, "day")
                            .format("DD MMM YYYY"),
                    })),
            },
        },
        month: {
            title: "Month",
            component: MonthSchedule,
            props: {
                events: MonthAppointments,
                calendarDays: getCalendarDaysMatrix({
                    month: dayjs(date).month() + 1,
                    year: dayjs(date).year(),
                }),
                month: dayjs(date).month() + 1,
                year: dayjs(date).year(),
                handleDayClick: (e, { day, month, year }) => {
                    e.preventDefault();
                    setDate(new Date(year, month - 1, day));
                    setActiveBtn("day");
                },
            },
        },
    };

    const ViewComponent = (
        calendarViewMapping[activeBtn] ?? customViewMapping[activeBtn]
    )?.component;
    const handleButtonClick = (type) => {
        setActiveBtn(type);
    };
    const handlePrevNextButtonClick = (type) => {
        if (activeBtn === "month") {
            setDate(
                dayjs(date)
                    .set("date", 1)
                    [type === "next" ? "add" : "subtract"](1, "month")
            );
        } else if (activeBtn === "week") {
            setDate(getStartOfWeek(date, type));
        } else {
            setDate(
                dayjs(date)[type === "next" ? "add" : "subtract"](1, "day")
            );
        }
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };
    return (
        <div className="scheduler">
            <Calendar>
                <CalendarHeader className="mB10">
                    <CalendarHeader.LeftContent>
                        <ButtonGroup aria-label="Calendar Buttons">
                            {Object.keys(calendarViewMapping).map((btn) => (
                                <Button
                                    key={btn}
                                    variant={
                                        activeBtn === btn
                                            ? "contained"
                                            : "outlined"
                                    }
                                    onClick={() => handleButtonClick(btn)}
                                >
                                    {calendarViewMapping[btn].title}
                                </Button>
                            ))}
                        </ButtonGroup>
                        {Object.keys(customViewMapping).map((btn) => (
                            <Button
                                key={btn}
                                variant={
                                    activeBtn === btn ? "contained" : "outlined"
                                }
                                onClick={() => handleButtonClick(btn)}
                            >
                                {customViewMapping[btn].title}
                            </Button>
                        ))}
                    </CalendarHeader.LeftContent>
                    <CalendarHeader.RightContent>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={date}
                                renderInput={({ inputRef, InputProps }) => (
                                    <>
                                        <p
                                            ref={inputRef}
                                            className="calendar-dateText"
                                        >
                                            {getCalendarDateText(
                                                activeBtn,
                                                date
                                            )}
                                        </p>
                                        {InputProps?.endAdornment}
                                    </>
                                )}
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>

                        <ButtonGroup className="mL20">
                            <Button
                                key="prev"
                                variant="outlined"
                                title={`Previous ${
                                    calendarViewMapping[activeBtn]?.title ??
                                    "Day"
                                }`}
                                aria-label={`Previous ${
                                    calendarViewMapping[activeBtn]?.title ??
                                    "Day"
                                }`}
                                onClick={() =>
                                    handlePrevNextButtonClick("prev")
                                }
                            >
                                <Icon type="caret-left" />
                            </Button>
                            <Button
                                key="next"
                                variant="outlined"
                                title={`Next ${
                                    calendarViewMapping[activeBtn]?.title ??
                                    "Day"
                                }`}
                                aria-label={`Next ${
                                    calendarViewMapping[activeBtn]?.title ??
                                    "Day"
                                }`}
                                onClick={() =>
                                    handlePrevNextButtonClick("next")
                                }
                            >
                                <Icon type="caret-right" />
                            </Button>
                        </ButtonGroup>
                        <Button
                            className="mL20"
                            onClick={() => setDate(dayjs())}
                        >
                            Today
                        </Button>
                    </CalendarHeader.RightContent>
                </CalendarHeader>
                <div className="viewContainer">
                    <ViewComponent
                        {...(
                            calendarViewMapping[activeBtn] ??
                            customViewMapping[activeBtn]
                        ).props}
                    />
                </div>
            </Calendar>
            <AddModifyAppointment
                type="add"
                open={showAddAppointmentModal}
                onClose={setShowAddAppointmentModal}
                showCurrentPatientDetails={false}
                appointmentDetails={appointmentDetails}
            />
        </div>
    );
};

export default Scheduler;

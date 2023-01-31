import React from "react";
import { Event as CalendarEvent } from "../Events";
import { Mark } from "../Marks";
import TimeScaleView from "../TimeScaleView";
import {
    getEventsParameters,
    getHourMinFromDate,
    getMarksParameters,
    getSlotHeight,
} from "../utils";

const TimeScaleViewWithMarksEvents = ({
    columns,
    marks = [],
    events = [],
    slotDetails,
    timeFormat,
    className,
    isPositionVertical,
    eventAccessor,
    markAccessor,
    markClickHandler,
    eventClickHandler,
    headerClickHandler,
    columnClickHandler,
    columnDoubleClickHandler,
    columnHeadRenderer,
    eventRenderer,
    EventComponent,
    getEventProps,
}) => {
    const Event = EventComponent ?? CalendarEvent;
    const slotHeight = getSlotHeight(slotDetails?.interval);
    return (
        <TimeScaleView
            columns={columns}
            endTime={slotDetails?.endTime}
            interval={slotDetails?.interval}
            startTime={slotDetails?.startTime}
            timeFormat={timeFormat}
            className={className}
            columnHeadRenderer={({ Container, columnData, ...props }) => {
                return (
                    <Container
                        {...props}
                        key={
                            columnData?.data?.id ??
                            columnData?.value ??
                            columnData
                        }
                        onClick={(e) =>
                            headerClickHandler?.(
                                e,
                                columnData?.data ??
                                    columnData?.value ??
                                    columnData
                            )
                        }
                        className={props?.className ?? ""}
                    >
                        {columnHeadRenderer?.(columnData) ?? (
                            <span
                                className={`${
                                    headerClickHandler ? "clickable" : ""
                                }`}
                            >
                                {columnData?.text ??
                                    columnData?.label ??
                                    columnData}
                            </span>
                        )}
                    </Container>
                );
            }}
            columnContentRenderer={({ Container, column, ...props }) => {
                const columnMarks = markAccessor
                    ? marks.find((mark) =>
                          markAccessor({ mark, column: column - 1, columns })
                      )?.marks
                    : marks;
                const columnEvents = eventAccessor
                    ? events.find((event) =>
                          eventAccessor({ event, column: column - 1, columns })
                      )?.events
                    : events;
                return (
                    <Container
                        {...props}
                        onClick={(e) =>
                            columnClickHandler?.(
                                e,
                                columns[column - 1].data ??
                                    columns[column - 1]?.value ??
                                    columns[column - 1]
                            )
                        }
                        onDoubleClick={(e) =>
                            columnDoubleClickHandler?.(
                                e,
                                columns[column - 1].data ??
                                    columns[column - 1]?.value ??
                                    columns[column - 1]
                            )
                        }
                    >
                        {columnMarks?.length > 0 &&
                            getMarksParameters({
                                data: columnMarks,
                                isPositionVertical,
                                slotHeight: getSlotHeight(
                                    slotDetails?.interval
                                ),
                                ...slotDetails,
                            }).map(({ data, ...props }, markIndex) => (
                                <Mark
                                    {...props}
                                    key={markIndex}
                                    style={{ backgroundColor: data.color }}
                                    onDoubleClick={
                                        data.isClickable
                                            ? (e) => markClickHandler(e, data)
                                            : null
                                    }
                                />
                            ))}
                        {columnEvents?.length > 0 &&
                            getEventsParameters({
                                data: columnEvents,
                                isPositionVertical,
                                slotHeight,
                                ...slotDetails,
                            }).map(({ data, ...props }, eventIndex) => (
                                <Event
                                    {...props}
                                    {...(EventComponent
                                        ? getEventProps?.(data)
                                        : {})}
                                    key={eventIndex}
                                    isPositionVertical={isPositionVertical}
                                    onClick={
                                        !data.readOnly
                                            ? (e) =>
                                                  eventClickHandler?.(e, data)
                                            : null
                                    }
                                >
                                    {eventRenderer?.headRenderer({
                                        Container: Event.Head,
                                        data,
                                    }) ?? (
                                        <Event.Head
                                            style={{
                                                color: "#fff",
                                                backgroundColor:
                                                    data.statusColor,
                                            }}
                                        >
                                            {data.status}
                                        </Event.Head>
                                    )}
                                    {eventRenderer?.bodyRenderer({
                                        Container: Event.Body,
                                        data,
                                    }) ?? (
                                        <Event.Body
                                            style={{
                                                backgroundColor: data.typeColor,
                                            }}
                                        >
                                            {getHourMinFromDate(data.startDate)
                                                .map((value) =>
                                                    value
                                                        .toString()
                                                        .padStart(2, 0)
                                                )
                                                .join(":")}
                                            <br />
                                            {getHourMinFromDate(data.endDate)
                                                .map((value) =>
                                                    value
                                                        .toString()
                                                        .padStart(2, 0)
                                                )
                                                .join(":")}
                                        </Event.Body>
                                    )}
                                </Event>
                            ))}
                    </Container>
                );
            }}
        />
    );
};

export default TimeScaleViewWithMarksEvents;

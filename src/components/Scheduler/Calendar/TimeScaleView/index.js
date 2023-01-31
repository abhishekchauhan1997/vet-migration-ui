import React from "react";
import CalendarContent from "../Content";
import { getTimeTicks } from "../utils";
import TimeScale from "./TimeScale";

const TimeScaleView = ({
    endTime,
    interval,
    startTime,
    tickFormat,
    timeFormat,
    columns = [],
    columnHeadRenderer,
    columnContentRenderer,
    className,
}) => {
    const timeTicks = getTimeTicks({
        startTime,
        endTime,
        interval,
        timeFormat,
    });
    return (
        <div className={`timeScale-view${className ? ` ${className}` : ""}`}>
            <TimeScale
                ticks={timeTicks}
                interval={interval}
                tickFormat={tickFormat}
                timeFormat={timeFormat}
            />
            <CalendarContent>
                <CalendarContent.Header>
                    {({ Container, ...props }) =>
                        columns.map(
                            (column) =>
                                columnHeadRenderer?.({
                                    columnData: column,
                                    Container,
                                    ...props,
                                }) ?? (
                                    <Container key={column} {...props}>
                                        {column}
                                    </Container>
                                )
                        )
                    }
                </CalendarContent.Header>
                <CalendarContent.Body rowCount={1} colCount={columns.length}>
                    {({ Container, row, column, ...props }) => {
                        return (
                            columnContentRenderer?.({
                                Container,
                                row,
                                column,
                                ...props,
                            }) ?? <Container {...props} />
                        );
                    }}
                </CalendarContent.Body>
            </CalendarContent>
        </div>
    );
};

export default TimeScaleView;

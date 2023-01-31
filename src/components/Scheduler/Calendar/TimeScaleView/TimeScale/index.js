import React from "react";
import { getFormattedTime, getHourlyTicks, getSlotHeight } from "../../utils";

const TimeScale = ({ ticks, interval, tickFormat, timeFormat = 12 }) => {
    const hourTicks = getHourlyTicks({ ticks, interval });
    return (
        <div className="timeScale">
            {hourTicks.map((ticks, hourTickIndex) => (
                <div key={hourTickIndex} className="hour-tick">
                    {ticks.map(
                        ({ hours, minutes, period }, intervalTickIndex) => (
                            <div
                                key={intervalTickIndex}
                                className="tick"
                                style={{
                                    minHeight: getSlotHeight(interval),
                                }}
                            >
                                {tickFormat?.(
                                    timeFormat === 12
                                        ? { hours, minutes, period }
                                        : { hours, minutes }
                                ) ??
                                    getFormattedTime({
                                        timeFormat,
                                        hours,
                                        minutes,
                                        period,
                                    })}
                            </div>
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export default TimeScale;

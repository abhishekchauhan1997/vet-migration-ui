import { getPositionDimension } from "./index";

export function getMarksParameters({
    data = [],
    startTime,
    interval,
    slotHeight,
    accessor,
    isPositionVertical = true,
}) {
    return getPositionDimension({
        data,
        startTime,
        interval,
        slotHeight,
        accessor,
        isPositionVertical,
    });
}

import {
    getPositionDimension,
    getEventsPositionInGroup,
    getEventsGroupByTime,
} from "./index";

export function getEventsParameters({
    data = [],
    startTime,
    interval,
    slotHeight,
    isPositionVertical = true,
}) {
    const [position, dimension] = !isPositionVertical
        ? ["y", "height"]
        : ["x", "width"];

    const eventsPositionDimension = getPositionDimension({
        data,
        startTime,
        interval,
        slotHeight,
        isPositionVertical,
    });

    const eventsGroupByTime = getEventsGroupByTime(
        eventsPositionDimension,
        (event) => event.data
    );
    const eventsPositionInGroup = eventsGroupByTime.map((eventGroup) =>
        getEventsPositionInGroup(eventGroup.events)
    );
    const eventsParameters = [];

    const getEventsFromGroup = (group, index, groupLength) => {
        group?.forEach((groupData, groupDataIndex) => {
            if (groupData?.length) {
                getEventsFromGroup(groupData, groupDataIndex, group.length);
            } else {
                eventsParameters.push({
                    ...groupData,
                    [dimension]: `${100 / groupLength}`,
                    [position]: `${(100 / groupLength) * index}`,
                });
            }
        });
    };
    getEventsFromGroup(eventsPositionInGroup, 0, eventsPositionInGroup.length);
    return eventsParameters;
}

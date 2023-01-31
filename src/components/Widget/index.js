import CpWidgetLoadingSkeleton from "components/Widget/LoadingSkeleton";
import React, { lazy, Suspense } from "react";
const CPWidget = lazy(() => import("./../CPWidget"));

const Widget = ({ widgetType }) => {
    return (
        <Suspense
            fallback={<CpWidgetLoadingSkeleton widgetType={widgetType} />}
        >
            {widgetType === "cpWidget" || widgetType === "cpWidgetClient" ? (
                <CPWidget />
            ) : widgetType === "otcWidget" ? (
                <div>otc widget</div>
            ) : null}
        </Suspense>
    );
};

export default Widget;

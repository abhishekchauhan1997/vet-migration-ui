import classnames from "classnames";
import React, { useState, useEffect } from "react";
import Button from "UIComponents/Button";

const RealTimeClock = ({ className, ...props }) => {
    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
    }, []);

    return (
        <Button
            size="small"
            variant="text"
            {...props}
            sx={{ fontWeight: 500 }}
            className={classnames("datetime_val", className)}
        >
            {dateState.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
            })}
        </Button>
    );
};

export default RealTimeClock;

import React from "react";

const CalendarHeader = ({
    children,
    leftContent,
    centerContent,
    rightContent,
    ...props
}) => {
    return (
        <div
            className={`calendar-header${
                props.className ? ` ${props.className}` : ""
            }`}
        >
            {children ? (
                children
            ) : (
                <>
                    <CalendarHeader.LeftContent>
                        {leftContent}
                    </CalendarHeader.LeftContent>
                    <CalendarHeader.CenterContent>
                        {centerContent}
                    </CalendarHeader.CenterContent>
                    <CalendarHeader.RightContent>
                        {rightContent}
                    </CalendarHeader.RightContent>
                </>
            )}
        </div>
    );
};

CalendarHeader.LeftContent = ({ children }) => {
    return <div className="calendar-header__leftContent">{children}</div>;
};

CalendarHeader.CenterContent = ({ children }) => {
    return <div className="calendar-header__centerContent">{children}</div>;
};

CalendarHeader.RightContent = ({ children }) => {
    return <div className="calendar-header__rightContent">{children}</div>;
};

export default CalendarHeader;

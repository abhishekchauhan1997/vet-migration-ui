import React from "react";

const CalendarContent = React.forwardRef(({ children, className }, ref) => {
    return (
        <div
            ref={ref}
            className={`calendar-content${className ? ` ${className}` : ""}`}
        >
            <table
                cellPadding="0"
                cellSpacing="0"
                className="calendar-content__table"
            >
                {children}
            </table>
        </div>
    );
});

CalendarContent.Header = ({ children, className }) => {
    return (
        <thead
            className={`calendar-content__header${
                className ? ` ${className}` : ""
            }`}
        >
            <tr className="calendar-content__row">
                {children?.({
                    Container: "th",
                    className: "calendar-content__cell",
                })}
            </tr>
        </thead>
    );
};

CalendarContent.Body = ({
    children,
    classNames,
    rowCount,
    colCount,
    ...props
}) => {
    let rows = [];
    for (let i = 1; i <= rowCount; i++) {
        let cols = [];
        for (let j = 1; j <= colCount; j++) {
            cols.push(
                children?.({
                    row: i,
                    column: j,
                    key: j,
                    Container: "td",
                    className: "calendar-content__cell",
                })
            );
        }
        rows.push(
            <tr
                key={i}
                className={`calendar-content__row${
                    classNames?.row ? ` ${classNames.row}` : ""
                }`}
                {...props}
            >
                {cols}
            </tr>
        );
    }
    return (
        <tbody
            className={`calendar-content__body${
                classNames?.body ? ` ${classNames.body}` : ""
            }`}
        >
            {rows}
        </tbody>
    );
};

export default CalendarContent;

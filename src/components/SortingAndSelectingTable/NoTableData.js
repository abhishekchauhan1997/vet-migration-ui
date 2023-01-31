import React from "react";

const NoTableData = ({ noDataAvailable }) => {
    return (
        <p
            style={{
                textAlign: "center",
                padding: "20px",
                color: "#3b4468",
            }}
        >
            {noDataAvailable}
        </p>
    );
};

export default NoTableData;

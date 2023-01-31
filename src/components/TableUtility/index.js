import { Tooltip, Zoom } from "@mui/material";
import Icon from "components/IconComponent";
import React from "react";
import Chip from "UIComponents/Chip";
import IconButton from "UIComponents/IconButton";
import TableContainer from "UIComponents/Table";
import { statusClrMapping } from "utils/appUtils";

// Wrap MyComponent to forward the ref as expected by Tooltip
export const WrappedIconComponent = React.forwardRef(
    function WrappedIconComponent(props, ref) {
        return <Icon {...props} inner={ref} />;
    }
);

export const TableHeader = ({ cols, className = "", ...props }) => {
    return (
        <TableContainer.TableHead
            sx={{
                backgroundColor: "gray",
            }}
        >
            <TableContainer.TableRows>
                {cols?.map((column, key) => (
                    <TableContainer.TableCell
                        key={key}
                        className={className}
                        align="justify"
                        sx={{
                            backgroundColor:
                                column.backgroundColor ?? "#F8F9FA",
                            color: column.clr ?? "#485276",
                            borderBottom: "none",
                            fontWeight: "600",
                            fontSize: "13px",
                            cursor: "default",
                            textAlign: "left",
                            textTransform: "capitalize",
                            width: column?.minWidth ?? "unset",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {column.label}
                        {column?.required && (
                            <b
                                style={{
                                    color: "red",
                                    fontSize: "18px",
                                    marginLeft: "2px",
                                }}
                            >
                                *
                            </b>
                        )}
                        {column?.tooltip && (
                            <Tooltip
                                title={column?.title}
                                placement="top"
                                arrow
                                TransitionComponent={Zoom}
                            >
                                <IconButton
                                    style={{ cursor: "default" }}
                                    disableFocusRipple={true}
                                    disableRipple={true}
                                    size="medium"
                                >
                                    <Icon
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                        }}
                                        type={column?.type}
                                        className={`emr_icon`}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                    </TableContainer.TableCell>
                ))}
            </TableContainer.TableRows>
        </TableContainer.TableHead>
    );
};

export const TableCellData = ({
    children,
    className = "",
    border = false,
    action,
    ...props
}) => {
    return (
        <TableContainer.TableCell
            className={className}
            sx={{
                ...(border
                    ? {
                          border: "1px solid rgba(224, 224, 224, 1)",
                      }
                    : {
                          borderBottom: "none",
                      }),
                fontSize: "13px",
                color: `${action ? "#0069C2" : "#485276"}`,
                textAlign: "left",
                cursor: `${action ? "pointer" : "default"}`,
                whiteSpace: "noWrap",
                ...props.style,
            }}
            {...props}
        >
            {children}
        </TableContainer.TableCell>
    );
};

export const TableCellWithChip = ({
    data,
    action,
    className = "",
    handler,
    ...props
}) => {
    return (
        <TableContainer.TableCell
            {...props}
            className={className}
            sx={{
                borderBottom: "none",
                fontSize: "13px",
                color: "#0069C2",
                textAlign: "left",
                whiteSpace: "noWrap",
            }}
        >
            <Chip
                onClick={handler}
                style={{
                    color:
                        statusClrMapping[data?.toUpperCase()]?.color ??
                        props?.color,
                    backgroundColor:
                        statusClrMapping[data?.toUpperCase()]?.bgColor ??
                        props?.bgColor,
                    borderRadius: "3px",
                    fontSize: "13px",

                    height: "20px",
                    textAlign: "center",
                    padding: "3px",
                    cursor: `${action ? "pointer" : "default"}`,
                }}
            >
                {data}
            </Chip>
        </TableContainer.TableCell>
    );
};

export const NoMatchedRecords = ({ caption }) => {
    return (
        <caption
            style={{
                textAlign: "center",
                color: "#3b4468",
            }}
        >
            {caption}
        </caption>
    );
};

export const TableIcon = ({
    action = true,
    type,
    color,
    title = "",
    handleClick,
    ...props
}) => {
    return action ? (
        <Tooltip title={title} placement="top" arrow TransitionComponent={Zoom}>
            <span>
                <IconButton onClick={handleClick} sx={{ color }} {...props}>
                    <Icon type={type} className={`emr_icon`} />
                </IconButton>
            </span>
        </Tooltip>
    ) : (
        <Icon type={type} style={{ color }} className={`emr_icon`} />
    );
};

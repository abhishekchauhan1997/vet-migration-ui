import { TableCell } from "@mui/material";
import React from "react";

function MyTableCell({ val, style = {}, align = "left", sx = {} }) {
    return (
        <TableCell
            colSpan={style.colS ?? 1}
            size="small"
            align={align}
            className={style.style ?? ""}
            sx={sx}
        >
            {val}
        </TableCell>
    );
}
export default MyTableCell;

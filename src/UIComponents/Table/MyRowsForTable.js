import { TableRow } from "@mui/material";
import React from "react";
import MyTableCell from "./MyTableCell";
import MyTable from "./MyTableCell";

const MyRowsForTable = ({
    data,
    style,
    gap = false, // for making empty row
    noData = false, // for making empty row with one cell value
    message = "",
    align = "left",
    fixed = false,
    sx = {},
}) => {
    const {
        fCell,
        sCell,
        tCell,
        foCell,
        fiCell,
        siCell,
        seCell,
        eiCell,
        niCell,
        teCell,
        elCell,
        twCell,
        thiCell,
        colS,
    } = data ?? {};

    let style1 = { ...style };
    if (colS) {
        style1 = { ...style, colS };
    } else if (sCell === null && !colS) {
        style1 = { ...style, colS: 2 };
    } else {
        style1 = { ...style, colS: 1 };
    }
    // console.log(message, noData);

    return (
        <>
            {noData ? (
                <>
                    {gap ? (
                        <TableRow>
                            <MyTableCell
                                val={""}
                                style={{ colS: colS }}
                                sx={{ padding: "1rem 0rem" }}
                            />
                        </TableRow>
                    ) : (
                        <TableRow>
                            <MyTableCell
                                val={message ?? ""}
                                style={{ ...style, colS: 11 }}
                                align={align}
                                sx={Object.values(sx)?.length ? { ...sx } : {}}
                            />
                        </TableRow>
                    )}
                </>
            ) : (
                <TableRow sx={{ pb: 1, mb: 1 }}>
                    {fCell !== (null || undefined) ? (
                        <MyTableCell
                            val={fCell ?? ""}
                            style={fixed ? { ...style } : { ...style1 }}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("fCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {sCell !== (null || undefined) && style1?.colS !== 2 ? (
                        <MyTable
                            val={sCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("sCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {tCell !== (null || undefined) ? (
                        <MyTable
                            val={tCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("tCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {foCell !== (null || undefined) ? (
                        <MyTable
                            val={foCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("foCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {fiCell !== (null || undefined) ? (
                        <MyTable
                            val={fiCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("fiCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {siCell !== (null || undefined) ? (
                        <MyTable
                            val={siCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("siCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {seCell !== (null || undefined) ? (
                        <MyTable
                            val={seCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("seCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {eiCell !== (null || undefined) ? (
                        <MyTable
                            val={eiCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("eiCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {niCell !== (null || undefined) ? (
                        <MyTable
                            val={niCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("niCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {teCell !== (null || undefined) ? (
                        <MyTable
                            val={teCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("teCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {elCell !== (null || undefined) ? (
                        <MyTable
                            val={elCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("elCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {twCell !== (null || undefined) ? (
                        <MyTable
                            val={twCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("twCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                    {thiCell !== (null || undefined) ? (
                        <MyTable
                            val={thiCell ?? ""}
                            style={{ ...style, colS } ?? {}}
                            align={align}
                            sx={
                                Object.values(sx)?.length &&
                                sx.hasOwnProperty("thiCell")
                                    ? { ...sx }
                                    : {}
                            }
                        />
                    ) : null}
                </TableRow>
            )}
        </>
    );
};

export default MyRowsForTable;

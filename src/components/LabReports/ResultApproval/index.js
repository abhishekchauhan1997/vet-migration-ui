import { Grid } from "@mui/material";
import Form from "components/GenForm";
import Checkbox from "components/GenForm/Checkbox";
import FormControlLabel from "components/GenForm/FormControlLabel";
import { Input } from "components/GenForm/Input";
import Icon from "components/IconComponent";
import React, { useState } from "react";
import Button from "UIComponents/Button";
import Dialog from "UIComponents/Dialog";
import IconButton from "UIComponents/IconButton";
import TableContainer from "UIComponents/Table";

const ResultApproval = ({ data, open, onClose }) => {
    const [sendMail, setSendMail] = useState(false);

    const handleFormSubmit = (data) => {
        console.log(data);
    };
    return (
        <Dialog
            open={open}
            PaperProps={{
                component: Form,
                lastElementId: sendMail ? "sendMail" : "email",
                onSubmit: handleFormSubmit,
            }}
        >
            <Dialog.DialogHeader>
                <Dialog.DialogTitle>{data.title}</Dialog.DialogTitle>
                <Dialog.DialogActions>
                    <IconButton aria-label="close" onClick={onClose}>
                        <Icon type="delete" />
                    </IconButton>
                </Dialog.DialogActions>
            </Dialog.DialogHeader>
            <Dialog.DialogContent id="inputFieldsContainer">
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        Date: 27 Aug 2022
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                        Provider: Allan Jones
                    </Grid>
                    <Grid item xs={6}>
                        Vetport Requisition: 2191
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                        Performed Date: Tue 08 Jun 2021 22:19:30
                    </Grid>
                    <Grid item xs={12} textAlign="right">
                        Zoetis Requisition: 370671
                    </Grid>
                    <Grid item xs={12}>
                        Client: ronald infisinty(518) , 1111111111
                    </Grid>
                    <Grid item xs={12}>
                        Patient: test(934), Canine (Dog), 1.4 Y,4.54 kg (10.0
                        lb)
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <TableContainer.Table
                                sx={{ minWidth: 750 }}
                                size={"medium"}
                            >
                                <TableContainer.TableHead>
                                    <TableContainer.TableRows>
                                        <TableContainer.TableCell>
                                            Name
                                        </TableContainer.TableCell>
                                        <TableContainer.TableCell>
                                            Result
                                        </TableContainer.TableCell>
                                        <TableContainer.TableCell>
                                            Units
                                        </TableContainer.TableCell>
                                        <TableContainer.TableCell>
                                            Indicator
                                        </TableContainer.TableCell>
                                        <TableContainer.TableCell>
                                            (Low - High)
                                        </TableContainer.TableCell>
                                    </TableContainer.TableRows>
                                </TableContainer.TableHead>
                                <TableContainer.TableBody>
                                    <TableContainer.TableRows>
                                        <TableContainer.TableCell colSpan={5}>
                                            Simulation Test
                                        </TableContainer.TableCell>
                                    </TableContainer.TableRows>
                                    <TableContainer.TableRows>
                                        <TableContainer.TableCell></TableContainer.TableCell>
                                        <TableContainer.TableCell></TableContainer.TableCell>
                                        <TableContainer.TableCell></TableContainer.TableCell>
                                        <TableContainer.TableCell></TableContainer.TableCell>
                                        <TableContainer.TableCell>
                                            ( - )
                                        </TableContainer.TableCell>
                                    </TableContainer.TableRows>
                                    <TableContainer.TableRows>
                                        <TableContainer.TableCell colSpan={5}>
                                            Comment : Accession # 866930
                                        </TableContainer.TableCell>
                                    </TableContainer.TableRows>
                                    <TableContainer.TableRows>
                                        <TableContainer.TableCell colSpan={5}>
                                            RunDate : 2021-06-08T10:55:00+00:00
                                        </TableContainer.TableCell>
                                    </TableContainer.TableRows>
                                </TableContainer.TableBody>
                            </TableContainer.Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            multiline
                            minRows={3}
                            maxRows={6}
                            type="text"
                            id="comments"
                            placeholder="Comments"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={4}>
                                <FormControlLabel
                                    checked={sendMail}
                                    onChange={({ target: { checked } }) => {
                                        setSendMail(checked);
                                    }}
                                    control={<Checkbox id="sendMail" />}
                                    label={"Send Mail"}
                                />
                            </Grid>
                            {!sendMail && (
                                <Grid item xs={12} md={8}>
                                    <Input
                                        type="text"
                                        placeholder="email"
                                        id="email"
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog.DialogContent>
            <Dialog.DialogActions>
                <Button variant="text" onClick={() => onClose(false)}>
                    {"Close"}
                </Button>
                <Button type="submit">{"Approve"}</Button>
                <Button type="submit">{"Approve & Go To EMR"}</Button>
            </Dialog.DialogActions>
        </Dialog>
    );
};

export default ResultApproval;

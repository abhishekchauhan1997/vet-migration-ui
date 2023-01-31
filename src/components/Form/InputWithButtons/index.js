import {
    FormHelperText,
    IconButton,
    Paper,
    Tooltip,
    Zoom,
} from "@mui/material";
import Input from "UIComponents/Input";
import TableContainer from "UIComponents/Table";
import Icon from "../../IconComponent";
import { TableCellData, TableHeader } from "../../TableUtility";
import { InputWithButton } from "../InputContainer";

const InputWithButtonForm = ({
    label,
    idx,
    field = {},
    value = "",
    cols = [],
    data = [],
    handleChange = () => {},
    handleEmailCopy = () => {},
    handleDeleteEmailCopy = () => {},
    handleFocusOnInput = () => {},
}) => {
    return (
        <Input.FormControl
            id={field.id}
            key={field.id}
            error={field.showHelperText ? true : false}
            className="form_input"
        >
            <Input.FormLabel required={field.required}>{label}</Input.FormLabel>
            <div>
                <InputWithButton
                    content={"Add Email"}
                    type={field.type}
                    name={field.name}
                    placeholder={field.label}
                    required={field.required}
                    onChange={(e) => handleChange(e, field.name)}
                    autoFocus={idx === 0}
                    handleClick={() => handleEmailCopy(field.name)}
                    value={value}
                    onFocus={(e) => handleFocusOnInput(e, field.name)}
                />
                {field.showHelperText && (
                    <FormHelperText className="error_helpertext">
                        {field.helperText}
                    </FormHelperText>
                )}
            </div>
            {/* // ** email copy table  */}
            {data?.length !== 0 && (
                <div className="w100 form_table_item overflow-hid">
                    <EmailFormTable
                        cols={cols}
                        celldata={data}
                        title="Remove"
                        type="delete"
                        headerStyle="w80"
                        handleDelete={handleDeleteEmailCopy}
                    />
                </div>
            )}
        </Input.FormControl>
    );
};

const EmailFormTable = ({
    title, // ** tooltip title
    type, // ** icon type
    cols = [],
    celldata = [],
    headerStyle = "",
    handleDelete = () => {},
}) => {
    return (
        <TableContainer component={Paper}>
            <TableContainer.Table stickyHeader aria-label="email_formTable">
                <TableHeader
                    cols={cols}
                    className={`${headerStyle}  form_table_header`}
                />
                <TableContainer.TableBody>
                    {celldata?.map((row, index) => {
                        return (
                            <TableContainer.TableRows key={index}>
                                <TableCellData
                                    children={row?.email}
                                    className=" form_table_cell"
                                    action={false}
                                />
                                <TableCellData
                                    children={
                                        <Tooltip
                                            title={title}
                                            placement="top"
                                            arrow
                                            TransitionComponent={Zoom}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    handleDelete(index)
                                                }
                                            >
                                                <Icon
                                                    type={type}
                                                    className="emr_icon clrR"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    className=" form_table_cell"
                                    action={true}
                                />
                            </TableContainer.TableRows>
                        );
                    })}
                </TableContainer.TableBody>
            </TableContainer.Table>
        </TableContainer>
    );
};

export default InputWithButtonForm;

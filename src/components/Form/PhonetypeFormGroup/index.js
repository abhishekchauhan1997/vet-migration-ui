import {
    FormHelperText,
    IconButton,
    Paper,
    Tooltip,
    Zoom,
} from "@mui/material";
import Autocomplete from "UIComponents/Autocomplete";
import Button from "UIComponents/Button";
import { Checkbox } from "UIComponents/Checkbox";
import Input from "UIComponents/Input";
import Radio from "UIComponents/Radio";
import TableContainer from "UIComponents/Table";
import Icon from "../../IconComponent";
import { TableCellData, TableHeader } from "../../TableUtility";

const PhonetypeFormTable = ({
    title,
    type,
    radioValue,
    cols = [],
    celldata = [],
    handleChange = () => {},
    handleRadioBtn = () => {},
    handleDelete = () => {},
    isPdescription = Boolean,
}) => {
    return (
        <TableContainer component={Paper}>
            <TableContainer.Table stickyHeader aria-label="phonetype_formTable">
                <TableHeader cols={cols} className={`minW form_table_header`} />
                <TableContainer.TableBody>
                    {celldata?.map((row, index) => {
                        return (
                            <TableContainer.TableRows
                                key={`${row?._id}${index + 1}`}
                            >
                                <TableCellData
                                    children={row?.title}
                                    className=" form_table_cell"
                                    action={false}
                                />
                                <TableCellData
                                    children={row?.pnumber}
                                    className=" form_table_cell"
                                    action={false}
                                />
                                {isPdescription && (
                                    <TableCellData
                                        children={
                                            <textarea
                                                type="textArea"
                                                name={`pdescription${
                                                    index + 1
                                                }`}
                                                id="phone_desc"
                                                className="text_area"
                                                placeholder="Description"
                                                value={row?.pdescription}
                                                onChange={(e) =>
                                                    handleChange(e, index)
                                                }
                                                rows={1}
                                                cols={5}
                                            ></textarea>
                                        }
                                        className=" form_table_cell"
                                        action={false}
                                    />
                                )}
                                <TableCellData
                                    children={
                                        <Tooltip
                                            title={
                                                radioValue === index + 1
                                                    ? "Default Number"
                                                    : "Make Default"
                                            }
                                            placement="top"
                                            arrow
                                            TransitionComponent={Zoom}
                                        >
                                            <div>
                                                <Radio
                                                    id="default"
                                                    name="default"
                                                    checked={
                                                        radioValue === index + 1
                                                    }
                                                    handleChange={(e) =>
                                                        handleRadioBtn(e, index)
                                                    }
                                                    value={index + 1}
                                                />
                                            </div>
                                        </Tooltip>
                                    }
                                    className=" form_table_cell"
                                    action={true}
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

const PhoneTypeFormGroup = ({
    radioValue,
    field = {},
    formData = {},
    phonetype = {},
    openSelectState = {},
    options = [],
    phonetypes = [],
    phonetypeColumns = [],
    handleChange = () => {},
    handleClick = () => {},
    handleInputChange = () => {},
    handleRadioBtn = () => {},
    handleDeletePhonetype = () => {},
    handleCheck = () => {},
    handlePdescription = () => {},
    handleOpenState = () => {},
    handleCloseState = () => {},
    loadingState = () => {},
    handleFocus = () => {},
    isPdescription = Boolean,
}) => {
    return (
        <Input.FormControl
            id={`${field.id}_formGroup`}
            key={field.id}
            className="form_input"
        >
            <Input.FormLabel
                required={field.required}
                error={
                    phonetypes.length === 0 &&
                    (phonetype === null || undefined) &&
                    field.showHelperText
                        ? true
                        : false
                }
            >
                {field.label}
            </Input.FormLabel>
            <div className={phonetype !== null ? "form_phonetype" : undefined}>
                <div>
                    <Autocomplete
                        options={options[field.name]}
                        name={field.name}
                        multiple={field.multiple}
                        required={field.required}
                        placeholder={"Phone type"}
                        freeSolo={field.freeSolo}
                        className={
                            phonetype === null
                                ? "form_input_width_small"
                                : undefined
                        }
                        value={formData[field.name]}
                        isOptionEqualToValue={(option, value) =>
                            option.title === value.title
                        }
                        handleChange={(e, value) =>
                            handleChange(value, field.name)
                        }
                        onOpen={(e) => handleOpenState(e, field.name)}
                        onClose={(e) => handleCloseState(e, field.name)}
                        loading={loadingState(field.name) ? true : false}
                        open={openSelectState[field.name]}
                        error={
                            phonetypes.length === 0 &&
                            (phonetype === null || undefined) &&
                            field.showHelperText
                                ? 1
                                : 0
                        }
                    />
                    {phonetypes.length === 0 &&
                        (phonetype === null || undefined) &&
                        field.showHelperText && (
                            <FormHelperText className="error_helpertext">
                                {field.helperText}
                            </FormHelperText>
                        )}
                </div>
                {(phonetype !== null || undefined) && (
                    <>
                        {field?.inputs.map((item, index) => {
                            if (item.type === "textarea") {
                                return (
                                    <div key={item.id}>
                                        <textarea
                                            key={item.id}
                                            type={item.type}
                                            name={item.name}
                                            id={item.id}
                                            className="text_area"
                                            placeholder={item.placeholder}
                                            onChange={(e) =>
                                                handleInputChange(e, item.name)
                                            }
                                            rows={1}
                                            cols={5}
                                        ></textarea>
                                    </div>
                                );
                            }

                            return (
                                <div key={item.id}>
                                    <input type="hidden" />
                                    <Input
                                        error={
                                            field.showHelperText ? true : false
                                        }
                                        key={item.id}
                                        type={item.type}
                                        name={item.name}
                                        id={item.id}
                                        placeholder={phonetype?.format}
                                        onChange={(e) =>
                                            handleInputChange(e, item.name)
                                        }
                                        onFocus={(e) =>
                                            handleFocus(e, field.name)
                                        }
                                    />
                                    {field.showHelperText && (
                                        <FormHelperText
                                            className="error_helpertext"
                                            style={{
                                                marginBottom: "-20px",
                                                whiteSpace: "nowrap",
                                                fontSize: "10px",
                                            }}
                                        >
                                            {field.helperText}
                                        </FormHelperText>
                                    )}
                                </div>
                            );
                        })}
                        <Button className="h40" onClick={handleClick}>
                            Add Phone
                        </Button>
                    </>
                )}
            </div>
            {phonetypes?.length !== 0 && (
                <div className="w100 form_table_item overflow-hid">
                    <PhonetypeFormTable
                        cols={phonetypeColumns}
                        celldata={phonetypes}
                        handleChange={handlePdescription}
                        handleRadioBtn={handleRadioBtn}
                        radioValue={radioValue}
                        handleDelete={handleDeletePhonetype}
                        isPdescription={isPdescription}
                        title="Remove"
                        type="delete"
                    />
                </div>
            )}
            {field.checkbox && (
                <div
                    className="flexC grid_layout"
                    style={{ marginTop: field.showHelperText ? "4px" : "0px" }}
                >
                    <Checkbox
                        id={field.checkbox.id}
                        name={field.checkbox.name}
                        checked={formData[field.checkbox.name]}
                        handleChange={(e) =>
                            handleCheck(e, field.checkbox.name)
                        }
                    />
                    <Input.FormLabel className="clrR">
                        {field.checkbox.label}
                    </Input.FormLabel>
                </div>
            )}
        </Input.FormControl>
    );
};

export default PhoneTypeFormGroup;

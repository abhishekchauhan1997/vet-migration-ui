import { Grid } from "@mui/material";
import Icon from "components/IconComponent";
import Input from "UIComponents/Input";

const FilterSearch = ({
    htmlFor,
    label,
    id,
    placeholder,
    value,
    setFilter,
}) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Grid container component={Input.FormControl}>
                    <Grid
                        item
                        xs={12}
                        sm={3}
                        htmlFor={htmlFor}
                        component={Input.FormLabel}
                    >
                        {label}
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Input
                            type={"search"}
                            id={id}
                            placeholder={placeholder}
                            value={value}
                            onChange={({ target: { value } }) =>
                                setFilter(value)
                            }
                            endAdornment={
                                <Icon
                                    style={{ paddingRight: "20px" }}
                                    type="search"
                                    className="emr_icon searchInput_icon"
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FilterSearch;

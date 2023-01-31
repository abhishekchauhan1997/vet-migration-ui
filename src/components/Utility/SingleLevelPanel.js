import {
    Avatar,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import List from "UIComponents/List";
import Icon from "../IconComponent";

const SingleLevelPanel = ({
    item,
    id,
    isSelected,
    loading,
    setSelectedKey,
    listItemClickHandler,
}) => {
    const handleSelectedMenuItems = () => {
        setSelectedKey(id);
        listItemClickHandler?.(id);
    };
    return (
        <NavLink to={item?.path ? item.path : ""}>
            <List.Item
                id={id}
                key={id}
                index={id}
                className={
                    isSelected === id || item?.default ? "mui_highlight" : ""
                }
                onClick={handleSelectedMenuItems}
            >
                {item?.icon && (
                    <ListItemIcon className="minW25">
                        <Icon type={item?.icon} />
                    </ListItemIcon>
                )}
                {item?.logo && (
                    <ListItemAvatar>
                        <Avatar
                            src={item.logo.imageUrl}
                            alt="clinic_logo"
                            sx={{ width: 38, height: 38 }}
                        ></Avatar>
                    </ListItemAvatar>
                )}
                <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                        color: `${
                            isSelected === id || item?.default
                                ? "#5157D4"
                                : "#3b4468"
                        }`,
                        fontSize: "15px",
                    }}
                />
            </List.Item>
        </NavLink>
    );
};

export default SingleLevelPanel;

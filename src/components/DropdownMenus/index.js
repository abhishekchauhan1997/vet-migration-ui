import { hasChildren } from "utils/appUtils";
import DropdownMenu from "./DropdownMenu";
import NoDropdown from "./NoDropdown";

const MenuItemBox = ({ item, id, menukey, showDivider, showIcon }) => {
    const Component = hasChildren(item) ? DropdownMenu : NoDropdown;
    return (
        <Component
            id={id}
            item={item}
            menukey={menukey}
            showDivider={showDivider}
            showIcon={showIcon}
        />
    );
};

export default MenuItemBox;

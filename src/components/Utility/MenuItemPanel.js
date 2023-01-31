import { hasChildren } from "utils/appUtils";
import MultiLevelPanel from "./MultiLevelPanel";
import SingleLevelPanel from "./SingleLevelPanel";

const MenuItemPanel = ({ item, ...props }) => {
    const Component = hasChildren(item) ? MultiLevelPanel : SingleLevelPanel;
    return <Component {...props} item={item} level={0} />;
};

export default MenuItemPanel;

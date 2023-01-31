import { ListItemIcon } from "@mui/material";
import React from "react";
import MenuItemPanel from "./MenuItemPanel";
import Accordion from "UIComponents/Accordion";
import Icon from "../IconComponent";

const MultiLevelPanel = ({
    id,
    item,
    isSelected,
    setSelectedKey,
    expanded,
    setExpanded,
    selectedItemExpandState,
    setSelectedItemExpandState,
    level = 0,
}) => {
    const { items: children } = item;

    const handleChange = (panel) => (event, isExpanded) => {
        setSelectedKey(isExpanded ? panel : false);
    };

    return (
        <Accordion
            id={id}
            expanded={isSelected === item?._id}
            onChange={handleChange(item?._id)}
        >
            <Accordion.Header style={{ color: "#3b4468", fontSize: "15px" }}>
                {item?.icon && (
                    <ListItemIcon className="minW25">
                        <Icon type={item?.icon} />
                    </ListItemIcon>
                )}
                <p>{item.title}</p>
            </Accordion.Header>
            <Accordion.Body>
                {children?.map((child) => (
                    <MenuItemPanel
                        id={child._id}
                        key={child._id}
                        item={child}
                        index={child._id}
                        isSelected={isSelected}
                        setSelectedKey={setSelectedKey}
                        expanded={expanded}
                        setExpanded={setExpanded}
                        selectedItemExpandState={selectedItemExpandState}
                        setSelectedItemExpandState={setSelectedItemExpandState}
                        level={level + 1}
                    />
                ))}
            </Accordion.Body>
        </Accordion>
    );
};

export default MultiLevelPanel;

//  return (
//      <>
//          <List onClick={handleClick}>
//              {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
//              <ListItemText primary={item.title} />
//              {open ? <ExpandLess /> : <ExpandMore />}
//          </List>
//          <Collapse in={open} timeout="auto" unmountOnExit>
//              <List component="div" disablePadding>
//                  {children.map((child, key) => (
//                      <MenuItemPanel key={key} item={child} />
//                  ))}
//              </List>
//          </Collapse>
//      </>
//  );

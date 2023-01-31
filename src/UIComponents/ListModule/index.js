import React from "react";
import classnames from "classnames";

const List = ({ children, className, ...props }) => {
  return (
    <ul {...props} className={classnames("des_lists", className)}>
      {children}
    </ul>
  );
};

List.ListItem = ({
  children,
  className,
  active = false,
  disabled = false,
  ...props
}) => {
  return (
    <li
      {...props}
      className={classnames("des_listItem", className, {
        active,
        disabled,
      })}
    >
      {children}
    </li>
  );
};

List.ListItemButton = ({
  children,
  className,
  active = false,
  disabled = false,
  ...props
}) => {
  return (
    <div
      role="button"
      {...props}
      className={classnames("des_listItemButton", className, {
        active,
        disabled,
      })}
    >
      {children}
    </div>
  );
};

List.ListItemIcon = ({ children, className, ...props }) => {
  return (
    <div {...props} className={classnames("des_listItemIcon", className, {})}>
      {children}
    </div>
  );
};

List.ListItemText = ({ primary, className, ...props }) => {
  return (
    <div {...props} className={classnames("des_listItemText", className)}>
      <span className="des_typography">{primary}</span>
    </div>
  );
};
export default List;

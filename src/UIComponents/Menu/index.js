import classnames from "classnames";

const Menu = ({ children, className, open, onClickOutside, id, ...props }) => {
    return (
        <>
            {open && (
                <>
                    <div
                        className="overlay"
                        onClick={() => onClickOutside()}
                    ></div>
                    <div
                        {...props}
                        id={id}
                        className={classnames("des_menu", className)}
                    >
                        {children}
                    </div>
                </>
            )}
        </>
    );
};

Menu.MenuList = ({
    children,
    className,
    active = false,
    disabled = false,
    ...props
}) => {
    return (
        <ul
            {...props}
            className={classnames("des_menuList", className, {
                active,
                disabled,
            })}
        >
            {children}
        </ul>
    );
};

Menu.MenuItem = ({
    children,
    className,
    active = false,
    disabled = false,
    ...props
}) => {
    return (
        <li
            {...props}
            className={classnames("des_menuItem", className, {
                active,
                disabled,
            })}
        >
            {children}
        </li>
    );
};

Menu.MenuItemIcon = ({ children, className, ...props }) => {
    return (
        <div {...props} className={classnames("des_menuItemIcon", className)}>
            {children}
        </div>
    );
};

export default Menu;

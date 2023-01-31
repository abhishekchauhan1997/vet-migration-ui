const ClickAwayListener = ({ children, open, onClickOutside }) => {
    return (
        <>
            {open && <div className="overlay" onClick={onClickOutside}></div>}
            {children}
        </>
    );
};

export default ClickAwayListener;

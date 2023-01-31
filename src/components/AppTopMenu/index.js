import Header from "components/Header";
import Widget from "components/Widget";
import useSessionContext from "hooks/useSessionContext";

const AppTopMenu = () => {
    const { widgetType } = useSessionContext();
    return (
        <div
            id="topMenuWrapper"
            className={widgetType ? `${widgetType}Wrapper` : ""}
        >
            <Header />
            <Widget widgetType={widgetType} />
        </div>
    );
};

export default AppTopMenu;

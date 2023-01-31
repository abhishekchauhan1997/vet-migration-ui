import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandPointRight,
    faDollarSign,
    faChartLine,
    faBullhorn,
    faFlask,
    faBoxOpen,
    faMedkit,
    faStore,
    faWrench,
    faCogs,
    faCircleQuestion,
    faBusinessTime,
    faUser,
    faUsers,
    faPowerOff,
    faCalendarCheck,
    faCamera,
    // faMortarBoard,
    faClipboard,
    faPaw,
    faBarcode,
    faBuilding,
    faTasks,
    faComments,
    faCalendar,
    faHome,
    faHistory,
    faNotesMedical,
    faStethoscope,
    faFileText,
    faFileCirclePlus,
    faHouseMedicalCircleExclamation,
    faNewspaper,
    faUserTie,
    faLink,
    faEyeDropper,
    faCalculator,
    faFileInvoiceDollar,
    faFilePrescription,
    faCopy,
    faFilter,
    // faCopyright,
    faPrint,
    faCertificate,
    faClock,
    faPaperPlane,
    faMessage,
    faWallet,
    faEye,
    faEyeSlash,
    faCoins,
    faSquareUpRight,
    faPlus,
    faPlusCircle,
    faEdit,
    faClose,
    faRemove,
    faPhone,
    faShuffle,
    faUserTag,
    faUndo,
    faBox,
    faExpand,
    faPrescription,
    faBasketShopping,
    faCreditCardAlt,
    faCreditCard,
    faWeightHanging,
    faPercent,
    faMoneyBills,
    faPencilSquare,
    faCircleDollarToSlot,
    faInfoCircle,
    faWarning,
    faFileUpload,
    faFileDownload,
    faCaretLeft,
    faCaretRight,
    faCheck,
    faPercentage,
    faCog,
    faTrash,
    faArrowsUpDownLeftRight,
    faMagnifyingGlass,
    faUserMd,
    faChain,
    faQuestion,
    faDownLeftAndUpRightToCenter,
    faFilePdf,
    faEnvelope,
    faLeftRight,
    faUpDown,
    faMale,
    faFemale,
    faMars,
    faVenus,
    faVenusMars,
    faCheckCircle,
    faMoneyCheckDollar,
    faFloppyDisk,
    faHospital,
    faMedal,
    faMailReply,
    faAngleDown,
    faCirclePlus,
    faCircleXmark,
    faXmark,
    faPaperclip,
    faFileCircleCheck,
    faRotateRight,
    faMinus,
    faO,
    faA,
    faGraduationCap,
    faComment,
    faStamp,
} from "@fortawesome/free-solid-svg-icons";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import CopyrightIcon from "@mui/icons-material/Copyright";
import classnames from "classnames";
import "./icon_styles.scss";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import HelpIcon from "@mui/icons-material/Help";

const Icon = ({ type, className, ...props }) => {
    const iconMapping = {
        whiteboard: {
            icon: faClipboard,
            library: "fontawesome",
        },
        flask: {
            icon: faFlask,
            library: "fontawesome",
        },
        mailRead: {
            icon: faMailReply,
            library: "fontawesome",
        },
        medal: {
            icon: faMedal,
            library: "fontawesome",
        },
        hospital: {
            icon: faHospital,
            library: "fontawesome",
        },
        dollar: {
            icon: faDollarSign,
            library: "fontawesome",
        },
        checkDollar: {
            icon: faMoneyCheckDollar,
            library: "fontawesome",
        },
        filter: {
            icon: faFilter,
            library: "fontawesome",
        },
        male: {
            icon: faMale,
            library: "fontawesome",
        },
        floppyDisk: {
            icon: faFloppyDisk,
            library: "fontawesome",
        },
        female: {
            icon: faFemale,
            library: "fontawesome",
        },
        checkCircle: {
            icon: faCheckCircle,
            library: "fontawesome",
        },
        mars: {
            icon: faMars,
            library: "fontawesome",
        },
        venus: {
            icon: faVenus,
            library: "fontawesome",
        },
        venusMars: {
            icon: faVenusMars,
            library: "fontawesome",
        },
        userMd: {
            icon: faUserMd,
            library: "fontawesome",
        },
        search: {
            icon: faMagnifyingGlass,
            library: "fontawesome",
        },
        users: {
            icon: faUsers,
            library: "fontawesome",
        },
        check: {
            icon: faCheck,
            library: "fontawesome",
        },
        chain: {
            icon: faChain,
            library: "fontawesome",
        },
        trash: {
            icon: faTrash,
            library: "fontawesome",
        },
        move: {
            icon: faArrowsUpDownLeftRight,
            library: "fontawesome",
        },
        handpoint: {
            icon: faHandPointRight,
            library: "fontawesome",
        },
        bullhorn: {
            icon: faBullhorn,
            library: "fontawesome",
        },
        boxopen: {
            icon: faBoxOpen,
            library: "fontawesome",
        },
        chartline: {
            icon: faChartLine,
            library: "fontawesome",
        },
        medkit: {
            icon: faMedkit,
            library: "fontawesome",
        },
        store: {
            icon: faStore,
            library: "fontawesome",
        },
        wrench: {
            icon: faWrench,
            library: "fontawesome",
        },
        cogs: {
            icon: faCogs,
            library: "fontawesome",
        },
        cog: {
            icon: faCog,
            library: "fontawesome",
        },
        help: {
            icon: faCircleQuestion,
            library: "fontawesome",
        },
        clock: {
            icon: faBusinessTime,
            library: "fontawesome",
        },
        user: {
            icon: faUser,
            library: "fontawesome",
        },
        scheduler: {
            icon: faCalendarCheck,
            library: "fontawesome",
        },
        camera: {
            icon: faCamera,
            library: "fontawesome",
        },
        invDollar: {
            icon: faFileInvoiceDollar,
            library: "fontawesome",
        },
        rxPrescription: {
            icon: faFilePrescription,
            library: "fontawesome",
        },
        logout: {
            icon: faPowerOff,
            library: "fontawesome",
        },
        paw: {
            icon: faPaw,
            library: "fontawesome",
        },
        barcode: {
            icon: faBarcode,
            library: "fontawesome",
        },
        building: {
            icon: faBuilding,
            library: "fontawesome",
        },
        tasks: {
            icon: faTasks,
            library: "fontawesome",
        },
        comms: {
            icon: faComments,
            library: "fontawesome",
        },
        calendar: {
            icon: faCalendar,
            library: "fontawesome",
        },
        dashboard: {
            icon: faHome,
            library: "fontawesome",
        },
        history: {
            icon: faHistory,
            library: "fontawesome",
        },
        notes: {
            icon: faNotesMedical,
            library: "fontawesome",
        },
        assess: {
            icon: faStethoscope,
            library: "fontawesome",
        },
        exam: {
            icon: faFileText,
            library: "fontawesome",
        },
        reason: {
            icon: faHouseMedicalCircleExclamation,
            library: "fontawesome",
        },
        encounter: {
            icon: faNewspaper,
            library: "fontawesome",
        },
        attachment: {
            icon: faPaperclip,
            library: "fontawesome",
        },
        power: {
            icon: faPowerOff,
            library: "fontawesome",
        },
        client: {
            icon: faUserTie,
            library: "fontawesome",
        },
        link: {
            icon: faLink,
            library: "fontawesome",
        },
        calculator: {
            icon: faCalculator,
            library: "fontawesome",
        },
        "eye-dropper": {
            icon: faEyeDropper,
            library: "fontawesome",
        },
        copy: {
            icon: faCopy,
            library: "fontawesome",
        },
        login: {
            icon: LoginIcon,
            library: "material",
        },
        helpIcon: {
            icon: HelpIcon,
            library: "material",
        },
        menuIcon: {
            icon: MenuIcon,
            library: "material",
        },
        copyright: {
            icon: CopyrightIcon,
            library: "material",
        },
        printer: {
            icon: faPrint,
            library: "fontawesome",
        },
        certificate: {
            icon: faCertificate,
            library: "fontawesome",
        },
        alarm: {
            icon: faClock,
            library: "fontawesome",
        },
        send: {
            icon: faPaperPlane,
            library: "fontawesome",
        },
        messages: {
            icon: faMessage,
            library: "fontawesome",
        },
        wallet: {
            icon: faWallet,
            library: "fontawesome",
        },
        eye: {
            icon: faEye,
            library: "fontawesome",
        },
        "eye-slash": {
            icon: faEyeSlash,
            library: "fontawesome",
        },
        coins: {
            icon: faCoins,
            library: "fontawesome",
        },
        "pull-right": {
            icon: faSquareUpRight,
            library: "fontawesome",
        },
        add: {
            icon: faPlus,
            library: "fontawesome",
        },
        "add-circle": {
            icon: faPlusCircle,
            library: "fontawesome",
        },
        edit: {
            icon: faEdit,
            library: "fontawesome",
        },
        close: {
            icon: faClose,
            library: "fontawesome",
        },
        delete: {
            icon: faRemove,
            library: "fontawesome",
        },
        percentage: {
            icon: faPercentage,
            library: "fontawesome",
        },
        phone: {
            icon: faPhone,
            library: "fontawesome",
        },
        shuffle: {
            icon: faShuffle,
            library: "fontawesome",
        },
        assign: {
            icon: faUserTag,
            library: "fontawesome",
        },
        undo: {
            icon: faUndo,
            library: "fontawesome",
        },
        box: {
            icon: faBox,
            library: "fontawesome",
        },
        expand: {
            icon: faExpand,
            library: "fontawesome",
        },
        prescription: {
            icon: faPrescription,
            library: "fontawesome",
        },
        basket: {
            icon: faBasketShopping,
            library: "fontawesome",
        },
        "credit-card-alt": {
            icon: faCreditCardAlt,
            library: "fontawesome",
        },
        visa: {
            icon: faCreditCard,
            library: "fontawesome",
        },
        law: {
            icon: faWeightHanging,
            library: "fontawesome",
        },
        percent: {
            icon: faPercent,
            library: "fontawesome",
        },
        cash: {
            icon: faMoneyBills,
            library: "fontawesome",
        },
        pencil: {
            icon: faPencilSquare,
            library: "fontawesome",
        },
        "coin-dollar": {
            icon: faCircleDollarToSlot,
            library: "fontawesome",
        },
        info: {
            icon: faInfoCircle,
            library: "fontawesome",
        },
        warning: {
            icon: faWarning,
            library: "fontawesome",
        },
        upload: {
            icon: faFileUpload,
            library: "fontawesome",
        },
        download: {
            icon: faFileDownload,
            library: "fontawesome",
        },
        hyphen: {
            icon: HorizontalRuleRoundedIcon,
            library: "material",
        },
        "caret-left": {
            icon: faCaretLeft,
            library: "fontawesome",
        },
        "caret-right": {
            icon: faCaretRight,
            library: "fontawesome",
        },
        compress: {
            icon: faDownLeftAndUpRightToCenter,
            library: "fontawesome",
        },
        pdf: {
            icon: faFilePdf,
            library: "fontawesome",
        },
        mail: {
            icon: faEnvelope,
            library: "fontawesome",
        },
        leftRight: {
            icon: faLeftRight,
            library: "fontawesome",
        },
        upDown: {
            icon: faUpDown,
            library: "fontawesome",
        },
        angleDown: {
            icon: faAngleDown,
            library: "fontawesome",
        },
        circlePlus: {
            icon: faCirclePlus,
            library: "fontawesome",
        },
        circleXmark: {
            icon: faCircleXmark,
            library: "fontawesome",
        },
        xmark: {
            icon: faXmark,
            library: "fontawesome",
        },
        "file-circle-plus": {
            icon: faFileCirclePlus,
            library: "fontawesome",
        },
        "paper-clip": {
            icon: faPaperclip,
            library: "fontawesome",
        },
        fallback: {
            icon: faQuestion,
            library: "fontawesome",
        },
        fileCheck: {
            icon: faFileCircleCheck,
            library: "fontawesome",
        },
        "rotate-right": {
            icon: faRotateRight,
            library: "fontawesome",
        },
        minus: {
            icon: faMinus,
            library: "fontawesome",
        },
        o: {
            icon: faO,
            library: "fontawesome",
        },
        a: {
            icon: faA,
            library: "fontawesome",
        },
        "graduation-cap": {
            icon: faGraduationCap,
            library: "fontawesome",
        },
        comment: {
            icon: faComment,
            library: "fontawesome",
        },
        stamp: {
            icon: faStamp,
            library: "fontawesome",
        },
    };

    // if no icon matches type, default to fallback icon
    if (!iconMapping[type])
        return (
            <FontAwesomeIcon
                icon={iconMapping["fallback"].icon}
                {...props}
                className={classnames("icon", className)}
            />
        );

    if (iconMapping[type]?.library === "fontawesome") {
        return (
            <FontAwesomeIcon
                icon={iconMapping[type].icon}
                {...props}
                className={classnames("icon", className)}
            />
        );
    } else {
        const IconComponent = iconMapping[type]?.icon;

        return (
            <IconComponent
                {...props}
                sx={{
                    width: "15px",
                    height: "15px",
                    fontSize: "15px",
                }}
                className={classnames("icon", className)}
            />
        );
    }
};

export default Icon;

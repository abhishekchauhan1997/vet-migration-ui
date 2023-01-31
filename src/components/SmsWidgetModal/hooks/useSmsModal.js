import { useState } from "react";

const useSmsModal = () => {
    const [openSmsModal, setOpenSmsModal] = useState(false);
    const [phonetype, setPhoneType] = useState({});
    const handlePnumberClick = (item) => {
        setPhoneType(item);
        setOpenSmsModal(true);
    };
    const onClose = () => {
        setOpenSmsModal(false);
    };
    return {
        handlePnumberClick,
        onClose,
        openSmsModal,
        phonetype,
        setOpenSmsModal,
        setPhoneType,
    };
};

export default useSmsModal;

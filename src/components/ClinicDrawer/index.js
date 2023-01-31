import Drawer from "UIComponents/Drawer";
import { MenuHeader } from "../SideNavigationMenu";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import SingleLevelPanel from "../Utility/SingleLevelPanel";
import axios from "axios";
import { API_BASENAME, API_BASEURL, API_ENABLED } from "utils/constants";
import LoadingSkeleton from "./LoadingSkeleton";
import { useCallback } from "react";
import useSessionOverwrite from "hooks/useSessionOverwrite";

const ClinicDrawer = ({ openDrawer, onClose, clinicId }) => {
    const { handleClinicClickFun } = useSessionOverwrite();
    const [clinics, setClinics] = useState([]);
    const [selectedId, setSelectedId] = useState(clinicId);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(() => {
        setLoading(true);
        axios
            .get(
                `${API_BASEURL}${API_BASENAME}/clinic/registration/fetch/type-status/1?type=5&_p=name,clinicLogo`
            )
            .then(({ data }) => {
                const item = data.map((clinic) => ({
                    _id: clinic._id,
                    path: "/dashboard",
                    logo: clinic.clinicLogo,
                    title: clinic.name,
                    default: false,
                }));
                setClinics(item);
            })
            .catch((error) => {
                throw new Error(error);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (API_ENABLED) {
            if (clinics?.length === 0 && openDrawer) {
                fetchData();
            }
        }
    }, [clinics?.length, fetchData, openDrawer]);

    const listItemClickHandler = useCallback(
        (id) => {
            handleClinicClickFun(id);
            onClose();
        },
        [handleClinicClickFun, onClose]
    );

    return (
        <Drawer isOpen={openDrawer} onClose={onClose} className="pR4">
            <MenuHeader
                title="Select Clinic"
                onClose={onClose}
                disabled={true}
            />
            <Divider />
            <div style={{ paddingTop: "20px" }} className="ovrflw-auto">
                {loading ? (
                    <LoadingSkeleton logo={true} />
                ) : (
                    clinics?.map((item) => (
                        <SingleLevelPanel
                            key={item._id}
                            item={item}
                            id={item._id}
                            activeIndex={item._id}
                            isSelected={selectedId ?? clinicId}
                            setSelectedKey={setSelectedId}
                            listItemClickHandler={listItemClickHandler}
                            loading={loading}
                        />
                    ))
                )}
            </div>
        </Drawer>
    );
};

export default ClinicDrawer;

//  const setActiveClincBgHighlight = (id) => {
//      let originalClinics = [...clinics];
//      let activeParam = {
//          key: "default",
//          value: true,
//      };
//      let [activeItem, activeIndex] = computedArray(
//          originalClinics,
//          activeParam
//      );
//      activeItem.default = false;
//      let currentParam = {
//          key: "_id",
//          value: id,
//      };
//      let [currentItem, currentIndex] = computedArray(
//          originalClinics,
//          currentParam
//      );
//      currentItem.default = true;
//      originalClinics?.splice(currentIndex, 1, currentItem);
//      originalClinics?.splice(activeIndex, 1, activeItem);
//      setClinics(originalClinics);
//  };

//  const updateClinic = useCallback(async () => {
//      let originalClinics = [...clinics];
//      let activeParam = {
//          key: "default",
//          value: true,
//      };
//      let [activeItem, activeIndex] = computedArray(clinics, activeParam);
//      await axios.put(
//          `${API_BASEURL}${API_BASENAME}/clinic/update_clinicById/${activeItem._id}`,
//          {
//              default: false,
//          }
//      );
//      let data = await axios.put(
//          `${API_BASEURL}${API_BASENAME}/clinic/update_clinicById/${selectedId}`,
//          { default: true }
//      );
//      if (data) {
//          setClinic(data);
//          // const USERINFO = getItemLocal("userInfo");
//          // setItemLocal("userInfo", {
//          //     ...USERINFO,
//          //     clinic_session: data._id,
//          // });
//          const SESSION = getItemSession("session");
//          setItemSession("session", { ...SESSION, clinic_session: data._id });
//          navigate("/");
//          onClose();
//          let currentParam = {
//              key: "_id",
//              value: data._id,
//          };
//          let [currentItem, currentIndex] = computedArray(
//              originalClinics,
//              currentParam
//          );
//          activeItem.default = false;
//          currentItem.default = true;
//          originalClinics?.splice(currentIndex, 1, currentItem);
//          originalClinics?.splice(activeIndex, 1, activeItem);
//          setClinics(originalClinics);
//      }
//  }, [clinics, navigate, onClose, selectedId, setClinic]);

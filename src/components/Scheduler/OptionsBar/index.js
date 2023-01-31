import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Autocomplete from "UIComponents/Autocomplete";
import { API_BASEURL, API_BASENAME } from "utils/constants";
import useGetPageDataContext from "hooks/usePageDataContext";

const OptionsBar = () => {
    const [clinicsList, setClinicsList] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState({});
    const { clinics } = useGetPageDataContext();
    useEffect(() => {
        if (clinics.length === 0) {
            axios
                .get(`${API_BASEURL}${API_BASENAME}/get_clinics`)
                .then((response) => setClinicsList(response.data));
        } else {
            setClinicsList(clinics);
        }
    }, [clinics]);

    return (
        <Grid container>
            <Grid item>
                {/* <Autocomplete options={clinicsList} handleChange={} /> */}
            </Grid>
        </Grid>
    );
};

export default OptionsBar;

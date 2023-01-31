import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getItemSession } from "./../utils/appUtils";
// import { API_ENABLED } from "utils/constants";

const RequestInterceptor = () => {
  const interceptorId = useRef(null);
  useEffect(() => {
    interceptorId.current = axios.interceptors.request.use(
      (config) => {
        const { headers } = config;
        let session_data = getItemSession("session");
        const userInfo = window.btoa(JSON.stringify(session_data));
        headers.userInfo = userInfo;
        config.withCredentials = true;
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptorId.current);
    };
  }, []);
};

const ResponseInterceptor = () => {
  const navigate = useNavigate();

  const interceptorId = useRef(null);

  useEffect(() => {
    interceptorId.current = axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        switch (error.response?.status) {
          // case 401:
          //     navigate("/login");
          //     return Promise.reject(error);
          // case 404:
          //     return Promise.reject(error);
          case 515:
            navigate("/login");
            return Promise.reject(error);
          default:
            // if (API_ENABLED) navigate("/login");
            return Promise.reject(error);
        }
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptorId.current);
    };
  }, [navigate]);

  return "";
};

export { RequestInterceptor, ResponseInterceptor };

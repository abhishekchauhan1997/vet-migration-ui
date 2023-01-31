import {
  Fragment,
  Suspense,
  lazy,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  BrowserRouter as AppRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import { DefaultRoute, Routes as AppRoutes } from "./routes";

// ** Layouts
// import AppLayout from "layouts/AppLayout";
// import BlankLayout from "layouts/BlankLayout";
// import LayoutWrapper from "layouts/LayoutWrapper";

import {
  RequestInterceptor,
  ResponseInterceptor,
} from "./../config/AxiosInterceptor";
// import useAuth from "hooks/useAuth";
// import { API_ENABLED } from "utils/constants";
// import { getAllowedPages } from "utils/appUtils";
// import AccessDenied from "components/AccessDenied/AccessDenied";
// import { PermissionContext } from "context/permissionContext";
// import PageNotFound from "pages/misc/PageNotFound";

// const Layouts = {};
// const DEFAULT_LAYOUT = "AppLayout";

// const layoutRoutesAndPaths = (layout) => {
//   let layoutRoutes = [];
//   layoutRoutes = AppRoutes.filter(
//     (route) =>
//       route.layout === layout ||
//       (route.layout === undefined && DEFAULT_LAYOUT === layout)
//   );
//   return layoutRoutes;
// };

// const PrivateRoutes = () => {
//   const { isLoggedIn } = useAuth();

//   const location = useLocation();
//   return !API_ENABLED || (API_ENABLED && isLoggedIn) ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" replace state={{ from: location }} />
//   );
// };

const FinalRoute = ({ route }) => {
  return <route.component {...route} />;
};

// const ComponentWrapper = ({ route }) => {
//   const { loading, permissions } = useContext(PermissionContext);

//   let allowedUrls = getAllowedPages(permissions);
//   const checkAllow = allowedUrls?.map((item) => item?.path);

//   let allow = checkAllow?.includes(route?.path);

//   // comment this condition to not get accesDenied in development phase

//   if (
//     process.env.NODE_ENV !== "development" &&
//     // TODO: remove when permission is fixed
//     process.env.NODE_ENV !== "production" &&
//     !allow &&
//     route?.path !== "/login" &&
//     !loading
//   ) {
//     let accesDenied = {
//       ...route,
//       component: lazy(() => import("pages/misc/AccessDenied")),
//     };
//     route = accesDenied;
//   }

//   return route.layout === "BlankLayout" ? (
//     <FinalRoute route={route} />
//   ) : (
//     // <LayoutWrapper>
//     //     <Suspense fallback={null}>
//     //         <FinalRoute route={route} />
//     //     </Suspense>
//     // </LayoutWrapper>
//     <></>
//   );
// };

// const resolveRoutes = () => {
//   return Object.keys(Layouts).map((layout, index) => {
//     const LayoutTag = Layouts[layout];
//     const layoutRoutes = layoutRoutesAndPaths(layout);
//     let publicRoutes = [],
//       privateRoutes = [];

//     layoutRoutes.forEach((route) =>
//       route.private ? privateRoutes.push(route) : publicRoutes.push(route)
//     );

//     const getRoute = (route) => (

//         <Route
//         key={route.path}
//         path={route.path}
//         index={route.path === "/"}
//         exact={route.exact === true}
//         element={
//           <LayoutTag>
//             <ComponentWrapper route={route} />
//           </LayoutTag>
//         }
//       />
//     );

//     return (
//       <Fragment key={layout}>
//         {publicRoutes.map(getRoute)}
//         {privateRoutes.length > 0 && (
//           <Route key={index} element={<PrivateRoutes />}>
//             {privateRoutes.map(getRoute)}
//           </Route>
//         )}
//       </Fragment>
//     );
//   });
// };

const Router = () => {
  return (
    <AppRouter>
      <RequestInterceptor />
      <ResponseInterceptor />
      <Routes>
        <Route exact path="/" render={() => <Navigate to={DefaultRoute} />} />

        {/* {resolveRoutes()} */}
        <Route path="*" element={<>PageNotFound</>} />
      </Routes>
    </AppRouter>
  );
};

export default Router;

import { lazy } from "react";

const AppRoutes = [
  //   {
  //     path: "/",
  //     // component: lazy(() => import("pages/Dashboard")),
  //     component: lazy(() => import("pages/widget/cpWidget/EMRview")),
  //     layout: "AppLayout",
  //     exact: true,
  //     private: true,
  //   },
  {
    path: "/dashboard",
    // !Redirect to emr view, until the dashboard is completed
    // component: lazy(() => import("pages/Dashboard")),
    component: lazy(() => import("/")),
    layout: "AppLayout",
    exact: true,
    private: true,
  },
];

export default AppRoutes;

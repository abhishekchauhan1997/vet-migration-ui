import AppRoutes from "./App";
// import HeaderNavigationRoutes from "./HeaderNavigation";
// import SideNavigationRoutes from "./SideNavigation";
// import StaffNavigationRoutes from "./StaffMenuNavigation";
// import WidgetRoutes from "./Widget";

// ** Default Route
const DefaultRoute = "/";

// ** Merge Routes
const Routes = [
  ...AppRoutes,
  // ...HeaderNavigationRoutes,
  // ...SideNavigationRoutes,
  // ...WidgetRoutes,
  // ...StaffNavigationRoutes,
];

export { DefaultRoute, Routes };

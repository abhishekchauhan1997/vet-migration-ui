// import "./App.scss";
// import Router from "./router/Router";

import { Grid } from "@mui/material";
// import Home from "../src/Pages/home";

import Home from "../src/Pages/PostCard/AddClient";
import logo from "./xvlogo.png";

const App = () => (
  //   <div className="container">
  //     Hello
  //     <img src={logo} alt="Xcelvations Logo" height="40" />
  //     {/* <Home /> */}
  //   </div>

  <Grid>
    <Home />
  </Grid>
);

export default App;

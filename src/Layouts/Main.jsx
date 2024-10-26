import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";

function Main() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Main;

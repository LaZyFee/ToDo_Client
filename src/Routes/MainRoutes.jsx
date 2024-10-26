import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Signup from "../Pages/Authentication/Signup";
import Login from "../Pages/Authentication/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

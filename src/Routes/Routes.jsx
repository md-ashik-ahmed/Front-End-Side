import { createBrowserRouter } from "react-router-dom";
// import NotFoundPage from "../../Pages/NotFoundPage";
import Main from "../Layout/Main/Main";
import Register from "../../src/pages/Register/Register";
import Login from "../../src/pages/Login/Login";
import Dashboard from "../../src/pages/Dashboard/Dashboard";
import Home from "../../src/pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
]);

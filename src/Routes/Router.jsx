import { createBrowserRouter } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/AuthenticationPages/Login";
import Register from "../Pages/AuthenticationPages/Register";
import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AddScholarship from "../DashboardPages/AddScholarship";
import AllScholarship from "../Pages/AllScholarship";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/allscholarship",
        Component: AllScholarship,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { path: "addScholarship", element: <AddScholarship></AddScholarship> },
    ],
  },
]);
export default router;

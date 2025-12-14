import { createBrowserRouter } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/AuthenticationPages/Login";
import Register from "../Pages/AuthenticationPages/Register";
import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AllScholarship from "../Pages/AllScholarship";
import Myprofile from "../DashboardPages/Myprofile";
import AddScholarship from "../DashboardPages/AdminDashboard/AddScholarship";
import DetailedScholarship from "../Pages/DetailedScholarship";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentFail from "../Pages/PaymentFail";
import AdminRoute from "./AdminRoute";
import MyApllications from "../DashboardPages/StudentDashboard/MyApllications";

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
      },{
        path:'/payment-success',
        Component:PaymentSuccess
      },{
        path:'/payment-cancel',
        Component:PaymentFail
      },
      {
        path: "/scholarship/:id",
        element: (
          <PrivateRoute>
            <DetailedScholarship></DetailedScholarship>
          </PrivateRoute>
        ),
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
      { path: "addScholarship",
         element: <AdminRoute><AddScholarship></AddScholarship></AdminRoute> },
      {
        path: "my-profile",
        Component: Myprofile,
      },
      {
        path: "mangeScholarships",
      },{
       path:"myapplications",
       element:<MyApllications></MyApllications>
      }
    ],
  },
]);
export default router;

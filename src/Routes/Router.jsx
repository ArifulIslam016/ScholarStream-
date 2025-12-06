import { createBrowserRouter } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/AuthenticationPages/Login";
import Register from "../Pages/AuthenticationPages/Register";
import RootLayout from "../Layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[{
      index:true,
      Component:Home
    },
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/register',
        Component:Register
      }
    ]
  },
]);
export default router;

import { createBrowserRouter } from "react-router";
import Navbar from "../Components/Navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Navbar,
  },
]);
export default router;

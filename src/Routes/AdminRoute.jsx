import React from "react";
import useUserRoleHooks from "../hooks/UserRoleHooks";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";
import { Navigate } from "react-router";
import useAuthhooks from "../hooks/Authhooks";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useUserRoleHooks();
  const{logOut}=useAuthhooks()
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
if(role!=='admin'){
    logOut()
}
  return children;
};

export default AdminRoute;

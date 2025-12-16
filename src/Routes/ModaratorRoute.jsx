import React from "react";
import useAuthhooks from "../hooks/Authhooks";
import useUserRoleHooks from "../hooks/UserRoleHooks";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

const ModaratorRoute = ({children}) => {
  const { role, isLoading } = useUserRoleHooks();
  const { logOut } = useAuthhooks();
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  if (role !=="moderator") {
    logOut();
  }
  return children;
};

export default ModaratorRoute;

import React from 'react';
import useAuthhooks from '../hooks/Authhooks';
import LoadingPage from '../Pages/LoadingPage/LoadingPage';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,userLoading}=useAuthhooks()
    const location=useLocation()
    if(userLoading){
        return <LoadingPage></LoadingPage>
    }
    if(!user){
     return <Navigate state={location.pathname}  to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;
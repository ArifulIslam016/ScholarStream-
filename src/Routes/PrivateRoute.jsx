import React from 'react';
import useAuthhooks from '../hooks/Authhooks';
import { useNavigate } from 'react-router';
import LoadingPage from '../Pages/LoadingPage/LoadingPage';

const PrivateRoute = ({children}) => {
    const navigate=useNavigate()
    const {user,userLoading}=useAuthhooks()
    if(userLoading){
        return <LoadingPage></LoadingPage>
    }
    if(!user){
     return   navigate('/login')
    }
    return children;
};

export default PrivateRoute;
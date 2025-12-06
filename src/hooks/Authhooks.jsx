import React, { use } from 'react';
import { Authcontext } from '../Contexts/AuthContext/AuthContext';

const useAuthhooks = () => {
    const AuthInfo=use(Authcontext)
    // console.log(AuthInfo)
    return AuthInfo;
};

export default useAuthhooks;
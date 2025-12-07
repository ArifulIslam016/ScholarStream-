import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Authcontext } from "./AuthContext";
import { auth } from "../../../firebase";
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserloading] = useState(true);
  const CreateUser = (email, password) => {
    setUserloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setUserloading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSocialLogin = () => {
    setUserloading(true);

    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const UpdateUserProfile = (UpdatedInfo) => {
    return updateProfile(auth.currentUser, UpdatedInfo);
  };
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      setUserloading(false);
    });
    return () => {
      unsubcribe();
    };
  }, []);
  const AuthInfo = {
    CreateUser,
    signInUser,
    googleSocialLogin,
    logOut,
    user,
   userLoading,
    UpdateUserProfile,
  };
  return <Authcontext value={AuthInfo}>{children}</Authcontext>;
};

export default AuthProvider;

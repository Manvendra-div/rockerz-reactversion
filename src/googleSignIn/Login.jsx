import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../redux/LoginSlice/LoginPopupSlice";
import { setUser } from "../redux/LoginSlice/LoginSlice";
const Login = ({cardState}) => {
  const dispatch = useDispatch()
  const [UIError,setUIError] = useState("")
  const value = useSelector((state)=>state.loginState.user)
  const handleGoogleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      dispatch(setUser(data.user));
    }).catch((err) => {
      setUIError(err.message)
    });
  };
  return (
    <Transition
      appear
      show={cardState}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed z-40 h-screen w-screen flex justify-center items-center bg-black bg-opacity-40 top-0 left-0"
      onClick={() => {
        dispatch(closePopup());
      }}
    >
        <Transition.Child
        className="w-[90%] md:w-[50%] backdrop-blur-lg bg-white/10 rounded-xl py-3 border border-gray-300 shadow-2xl flex flex-col justify-center items-center"
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
      {value?.email}
      {UIError}
      <button onClick={handleGoogleClick}>Sign In With Google</button></Transition.Child>
    </Transition>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { Transition } from "@headlessui/react";
const Login = ({cardState,toggleFunc}) => {
  const [value, setvalue] = useState("");
  const handleGoogleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setvalue(data.user.email);
      console.log(data.user);
      localStorage.setItem("email", data.user.email);
    });
  };
  useEffect(() => {
    setvalue(localStorage.getItem("email"));
  }, []);
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
        toggleFunc(false);
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
      {value}
      <button onClick={handleGoogleClick}>Sign In With Google</button></Transition.Child>
    </Transition>
  );
};

export default Login;

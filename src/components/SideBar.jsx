import React, { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaGoogle, FaHistory } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { doContract, doExpand } from "../redux/ToggleSlice/SideBarToggleSlice";
import { showPopup } from "../redux/LoginSlice/LoginPopupSlice";
const SideBar = () => {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state) => state.sideBarToggle.value);
  const isLogined = useSelector((state) => state.loginState.user);
  const buttonRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      buttonRef.current.classList.toggle("animate-ping", !isExpanded);
    }, 10000);
    return () => clearInterval(interval);
  }, [isExpanded]);
  return (
    <aside
      className={`${
        isExpanded ? "w-[60%] md:w-[20%]" : "w-[15%] md:w-[6%]"
      } z-10 fixed top-24 flex justify-center items-center transition-all duration-300`}
    >
      <div className="backdrop-blur-xl bg-white/10 w-full rounded-r-md px-2 py-1">
        {isLogined ? (
          <div className="text-xs md:text-sm italic text-center">
            <button
              className={`flex justify-evenly items-center text-red-400 not-italic font-semibold bg-black/40 hover:bg-black/80 rounded-md ${
                isExpanded ? "px-12 md:px-14" : "px-3"
              } my-1 py-1.5 w-full transition-all duration-300`}
            >
              <FcLike className={`${isExpanded ? "text-lg" : "text-2xl"}`} />
              {isExpanded && <p className="md:mt-1">Liked Songs</p>}
            </button>{" "}
            <button
              className={`flex justify-evenly items-center text-blue-400 not-italic font-semibold bg-black/40 hover:bg-black/80 rounded-md ${
                isExpanded ? "px-12 md:px-14" : "px-3"
              } my-1 py-1.5 w-full transition-all duration-300`}
            >
              <FaHistory className={`${isExpanded ? "text-lg" : "text-2xl"}`} />{" "}
              {isExpanded && <p className="md:mt-0.5">Last Session</p>}
            </button>
          </div>
        ) : (
          <>
            <button
              className={`shadow-lg p-2 rounded-md ${
                isExpanded ? "m-2" : "m-0.5"
              } backdrop-blur-lg bg-black/60 hover:bg-black/80 w-[90%] flex justify-evenly items-center transition-all duration-300`}
              onClick={
                isExpanded
                  ? () => {
                      dispatch(showPopup());
                    }
                  : () => dispatch(doExpand())
              }
            >
              {isExpanded ? (
                <>
                  <FaGoogle /> <p>Login with Google</p>
                </>
              ) : (
                <FaGoogle />
              )}
            </button>
            <div
              className={`text-xs md:text-sm italic text-center ${
                isExpanded ? "block" : "hidden"
              }`}
            >
              login to enable features like
              <div className="flex justify-evenly items-center text-red-400 not-italic font-semibold opacity-50 bg-black/60 hover:bg-black/80 rounded-md px-14 my-1 py-1.5 cursor-not-allowed">
                <FcLike className="text-lg" />
                <p className="mt-1">Liked Songs</p>
              </div>{" "}
              <div className="flex justify-evenly items-center text-blue-400 not-italic font-semibold opacity-50 bg-black/60 hover:bg-black/80 rounded-md px-14 my-1 py-1.5 cursor-not-allowed">
                <FaHistory className="text-lg" />{" "}
                <p className="mt-0.5">Last Session</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="relative flex justify-center items-center">
        <button
          ref={buttonRef}
          className="absolute -left-2 md:-left-4 text-2xl md:text-3xl"
          onClick={
            isExpanded
              ? () => dispatch(doContract())
              : () => dispatch(doExpand())
          }
        >
          {isExpanded ? (
            <IoIosArrowDropleftCircle />
          ) : (
            <IoIosArrowDroprightCircle />
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;

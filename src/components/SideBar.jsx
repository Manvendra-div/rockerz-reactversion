import React, { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
        isExpanded ? "w-[45%] md:w-[20%]" : "w-[10%] md:w-[3%]"
      } z-10 fixed top-24 flex justify-center items-center transition-all duration-300`}
    >
      <div className="backdrop-blur-xl bg-white/10 w-full rounded-r-md h-[30vh] md:h-[45vh]">
        <button
          className={`shadow-lg p-2 rounded-md ${
            isExpanded ? "m-2" : "m-0.5"
          } backdrop-blur-lg bg-black/60 hover:bg-black/80 w-[90%] flex justify-evenly items-center transition-all duration-300`}
          onClick={isExpanded ? ()=>{} : () => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <FaGoogle /> Login with Google
            </>
          ) : (
            <FaGoogle />
          )}
        </button>
        <p className={`text-xs md:text-sm italic text-center ${isExpanded ? "block" : "hidden"}`}>login to enable features like <span className="text-red-400">Liked Songs</span> and <span className="text-blue-400">Last Session</span></p>
      </div>
      <div className="relative flex justify-center items-center">
        <button
          ref={buttonRef}
          className="absolute -left-2 md:-left-4 text-2xl md:text-3xl"
          onClick={() => setIsExpanded(!isExpanded)}
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

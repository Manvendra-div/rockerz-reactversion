import Brand from "../assets/Brand.svg";
import { MdOutlineShare } from "react-icons/md";
import ShareCard from "./ShareCard";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
const NavBar = ({ toggleNotification, addNotifyContent }) => {
  const [shareCardtoggle, setshareCardtoggle] = useState(false);
  const [navBrand,setnavBrand] = useState(false);
  useEffect(() => {
      setTimeout(() => setnavBrand(true), 100);
  }, []);
  return (
    <>
      <ShareCard
        toggleFunc={setshareCardtoggle}
        cardState={shareCardtoggle}
        pushNoti={toggleNotification}
        addContentNoti={addNotifyContent}
      />
      <div className="navHeader">
      <Transition
          show={navBrand}
          className="navResponsive"
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-[-10px]"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <a className="" href="/">
            <img src={Brand} className="w-[80%] hover:animate-pulse" alt="" />
          </a>
          <button className="shareBtn" onClick={() => setshareCardtoggle(true)}>
            <MdOutlineShare size={20} />
          </button>
        </Transition>
      </div>
    </>
  );
};

export default NavBar;

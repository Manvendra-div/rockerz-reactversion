import Brand from "../assets/Brand.svg";
import { MdOutlineShare } from "react-icons/md";
import ShareCard from "./ShareCard";
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
const NavBar = ({ toggleNotification, addNotifyContent }) => {
  const [shareCardtoggle, setshareCardtoggle] = useState(false);
  return (
    <>
      <ShareCard
        toggleFunc={setshareCardtoggle}
        cardState={shareCardtoggle}
        pushNoti={toggleNotification}
        addContentNoti={addNotifyContent}
      />
      <div className="navHeader">
        <div className="navResponsive">
          <div className="">
            <img src={Brand} className="w-[80%]" alt="" />
          </div>
          <button className="shareBtn" onClick={() => setshareCardtoggle(true)}>
            <MdOutlineShare size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;

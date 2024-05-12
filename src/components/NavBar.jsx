import Brand from "../assets/Brand.svg";
import { MdOutlineShare } from "react-icons/md";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DialogTemplate from "./Dialog";
import { showDialog } from "../redux/ToggleSlice/DialogToggleSlice";
const NavBar = ({ toggleNotification, addNotifyContent }) => {
  const dispatch = useDispatch();
  const [navBrand, setnavBrand] = useState(false);
  useEffect(() => {
    setTimeout(() => setnavBrand(true), 100);
  }, []);
  return (
    <>
      <DialogTemplate
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

          <button
            className="backdrop-blur-lg bg-gray-500/20 hover:bg-gray-600/20 shadow-lg hover:active:shadow-md px-4 py-2 rounded-md text-white flex justify-center border focus-within:border-[#EA580C] focus-within:ring focus-within:ring-[#EA580C] focus-within:ring-opacity-40 dark:border-gray-700 dark:focus-within:border-[#EA580C];"
            onClick={() => dispatch(showDialog())}
          >
            <MdOutlineShare size={20} />
          </button>
        </Transition>
      </div>
    </>
  );
};

export default NavBar;

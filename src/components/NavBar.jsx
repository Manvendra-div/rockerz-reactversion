import Brand from "../assets/Brand.svg";
import { MdOutlineShare } from "react-icons/md";
const NavBar = () => {
  return (
    <div className="sticky top-0 flex justify-center items-center backdrop-blur-lg bg-white/10 px-5 py-3 rounded-b-lg shadow-lg w-full z-20">
      <div className="flex justify-between items-center w-[95%] md:w-[85%] 2xl:w-[1440px]">
        <div className="">
          <img src={Brand} className="w-[80%]" alt="" />
        </div>
        <button className="mx-3 backdrop-blur-lg bg-gray-500/20 hover:bg-gray-600/20 shadow-lg hover:active:shadow-md p-2 rounded-md w-[15%] md:w-[5%] text-white flex justify-center border focus-within:border-[#EA580C] focus-within:ring focus-within:ring-[#EA580C] focus-within:ring-opacity-40 dark:border-gray-700 dark:focus-within:border-[#EA580C]">
          <MdOutlineShare size={20} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;

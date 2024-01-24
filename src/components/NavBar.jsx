import Brand from "../assets/Brand.svg";
import { MdOutlineShare } from "react-icons/md";
const NavBar = () => {
  return (
    <div className="navHeader">
      <div className="navResponsive">
        <div className="">
          <img src={Brand} className="w-[80%]" alt="" />
        </div>
        <button className="shareBtn">
          <MdOutlineShare size={20} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;

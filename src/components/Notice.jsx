import React, { useState } from "react";
import { IoClose,IoArrowForwardOutline } from "react-icons/io5";
import { TypeAnimation } from "react-type-animation";

const Notice = () => {
  const [cleanNotice, setcleanNotice] = useState(true);
  const handleClick = () => {
    const subject = 'Sharing Thoughts on Rockerz WEB';
    const content = 'start typing something';
    const recipient = 'ms1577239@gmail.com';
    const emailLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`;
    window.location.href = emailLink;
  };
  return (
    cleanNotice && (
      <div className="sticky z-20 flex justify-between items-center p-4 bg-blue-500 w-full cursor-pointer" onClick={()=>handleClick()}>
        <div className="flex justify-center items-center">
        <TypeAnimation
            sequence={[
              " ",
              500,
              "Share your Thoughts 🧠 with Developer",
              700,
              "Say Hey 👋 to the Developer",
              500,
              `Enjoy Your Music 🎸`,
              900,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={false}
            className="text-lg lg:text-xl"
          />
          <IoArrowForwardOutline className="mx-2 text-base lg:text-lg"/>
          </div>
        <IoClose
            size={30}
            className="cursor-pointer mx-2"
            onClick={(e) => {
              e.stopPropagation()
              setcleanNotice(false);
            }}
          />
      </div>
    )
  );
};

export default Notice;

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  FaXTwitter,
  FaFacebook,
  FaLinkedin,
  FaCopy,
  FaTelegram,
} from "react-icons/fa6";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
const ShareCard = ({ toggleFunc, pushNoti, addContentNoti }) => {
  const shareData = `
🎵 Explore Rockerz WEB

Discover music like never before with Rockerz WEB! 🚀 Your go-to search engine for chart-toppers, classics, and hidden gems. Unleash the musical magic, hit play, and share the vibe with friends. Rock on! 🤘
`;

  const projectUrl = "https://rockerzwebreact.netlify.app";
  async function copyTextToClipboard(text) {
    return await navigator.clipboard.writeText(text);
  }
  const copyBtn = () => {
    pushNoti(true);
    addContentNoti("link has been copied to clipboard");
    navigator.clipboard
      .writeText(`${projectUrl}\n\n${shareData}`)
      .then(() => {})
      .catch(() => {
        addContentNoti("failed to copy link to clipboard");
      });
    setTimeout(() => {
      pushNoti(false);
    }, 4000);
  };
  return (
    <>
      <div className="fixed z-40 h-screen w-screen flex justify-center items-center bg-black bg-opacity-40">
        <div className="w-[90%] md:w-[50%] bg-[#3a3a3b] rounded-xl p-3 border border-gray-300 shadow-2xl flex flex-col justify-center items-center">
          <div className="flex justify-between w-full">
            <span className="font-semibold text-sm md:text-lg m-3">
              Share this project with your friends
            </span>
            <IoClose
              size={20}
              className="cursor-pointer"
              onClick={() => {
                toggleFunc(false);
              }}
            />
          </div>
          <div className="m-3 p-4 rounded-xl bg-gray-600 w-[98%] xl:w-[95%] mx-3 border-[1px] border-black flex justify-between items-center">
            <WhatsappShareButton title={shareData} url={projectUrl}>
              <WhatsappIcon className="w-10 xl:w-20" round />
            </WhatsappShareButton>
            <TelegramShareButton title={shareData} url={projectUrl}>
              <TelegramIcon className="w-10 xl:w-20" round />
            </TelegramShareButton>
            <TwitterShareButton title={shareData} url={projectUrl}>
              <XIcon className="w-10 xl:w-20" round />
            </TwitterShareButton>
            <FacebookShareButton title={shareData} url={projectUrl}>
              <FacebookIcon className="w-10 xl:w-20" round />
            </FacebookShareButton>
            <LinkedinShareButton title={shareData} url={projectUrl}>
              <LinkedinIcon className="w-10 xl:w-20" round />
            </LinkedinShareButton>
            <button
              className="hidden md:block bg-gray-500 p-3 rounded-xl shadow-xl focus:shadow border-transparent border-[1px] focus-within:border-[#EA580C]"
              onClick={() => {
                copyBtn();
              }}
            >
              <FaCopy className="text-lg xl:text-4xl" />
            </button>
          </div>
          <span className="p-3 text-sm xl:text-xl">
            Made with ❤️ by{" "}
            <a
              href="https://aboutmanvendra.netlify.app"
              className="text-emerald-500 underline"
            >
              Manvendra
            </a>
          </span>
          {}
        </div>
      </div>
    </>
  );
};

export default ShareCard;

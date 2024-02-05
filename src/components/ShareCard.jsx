import React, { Fragment, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCopy } from "react-icons/fa6";
import parse from "html-react-parser";
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
import { Transition } from "@headlessui/react";
const shareData = `
🎵 Explore Rockerz WEB

Discover music like never before with Rockerz WEB! 🚀 Your go-to search engine for chart-toppers, classics, and hidden gems. Unleash the musical magic, hit play, and share the vibe with friends. Rock on! 🤘
`;

const projectUrl = "https://rockerzwebreact.netlify.app";
async function copyTextToClipboard(text) {
  return await navigator.clipboard.writeText(text);
}
const cardContent = {
  title: "Share this project with your friends",
  content: (
    <div className="flex flex-wrap justify-between items-center w-full mx-5">
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
  ),
};
const ShareCard = ({
  toggleFunc,
  pushNoti,
  addContentNoti,
  cardState,
  contentOfCard = cardContent,
}) => {
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
        <div className="flex justify-between w-full">
          <span className="font-semibold text-sm md:text-lg m-3 overflow-x-hidden whitespace-nowrap w-[80%]">
            <p
              className={`${
                contentOfCard.title?.length > 37 ? "hover:animate-marquee" : ""
              }`}
            >
              {parse(contentOfCard.title)}
            </p>
          </span>
          <IoClose
            size={30}
            className="cursor-pointer mx-2"
            onClick={() => {
              toggleFunc(false);
            }}
          />
        </div>

        <div className="my-3 py-4 backdrop-blur-sm bg-black/30 border-y-[1px] border-black flex flex-wrap justify-center items-center w-full">
          {contentOfCard.content}
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
      </Transition.Child>
    </Transition>
  );
};

export default ShareCard;

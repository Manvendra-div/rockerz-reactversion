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
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDialog,
  setDialogData,
} from "../redux/ToggleSlice/DialogToggleSlice";
const shareData = `
🎵 Explore Rockerz WEB

Discover music like never before with Rockerz WEB! 🚀 Your go-to search engine for chart-toppers, classics, and hidden gems. Unleash the musical magic, hit play, and share the vibe with friends. Rock on! 🤘
`;

const projectUrl = "https://rockerzwebreact.netlify.app";

const DialogTemplate = ({ pushNoti, addContentNoti }) => {
  const dispatch = useDispatch();
  const cardState = useSelector((state) => state.dialogSlice.state);
  const contentOfCard = useSelector((state) => state.dialogSlice.content);
  const externalTitle = useSelector((state) => state.dialogSlice.title);
  const copyBtn = (pushAlert, addContentAlert) => {
    pushAlert(true);
    addContentAlert("link has been copied to clipboard");
    setTimeout(() => {
      pushAlert(false);
    }, 4000);
  };
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
        <CopyToClipboard
          text={`${projectUrl}\n\n${shareData}`}
          onCopy={() => copyBtn(pushNoti, addContentNoti)}
        >
          <button className="backdrop-blur-sm bg-white/10 p-3 rounded-xl shadow-xl focus:shadow border-gray-400 border-[1px] focus-within:border-[#EA580C]">
            <FaCopy className="text-lg xl:text-4xl" />
          </button>
        </CopyToClipboard>
      </div>
    ),
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
        dispatch(closeDialog());
        setTimeout(
          () =>
            dispatch(setDialogData({ title: undefined, content: undefined })),
          300
        );
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
                contentOfCard === undefined
                  ? cardContent?.title
                  : contentOfCard?.title
              }`}
            >
              {contentOfCard === undefined
                ? parse(cardContent.title)
                : parse(externalTitle)}
            </p>
          </span>
          <IoClose
            size={30}
            className="cursor-pointer mx-2"
            onClick={() => {
              dispatch(closeDialog());
            }}
          />
        </div>

        <div className="my-3 py-4 backdrop-blur-sm bg-black/30 border-y-[1px] border-black flex flex-wrap justify-center items-center w-full">
          {contentOfCard === undefined ? cardContent.content : contentOfCard}
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

export default DialogTemplate;

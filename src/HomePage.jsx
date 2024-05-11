import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Login from "./googleSignIn/Login";
import Hero from "./components/Hero";
import { Transition } from "@headlessui/react";
import Footer from "./components/Footer";
import Player from "./components/Player";
import Notify from "./components/Notify";
import Loading from "./components/LoadingAnimation";
import { useSelector } from "react-redux";

const HomePage = () => {
  const loadingState = useSelector((state) => state.loadingState.value);
  const appearPlayer = useSelector((state) => state.player.value);
  const [isNotify, setIsNotifyVisible] = useState(false);
  const [triggerPlayernew, settriggerPlayernew] = useState(0);
  const [notifyContent, setNotifyContent] = useState("");
  const [loginPopup, setLoginPopup] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-between items-center min-h-screen">
        <NavBar
          toggleNotification={setIsNotifyVisible}
          addNotifyContent={setNotifyContent}
          loginPopup={setLoginPopup}
        />
        {loginPopup && (
          <Login cardState={loginPopup} toggleFunc={setLoginPopup} />
        )}
        <div className={`flex justify-between items-center w-full h-full`}>
          <SideBar />
          <Hero
            toggleNotification={setIsNotifyVisible}
            addNotifyContent={setNotifyContent}
            playnewsong={triggerPlayernew}
            setplaynewsong={settriggerPlayernew}
          />
        </div>
        {loadingState && <Loading />}
        <Transition
          show={appearPlayer}
          className="sticky bottom-0 z-20 w-full"
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Player />
        </Transition>

        <Transition
          show={isNotify}
          className="flex justify-center"
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Notify content={notifyContent} setNotifyState={setIsNotifyVisible} />
        </Transition>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;

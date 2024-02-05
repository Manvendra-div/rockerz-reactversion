import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import Player from "./components/Player";
import Footer from "./components/Footer";
import Loading from "./components/LoadingAnimation";
import Notify from "./components/Notify";
import Notice from "./components/Notice";

function App() {
  const [currentTrack, setcurrentTrack] = useState(null);
  const [loadingState, setloadingState] = useState(false);
  const [isNotify, setIsNotifyVisible] = useState(false);
  const [appearPlayer,setappearPlayer] = useState(false);
  const [notifyContent, setNotifyContent] = useState("");
  return (
    <>
    <Notice/>
      <NavBar
        toggleNotification={setIsNotifyVisible}
        addNotifyContent={setNotifyContent}
      />
      {loadingState && <Loading />}
      <Hero
        setTrack={setcurrentTrack}
        loadinFunc={setloadingState}
        toggleNotification={setIsNotifyVisible}
        addNotifyContent={setNotifyContent}
        showPlayer={setappearPlayer}
      />
      <Transition
          show={appearPlayer}
          className="sticky bottom-0 z-20"
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Player track={currentTrack} />
      </Transition>
      <Footer />
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
     
        <Notify content={notifyContent} />
        </Transition>
    </>
  );
}

export default App;

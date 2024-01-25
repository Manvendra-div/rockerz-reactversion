import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Player from "./components/Player";
import Footer from "./components/Footer";
import Loading from "./components/LoadingAnimation";
import Notify from "./components/Notify";

function App() {
  const [currentTrack, setcurrentTrack] = useState(null);
  const [loadingState, setloadingState] = useState(false);
  const [isNotify, setIsNotifyVisible] = useState(false);
  const [notifyContent, setNotifyContent] = useState("");
  return (
    <>
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
      />
      <div className="sticky bottom-0 z-20">
        {currentTrack === null ? (
          <div></div>
        ) : (
          <Player track={currentTrack} loadinFunc={setloadingState} />
        )}
      </div>
      <Footer />
      <div className="flex justify-center">
        {isNotify && <Notify content={notifyContent} />}
      </div>
    </>
  );
}

export default App;

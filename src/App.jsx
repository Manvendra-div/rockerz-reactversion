import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Player from "./components/Player";
import Footer from "./components/Footer";
import Loading from "./components/LoadingAnimation";

function App() {
  const [currentTrack, setcurrentTrack] = useState(null);
  const [loadingState, setloadingState] = useState(false);
  return (
    <>
      <NavBar />
      {loadingState && <Loading />}
      <Hero setTrack={setcurrentTrack} loadinFunc={setloadingState} />
      <div className="sticky bottom-0 z-20">
        {currentTrack === null ? (
          <div></div>
        ) :
        (
          <Player track={currentTrack} loadinFunc={setloadingState} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;

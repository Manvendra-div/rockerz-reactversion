import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Player from "./components/Player";
import Footer from "./components/Footer";
function App() {
  const [currentTrack, setcurrentTrack] = useState(null);
  return (
    <>
      <NavBar />
      <Hero setTrack={setcurrentTrack} />
      <div className="sticky bottom-0 z-20">
        {currentTrack === null ? <div></div> : <Player track={currentTrack} />}
      </div>
      <Footer />
    </>
  );
}

export default App;

import './App.css';
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Player from './components/Player'
import Footer from './components/Footer'
import {useState} from "react"
function App() {
  const [currentTrack,setcurrentTrack] = useState(null)
  return (
    <div>
    <NavBar/>
    <Hero setTrack={setcurrentTrack}/>
    {console.log("from app.js",currentTrack)}
    <div className="sticky bottom-0 z-20">{(currentTrack===null)? (<div></div>) : (<Player track={currentTrack}/>)}</div>
    <Footer/>
    </div>
  );
}

export default App;

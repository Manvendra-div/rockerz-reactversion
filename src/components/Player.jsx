import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BiPause, BiPlay } from "react-icons/bi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const fetchData = async (URL) => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Player = ({ track }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [song, setSong] = useState(null);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(true);

  const getTrackData = async (Trackid) => {
    try {
      const trackData = await fetchData(`https://saavn.me/songs?id=${Trackid}`);
      const songData = trackData.data[0];
      if (songData) {
        setSong(songData);
      } else {
        console.error("Error fetching song data: Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching song data:", error);
    }
  };
  useEffect(() => {
    getTrackData(track.id);
  }, [track.id]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying]);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [song]);
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setCurrentTime(currentTime);
    setDuration(duration);
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  const togglePlayerUI = () => {
    setIsPlayerExpanded(!isPlayerExpanded);
  };
  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`playerSuperContainerConst ${
        isPlayerExpanded ? "py-20 md:h-screen" : "py-3"
      } px-5`}
    >
      <div className="w-full text-white text-end">
        <button className="" onClick={togglePlayerUI}>
          {isPlayerExpanded ? (
            <FaAngleDown size={20} />
          ) : (
            <FaAngleUp size={20} />
          )}
        </button>
      </div>
      <div className="playerMain">
        <div className="metaContainer">
          <img
            src={song.image[2].link}
            alt="Album Thumb"
            className={`thumbNail ${
              isPlayerExpanded ? "" : "hidden"
            } `}
          />
          <div className="songContainer">
            <p className="songTitle">
              {song.name}
            </p>
            <p className="text-gray-300">{song.primaryArtists}</p>
          </div>
        </div>
        <div className="audioContainer">
          <audio
            ref={audioRef}
            src={song.downloadUrl[4].link}
            onTimeUpdate={handleTimeUpdate}
          />
          <button
            className="playBtn"
            onClick={togglePlay}
          >
            {isPlaying ? <BiPause size={50} /> : <BiPlay size={50} />}
          </button>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            step="0.01"
            onChange={handleProgressChange}
            className="playerSlider"
          />
          <div className="timeContainer">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Player;
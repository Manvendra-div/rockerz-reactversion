import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BiPause, BiPlay } from "react-icons/bi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import Loading from "./LoadingAnimation";
import parse from "html-react-parser";
import BASE_API from "../BASE_API.js";
import { useSelector } from "react-redux";

const fetchData = async (URL) => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Player = () => {
  const track = useSelector((state) => state.currentTrack.value)
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerData, setPlayerData] = useState(null);
  const [isfromHero, setIsfromHero] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSong, setNextSong] = useState([]);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(true);
  const getTrackData = async (Trackid) => {
    try {
      const trackData = await fetchData(`${BASE_API}/api/songs/${Trackid}`);
      const songData = trackData?.data[0];
      const getNextTrack = async () => {
        setNextSong([]);
        const nexttrack = await fetchData(
          `${BASE_API}/api/songs/${songData.id}/suggestions`
        );
        setNextSong(nexttrack.data);
      };
      if (songData) {
        // setCurrentSongIndex(currentSongIndex + 1);
        // addSongInSongChain((songchain) => {
        //   return [...songchain, songChain[currentSongIndex + 1]];
        // });
        if (currentSongIndex === 0) {
          getNextTrack();
          setCurrentSongIndex((count) => count + 1);
        } else {
          setCurrentSongIndex((count) => count + 1);
        }
        setPlayerData({
          song: songData,
        });
      } else {
        console.error("Error fetching song data: Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching song data:", error);
    }
  };

  const setNewTrack = (id) => {
    setIsfromHero(false);
    getTrackData(id);
  };
  useEffect(() => {
    getTrackData(track[0].id);
  }, [track[1]]);
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
  }, [playerData?.song]);
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
    if (currentTime >= duration) {
      setNewTrack(nextSong[currentSongIndex]?.id);
    }
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
  if (!playerData) {
    return <Loading />;
  }

  return (
    <div
      className={`playerSuperContainerConst ${
        isPlayerExpanded ? "py-12 h-screen" : "py-3"
      } px-5 transition-all duration-300`}
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
      <div
        className={`w-full flex ${
          isPlayerExpanded ? "flex-col lg:flex-row" : ""
        } justify-between items-center`}
      >
        <div
          className={`${
            isPlayerExpanded ? "w-[90%] self-center" : "w-[45%]"
          } lg:w-[20%]`}
        >
          <Transition
            show={isPlayerExpanded}
            className="p-2 flex justify-center"
            enter="transition-all ease-in-out duration-500 delay-[100ms]"
            enterFrom="opacity-0 translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all ease-in-out duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <img
              src={playerData?.song.image[2].url}
              alt="Album Thumb"
              className={`thumbNail self-center`}
            />
          </Transition>
          <div
            className={`songContainerPlayer overflow-x-hidden w-full ${
              isPlayerExpanded ? "text-center" : "text-start"
            }`}
          >
            <p
              className={`songTitle ${
                playerData?.song?.name?.length > 20
                  ? "hover:animate-marquee whitespace-nowrap"
                  : ""
              }`}
              dangerouslySetInnerHTML={{ __html: playerData?.song?.name }}
            />
            <p className="text-gray-300 text-sm md:text-base select-none">
              {playerData?.song.artists.primary
                .map((name) => name.name)
                .join(", ")}
            </p>
          </div>
        </div>
        <div
          className={`audioContainer ${
            isPlayerExpanded ? "w-[90%] md:w-[80%]" : "md:w-[85%]"
          }`}
        >
          <audio
            ref={audioRef}
            src={playerData?.song.downloadUrl[4].url}
            onTimeUpdate={handleTimeUpdate}
          />
          <button className="playBtn" onClick={togglePlay}>
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
          <Transition
            show={isPlayerExpanded}
            className="flex flex-col justify-center items-center w-full"
            enter="transition-all ease-in-out duration-500 delay-[500ms]"
            enterFrom="opacity-0 translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="w-[80%] md:w-[50%] rounded-lg p-2">
              <span className="my-2">Up Next</span>
              <div className="h-[130px]">
                {nextSong.length > 2 &&
                  nextSong
                    ?.slice(currentSongIndex, currentSongIndex + 2)
                    .map((song, index) => (
                      <div
                        className="flex items-center backdrop-blur-sm bg-black/10 hover:bg-black/20 border-[1px] border-gray-300 m-1 rounded shadow-xl cursor-pointer"
                        onClick={() => {
                          setNewTrack(song.id);
                        }}
                        key={index}
                      >
                        <img
                          src={song.image[0].url}
                          className="rounded-l"
                          alt=""
                        />
                        <div className="select-none mx-3 overflow-hidden whitespace-nowrap">
                          <div className="text-sm">{parse(song.name)}</div>
                          <div className="text-xs">
                            {song.artists.primary
                              .map((name) => name.name)
                              .join(", ")}
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
};
export default Player;

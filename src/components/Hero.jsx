import axios from "axios";
import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { CiPlay1 } from "react-icons/ci";
import { NumericFormat } from "react-number-format";

const fetchData = async (URL) => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Hero = ({
  setTrack,
  loadinFunc,
  toggleNotification,
  addNotifyContent,
}) => {
  const [songSectionData, setSongSectionData] = useState(null);
  const [datafromSearchToggle, setdatafromSearchToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalSearchQuery, setfinalSearchQuery] = useState("");
  const fetchSearchData = async (e) => {
    finalSearchQueryFunc();
    loadinFunc(true);
    setTimeout(async () => {
      const searchedata = (
        await fetchData(
          `https://saavn.me/search/songs?query=${e}&page=1&limit=5`
        )
      ).data.results;
      setSongSectionData(searchedata);
      loadinFunc(false);
    }, 200);
  };
  const pushNotificationForLike = () => {
    toggleNotification(true);
    addNotifyContent("this feature will be available soon");
    setTimeout(() => {
      toggleNotification(false);
    }, 4000);
  };
  const fetchHomePage = async () => {
    loadinFunc(true);
    setTimeout(async () => {
      const homepagedata = (
        await fetchData("https://saavn.me/modules?language=english")
      ).data.trending.songs;
      setSongSectionData(homepagedata);
      loadinFunc(false);
    }, 100);
  };
  useEffect(() => {
    if (!datafromSearchToggle) {
      fetchHomePage();
    }
  }, []);
  const throwSearchRequest = (e) => {
    if (e.key === "Enter") {
      setdatafromSearchToggle(true);
      fetchSearchData(searchQuery.replace(/ /g, "+"));
    }
  };
  const finalSearchQueryFunc = () => {
    setfinalSearchQuery(searchQuery);
  };
  const launchPlayer = (data) => {
    setTrack(data);
    // setPlaylist((prevPlaylist) => [...prevPlaylist, data]);
  };
  const SongCard = ({ data, index }) => {
    return (
      <div className="flex mb-3 relative rounded-xl overflow-hidden m-1 group backdrop-blur-lg bg-white/5  border border-gray-400">
        <img
          src={data.image[2].link}
          key={index}
          className="w-[30%] md:w-[20%] h-auto object-cover transition-transform transform group-hover:scale-105"
          alt="Song Image"
        />
        <div className="p-3">
          <h3 className="text-lg font-semibold mb-1">{data.name}</h3>
          <p className="text-sm">
            {typeof data.primaryArtists === "string"
              ? data.primaryArtists
              : data.primaryArtists.map((name) => name.name).join(", ")}
          </p>
        </div>
        <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 left-0 flex items-center group-hover:opacity-100 transition justify-evenly">
          <button
            className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            onClick={pushNotificationForLike}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          </button>

          <button
            className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            onClick={() => {
              launchPlayer(data);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
            </svg>
          </button>

          <span className="flex flex-col w-[10%] items-center hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
            <CiPlay1 size={20} />
            <span className="text-xs">
              <NumericFormat
                value={data.playCount}
                displayType={"text"}
                allowLeadingZeros
                thousandSeparator=","
              />
            </span>
          </span>
        </div>
      </div>
    );
  };
  return (
    <div className="hero-container">
      <div className="hero-element">
        <TypeAnimation
          sequence={[
            " ",
            500,
            "Search",
            500,
            "Search Your",
            500,
            "Search Your Music.",
            500,
          ]}
          wrapper="span"
          speed={50}
          className="text-3xl md:text-5xl font-bold"
        />
        <div className="input-container">
          <div className="flex rounded text-white flex-col md:flex-row">
            <input
              type="text"
              id="usertext"
              name="username"
              className="input-entry"
              placeholder="enter the keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={throwSearchRequest}
            />
          </div>
        </div>
      </div>
      <div className="song-container">
        <div className="m-1 md:w-[80%]">
          {datafromSearchToggle ? (
            <span className="font-semibold">
              Top matches for {finalSearchQuery}
            </span>
          ) : (
            <span className="font-semibold">Top trending</span>
          )}

          {songSectionData && (
            <div className="relative flex flex-col md:flex-row justify-start items-center md:items-start bg-white/20 rounded-xl m-1 shadow-md group overflow-hidden border border-gray-400">
              <img
                src={songSectionData[0]?.image[2].link}
                className="w-auto md:w-[35%] object-cover transition-transform transform group-hover:scale-105"
                alt="Song Image"
              />
              <div className="md:ml-5 mt-1 lg:mt-8 p-2">
                <h3 className="text-2xl font-semibold mb-2 leading-tight overflow-hidden">
                  {songSectionData[0]?.name}
                </h3>
                <p className="text-sm leading-relaxed">
                  {typeof songSectionData[0]?.primaryArtists === "string"
                    ? songSectionData[0]?.primaryArtists
                    : songSectionData[0]?.primaryArtists
                        .map((name) => name.name)
                        .join(", ")}
                </p>
              </div>
              <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 left-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                <button
                  className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                  onClick={() => {
                    pushNotificationForLike();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                </button>

                <button
                  className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                  onClick={() => {
                    launchPlayer(songSectionData[0]);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-play-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                  </svg>
                </button>

                <span className="flex flex-col items-center w-[10%] hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                  <CiPlay1 size={20} />
                  <span className="text-xs">
                    <NumericFormat
                      value={songSectionData[0]?.playCount}
                      displayType={"text"}
                      allowLeadingZeros
                      thousandSeparator=","
                    />
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="m-1">
          {datafromSearchToggle ? (
            <span className="font-semibold">related songs</span>
          ) : (
            <span className="font-semibold">Songs</span>
          )}
          {songSectionData?.slice(1, 4).map((song, index) => (
            <SongCard data={song} key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

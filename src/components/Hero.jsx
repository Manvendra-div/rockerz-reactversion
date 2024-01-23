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
const Hero = ({ setTrack }) => {
  const [songSectionData, setSongSectionData] = useState(null);
  const [datafromSearchToggle, setdatafromSearchToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalSearchQuery, setfinalSearchQuery] = useState("");
  const [isNotify, setIsNotifyVisible] = useState(false);
  const fetchSearchData = async (e) => {
    finalSearchQueryFunc();
    const searchedata = (
      await fetchData(
        `https://saavn.me/search/songs?query=${e}&page=1&limit=10`
      )
    ).data.results;
    setSongSectionData(searchedata);
    console.log(searchedata);
  };
  const pushNotification = () => {
    setIsNotifyVisible(true);
    setTimeout(() => {
      setIsNotifyVisible(false);
    }, 4000);
  };
  const fetchHomePage = async () => {
    const homepagedata = (
      await fetchData("https://saavn.me/modules?language=english")
    ).data.trending.songs;
    setSongSectionData(homepagedata);
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
            onClick={pushNotification}
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
    <div className="flex justify-center items-center flex-col w-full mt-10">
      {isNotify && (
        <div
          className="fixed bottom-10 flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 z-30 shadow-xl rounded-lg "
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p>this feature will be available soon</p>
        </div>
      )}
      <div className="flex flex-col justify-center items-center p-5 w-[95%] md:w-[85%] 2xl:w-[1440px]">
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
        <div className="w-[80%] max-w-sm mx-auto mt-6 bg-transparent border rounded-xl focus-within:border-[#EA580C] focus-within:ring focus-within:ring-[#EA580C] focus-within:ring-opacity-40 dark:border-gray-700 dark:focus-within:border-[#EA580C] xl:max-w-md">
          <div className="flex rounded text-white flex-col md:flex-row">
            <input
              type="text"
              id="usertext"
              name="username"
              className="flex-1 h-10 px-4 py-2 m-1 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0"
              placeholder="enter the keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={throwSearchRequest}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center backdrop-blur-lg bg-white/10 p-8 rounded-xl shadow-md my-8 m-3 md:m-10">
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
                    pushNotification();
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

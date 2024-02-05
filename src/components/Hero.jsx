import axios from "axios";
import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { CiPlay1 } from "react-icons/ci";
import { Transition, Combobox } from "@headlessui/react";
import ShareCard from "./ShareCard";
import parse from "html-react-parser";
import { NumericFormat } from "react-number-format";
import BASE_API from "../BASE_API.js";

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
  showPlayer,
}) => {
  const [songSectionData, setSongSectionData] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [datafromSearchToggle, setdatafromSearchToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalSearchQuery, setfinalSearchQuery] = useState("");
  const [showInputField, setshowInputField] = useState(false);
  const [appearSongCard, setappearSongCard] = useState(false);
  const [albumCardData, setAlbumCardData] = useState(null);
  const [albumCardToggle, setAlbumCardToggle] = useState(false);

  const fetchSearchData = async (e) => {
    setappearSongCard(false);
    finalSearchQueryFunc();
    loadinFunc(true);
    setdatafromSearchToggle(true);
    setTimeout(async () => {
      setSongSectionData([]);
      const searchsong = (
        await fetchData(`${BASE_API}/search/songs?query=${e}&page=1&limit=5`)
      ).data.results;
      const searchalbums = (
        await fetchData(`${BASE_API}/search/albums?query=${e}`)
      ).data.results;
      const formatedSearchdata = {
        songs: searchsong,
        albums: searchalbums,
      };
      setSongSectionData(formatedSearchdata);
      loadinFunc(false);
      setTimeout(() => {
        setappearSongCard(true);
      }, 150);
    }, 100);
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
    setdatafromSearchToggle(false);
    setTimeout(async () => {
      const homepagedata = (
        await fetchData(`${BASE_API}/modules?language=english`)
      ).data.trending;
      setSongSectionData(homepagedata);
      loadinFunc(false);
    }, 100);
  };
  useEffect(() => {
    if (!datafromSearchToggle) {
      fetchHomePage();
      setTimeout(() => setshowInputField(true), 100);
      setTimeout(() => setappearSongCard(true), 400);
    }
  }, []);
  const throwSearchRequest = (e) => {
    if (e.key === "Enter") {
      fetchSearchData(searchQuery.replace(/ /g, "+"));
    }
  };
  const throwSearchRequestfromOptions = (recommendedsongName) => {
    fetchSearchData(recommendedsongName.replace(/ /g, "+"));
    setfinalSearchQuery(recommendedsongName);
  };
  const finalSearchQueryFunc = () => {
    setfinalSearchQuery(searchQuery);
  };
  const launchPlayer = (data) => {
    showPlayer(false);
    setAlbumCardToggle(false);
    setTimeout(() => {
      setTrack(data);
      showPlayer(true);
    }, 200);
    // setPlaylist((prevPlaylist) => [...prevPlaylist, data]);
  };
  const fetchPlaylist = (id) => {
    loadinFunc(true);
    setTimeout(async () => {
      const searchfromId = (await fetchData(`${BASE_API}/albums?id=${id}`))
        .data;
      const compiledSongCards = (
        <div
          className={`${
            searchfromId.songs.length > 3 ? "overflow-y-scroll" : ""
          } max-h-[500px] md:max-h-[300px] px-2`}
        >
          {searchfromId.songs.map((song, index) => (
            <SongCard data={song} key={index} index={index} />
          ))}
        </div>
      );
      const formatedSearchdata = {
        title: `${searchfromId.name} | ${parse(
          typeof searchfromId.primaryArtists === "string"
            ? searchfromId.primaryArtists
            : searchfromId.primaryArtists.map((name) => name.name).join(", ")
        )}`,
        content: compiledSongCards,
      };
      setAlbumCardData(formatedSearchdata);
      setAlbumCardToggle(true);
      loadinFunc(false);
    }, 100);
  };
  function debounce(func, timeout = 400) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  const SongCard = ({ data, index }) => {
    return (
      <div className="flex mb-3 relative rounded-xl overflow-hidden m-1 group backdrop-blur-lg bg-white/5  border border-gray-400 select-none">
        <img
          src={data.image[2].link}
          key={index}
          className="w-[30%] lg:w-[15%] h-auto object-cover transition-transform transform group-hover:scale-105"
          alt="Song Image"
        />
        <div className="p-3 overflow-x-hidden whitespace-nowrap">
          <h3
            className={`text-lg font-semibold mb-1 ${
              data?.name.length > 20 ? "group-hover:animate-marquee" : ""
            }`}
          >
            {`${parse(data.name)}`}
          </h3>
          <p className="text-sm">
            {parse(
              typeof data.primaryArtists === "string"
                ? data.primaryArtists
                : data.primaryArtists.map((name) => name.name).join(", ")
            )}
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
  const AlbumsCard = ({ data, index }) => {
    return (
      <div className="w-[30%] md:w-[15%] cursor-pointer mx-1 md:mx-2 mb-3 relative rounded-md overflow-hidden m-1 group backdrop-blur-lg bg-white/5  border border-gray-400 select-none">
        <img
          src={data.image[2].link}
          key={index}
          className="h-auto object-cover transition-transform transform group-hover:scale-105"
          alt="Song Image"
        />
        <div
          className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 left-0 flex items-center group-hover:opacity-100 transition justify-evenly p-2"
          onClick={() => fetchPlaylist(data.id)}
        >
          <div className="text-center overflow-x-hidden whitespace-nowrap opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
            <h3
              className={`text-sm font-semibold mb-1 ${
                data?.name.length > 15 ? "group-hover:animate-marquee" : ""
              }`}
            >
              {`${parse(data.name)}`}
            </h3>
            <p
              className={`text-xs ${
                data.artists.map((artist) => artist.name).join(", ").length > 10
                  ? "group-hover:animate-marquee"
                  : ""
              }`}
            >
              {parse(data.artists.map((artist) => artist.name).join(", "))}
            </p>
          </div>
        </div>
      </div>
    );
  };
  const getRecommendations = async (keyword) => {
    if (keyword.length > 2) {
      const recom = await fetchData(
        `${BASE_API}/search/songs?query=${keyword.replace(
          / /g,
          "+"
        )}&page=1&limit=4`
      );
      setRecommendation(recom.data.results);
    } else if (keyword === "") {
      setRecommendation([]);
    } else {
      setRecommendation([]);
    }
  };

  return (
    <>
      {albumCardToggle && (
        <ShareCard
          toggleFunc={setAlbumCardToggle}
          cardState={albumCardToggle}
          contentOfCard={albumCardData}
        />
      )}
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
            className="text-3xl lg:text-5xl font-bold"
          />
          <Transition
            show={showInputField}
            className="w-full"
            enter="transition-all ease-in-out duration-500 delay-[200ms]"
            enterFrom="opacity-0 translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox
              value={searchQuery}
              onChange={() => {
                finalSearchQueryFunc;
              }}
            >
              <div className="relative flex flex-col justify-center items-center w-full">
                <div className="input-container">
                  <Combobox.Input
                    className={"input-entry"}
                    placeholder="enter the keyword"
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      debounce(getRecommendations(e.target.value));
                    }}
                    onKeyDown={throwSearchRequest}
                  />
                </div>
                <Combobox.Options
                  className={
                    "absolute top-[110%] z-30 backdrop-blur-xl bg-white/30 rounded-md w-[80%] max-w-sm xl:max-w-md "
                  }
                >
                  {recommendation.map((recommend, index) => (
                    <Combobox.Option
                      className="hover:backdrop-blur-sm hover:bg-black/50 text-white p-1 cursor-pointer overflow-x-hidden rounded-md whitespace-nowrap flex items-center"
                      onClick={() =>
                        throwSearchRequestfromOptions(`${
                          parse(recommend.name) +
                          " " +
                          parse(
                            typeof recommend.primaryArtists === "string"
                              ? recommend.primaryArtists
                              : recommend.primaryArtists
                                  .map((name) => name.name)
                                  .join(", ")
                          )
                        }
                      `)
                      }
                      key={index}
                    >
                      <p
                        className={`${
                          recommend.name.length > 20
                            ? "hover:animate-marquee"
                            : ""
                        }`}
                      >
                        {parse(recommend.name) + " | "}
                        <span className="text-xs">
                          {parse(
                            typeof recommend.primaryArtists === "string"
                              ? recommend.primaryArtists
                              : recommend.primaryArtists
                                  .map((name) => name.name)
                                  .join(", ")
                          )}
                        </span>
                      </p>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>
          </Transition>
        </div>
        <div className="data-container">
          {!appearSongCard && <div className="h-screen"></div>}
          <div className="song-container">
            <Transition
              show={appearSongCard}
              className="m-1 lg:w-[35%]"
              enter="transition-all ease-in-out duration-500 delay-[200ms]"
              enterFrom="opacity-0 translate-y-6"
              enterTo="opacity-100 translate-y-0"
              leave="transition-all ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {datafromSearchToggle ? (
                <span className="font-semibold">
                  Top matches for {finalSearchQuery}
                </span>
              ) : (
                <span className="font-semibold">Top trending</span>
              )}

              {songSectionData.songs?.length > 0 && (
                <div className="relative flex flex-col bg-white/20 rounded-xl m-1 shadow-md group overflow-hidden border border-gray-400 overflow-x-hidden p-5 select-none">
                  <img
                    src={songSectionData.songs[0]?.image[2].link}
                    className="w-full object-cover transition-transform transform group-hover:scale-105 rounded-xl"
                    alt="Song Image"
                  />
                  <div className="lg:ml-5 mt-1 lg:mt-3 p-2 ">
                    <h3
                      className={`text-2xl font-semibold mb-2 leading-tight ${
                        songSectionData.songs[0]?.name.length > 20
                          ? "group-hover:animate-marquee"
                          : ""
                      }`}
                    >
                      {`${parse(songSectionData.songs[0]?.name)}`}
                    </h3>
                    <p className="text-sm leading-relaxed">
                      {parse(
                        typeof songSectionData.songs[0]?.primaryArtists ===
                          "string"
                          ? songSectionData.songs[0]?.primaryArtists
                          : songSectionData.songs[0]?.primaryArtists
                              .map((name) => name.name)
                              .join(", ")
                      )}
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
                        launchPlayer(songSectionData?.songs[0]);
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
                          value={songSectionData.songs[0]?.playCount}
                          displayType={"text"}
                          allowLeadingZeros
                          thousandSeparator=","
                        />
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </Transition>
            <Transition
              show={appearSongCard}
              className="m-1 lg:w-[60%]"
              enter="transition-all ease-in-out duration-500 delay-[200ms]"
              enterFrom="opacity-0 translate-y-6"
              enterTo="opacity-100 translate-y-0"
              leave="transition-all ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {datafromSearchToggle ? (
                songSectionData.songs?.length < 2 ? null : (
                  <span className="font-semibold">Related songs</span>
                )
              ) : (
                <span className="font-semibold">Songs</span>
              )}
              {songSectionData.songs
                ?.slice(
                  1,
                  songSectionData.songs?.length > 5
                    ? 5
                    : songSectionData.songs?.length
                )
                .map((song, index) => (
                  <SongCard data={song} key={index} index={index} />
                ))}
            </Transition>
          </div>
          <Transition
            show={appearSongCard}
            className="m-1 mt-5 w-full"
            enter="transition-all ease-in-out duration-500 delay-[200ms]"
            enterFrom="opacity-0 translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {datafromSearchToggle ? (
              songSectionData.albums?.length < 2 ? null : (
                <span className="font-semibold">Related Albums</span>
              )
            ) : (
              <span className="font-semibold">Trending Albums</span>
            )}
            <div className="flex flex-wrap">
              {songSectionData.albums?.slice(0, 6).map((song, index) => (
                <AlbumsCard data={song} key={index} index={index} />
              ))}
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default Hero;

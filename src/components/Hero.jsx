import { MdLibraryMusic } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import axios from "axios";
import { useState, useEffect } from "react";
const fetchData = async (URL) => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const PlayList = ({ playlist, setSongFromPlaylist }) => {
  const launchPlayerFromPlaylist = (trackdatafromPlayList) => {
    setSongFromPlaylist(trackdatafromPlayList);
  };
  return (
    <div className="fixed left-20 md:left-28 top-24 flex flex-col w-[70%] rounded-md z-50 backdrop-blur-sm bg-zinc-900/40 shadow-xl text-white p-2">
      <span className="p-3 leading-relaxed text-lg md:text-2xl">
        your playlist
      </span>
      {playlist.length < 1 && (
        <p className="self-center text-lg md:text-xl p-3 italic text-gray-200">
          play a track to add.
        </p>
      )}
      <div class="h-[260px] md:h-[350px] overflow-y-scroll">
        {playlist &&
          playlist.map((song) => (
            <div
              className="flex p-5 justify-between backdrop-blur-lg bg-zinc-800/70 hover:bg-zinc-900/70 rounded-md m-2 md:m-3"
              onClick={() => {
                launchPlayerFromPlaylist(song);
              }}
            >
              <img
                src={song.image[2].link}
                className="w-[50%] md:w-[20%] rounded-md"
              />
              <div className="self-start flex flex-col justify-center w-[45%] md:w-[79%] p-0 md:p-3">
                <p className="text-base md:text-3xl leading-tight mb-2">
                  {song.name}
                </p>
                <span className="text-xs md:text-lg leading-relaxed">
                  {typeof song.primaryArtists === "string"
                    ? song.primaryArtists
                    : song.primaryArtists.map((name) => name.name).join(", ")}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
const SongCard = ({ song, position, setSongObject, setPlaylist }) => {
  const launchPlayer = (data) => {
    setSongObject(data);
    setPlaylist((prevPlaylist) => [...prevPlaylist, data]);
  };
  return (
    <div className="bg-[#272727] flex flex-col items-center md:flex-row group relative shadow-lg rounded-xl m-2 w-full">
      <img
        className={`p-5 rounded-3xl ${
          position === 0 ? "w-80 md:h-80" : "w-40 h-40"
        }`}
        src={song.image[2].link}
        title={song.name}
        alt={song.name}
      />
      <div
        className="absolute bg-black rounded-xl bg-opacity-0 group-hover:bg-opacity-30 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly"
        onClick={() => {
          launchPlayer(song);
        }}
      ></div>

      <div className="p-5 flex flex-col justify-center">
        <h3
          className={`text-clip overflow-hidden text-white ${
            position === 0 ? "text-2xl" : "text-base"
          }`}
        >
          {song.name}
        </h3>
        <p
          className={`text-[#E1E1D8] ${
            position === 0 ? "text-base" : "text-sm"
          }`}
        >
          {typeof song.primaryArtists === "string"
            ? song.primaryArtists
            : song.primaryArtists.map((name) => name.name).join(", ")}
        </p>
      </div>
    </div>
  );
};
const Hero = ({ setTrack }) => {
  const [songSectionData, setSongSectionData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const [datafromSearchToggle, setdatafromSearchToggle] = useState(false);
  const [togglePlayListSection, settogglePlayListSection] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const launchPlayList = () => {
    settogglePlayListSection(!togglePlayListSection);
  };

  const fetchSearchData = async (e) => {
    const searchedata = (
      await fetchData(
        `https://saavn.me/search/songs?query=${e}&page=1&limit=35`
      )
    ).data.results;
    setSongSectionData(searchedata);
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
  return (
    <div className="">
      {togglePlayListSection && (
        <PlayList playlist={playlistData} setSongFromPlaylist={setTrack} />
      )}
      <section>
        <div className="container px-6 py-16 mx-auto text-center md:py-20 xl:py-28">
          <div className="max-w-lg mx-auto md:max-w-2xl xl:max-w-3xl">
            <h1 className="text-4xl font-bold text-[#F0F1F2] md:text-5xl xl:text-6xl">
              Search your music.
            </h1>
            <p className="mt-6 text-[#80858A] xl:max-w-lg xl:mx-auto">
              any genre Rock, Pop music, Popular music, Hip hop music, Rhythm
              and blues, Jazz, Electronic music, Country music, Classical music.
            </p>
            <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-xl focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40 dark:border-gray-700 dark:focus-within:border-blue-300 xl:max-w-md">
              <div className="flex rounded text-white flex-col md:flex-row">
                <input
                  type="text"
                  id="usertext"
                  name="username"
                  placeholder="enter song name"
                  className="flex-1 h-10 px-4 py-2 m-1 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0"
                  placeholder="enter the keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={throwSearchRequest}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <button
        className="fixed top-16 md:top-20 left-3 md:left-10 p-3 z-50 text-white backdrop-blur-sm bg-black/30 rounded-md shadow-lg"
        onClick={launchPlayList}
      >
        {togglePlayListSection && <IoCloseCircle size={30} />}
        {!togglePlayListSection && <MdLibraryMusic size={30} />}
      </button>
      <main id="songSection" className="m-5 rounded-2xl bg-[#302d30] p-10">
        <span id="happeningText" className="text-white text-xl">
          trending now
        </span>
        <section id="SongGrid" className="flex flex-col items-center my-10">
          {songSectionData.map((song, index) => (
            <SongCard
              song={song}
              position={index}
              key={song.id}
              setSongObject={setTrack}
              setPlaylist={setPlaylistData}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Hero;

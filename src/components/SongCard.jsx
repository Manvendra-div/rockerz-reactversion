import parse from "html-react-parser";
import { CiPlay1 } from "react-icons/ci";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack } from "../redux/CurrentTrackSlice";
import { launchPlayer } from "../redux/ToggleSlice/PlayerToggleSlice";
import {
  addIDtoFavourites,
  removeIDfromFavourites,
} from "../redux/FavouritesTracksSlice";
import { FcLike } from "react-icons/fc";

const SongCard = ({ data, index }) => {
  const dispatch = useDispatch();
  const playnewsong = useSelector((state) => state.currentTrack.trackIndex);
  const likedTracks = useSelector((state) => state.favouriteTrack.value);
  const throwPlayer = (song) => {
    dispatch(setCurrentTrack({ trackData: song, trackIndex: playnewsong + 1 }));
    setTimeout(() => {
      dispatch(launchPlayer());
    }, 200);
  };
  return (
    <div className="flex mb-3 relative rounded-xl overflow-hidden m-1 group backdrop-blur-lg bg-white/5 border border-gray-400 select-none">
      <img
        src={data.image[1].url}
        key={index}
        className="w-[30%] md:w-[15%] h-auto object-cover transition-transform transform group-hover:scale-105"
        alt="Song Image"
      />
      <div className="p-3 overflow-x-hidden whitespace-nowrap">
        <h3
          className={`text-lg font-semibold mb-1 ${
            data?.name?.length > 20 ? "group-hover:animate-marquee" : ""
          }`}
        >
          {parse(data.name)}
        </h3>
        <p className="text-sm">
          {parse(data.artists.primary.map((name) => name.name).join(", "))}
        </p>
      </div>
      <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 left-0 flex items-center group-hover:opacity-100 transition justify-evenly">
        <button
          className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          onClick={() =>
            likedTracks.includes(data.id)
              ? dispatch(removeIDfromFavourites(data.id))
              : dispatch(addIDtoFavourites(data.id))
          }
        >
          {likedTracks.includes(data.id) ? <FcLike className="text-2xl"/>:<svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>}
        </button>
        <button
          className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          onClick={() => {
            throwPlayer(data);
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
              displayType="text"
              allowLeadingZeros
              thousandSeparator=","
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default SongCard;

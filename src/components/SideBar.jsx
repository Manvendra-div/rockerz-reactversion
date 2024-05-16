import React, { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaGoogle, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { doContract, doExpand } from "../redux/ToggleSlice/SideBarToggleSlice";
import {
  closeDialog,
  setDialogData,
  showDialog,
} from "../redux/ToggleSlice/DialogToggleSlice";
import { signInWithPopup, signOut } from "firebase/auth";
import { clearUser, setUser } from "../redux/LoginSlice";
import { auth, provider } from "../firebase/config";
import SongCard from "./SongCard";
import { getSongDataByID } from "../utils/getSongDataByID";
import { updateFavouritesRedux } from "../redux/FavouritesTracksSlice";
import { getFavourites, getLastSession, updateDB } from "../utils/FirestoreManager";
import { updateLastSessionRedux } from "../redux/LastSessionSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state) => state.sideBarToggle.value);
  const isLogined = useSelector((state) => state.loginState.user);
  const lastSession = useSelector((state) => state.lastSession.value);
  const likedTracks = useSelector((state) => state.favouriteTrack.value);
  const [UIError, setUIError] = useState("");
  const buttonRef = useRef(null);
  const handleGoogleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        dispatch(setUser(data.user));
        dispatch(closeDialog());
      })
      .catch((err) => {
        setUIError(err.message);
      });
  };
  useEffect(() => {
    if(isLogined){
      getFavourites().then((data) => {
        dispatch(updateFavouritesRedux(data));
      });
      getLastSession().then((data) => {
        dispatch(updateLastSessionRedux(data));
      });
    }
  }, [isLogined]);
  useEffect(() => {
    if(lastSession.length > 0) {
      updateDB({ favourites: likedTracks, lastSession: lastSession });
    }
  }, [likedTracks,lastSession]);
  const SignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearUser());
      })
      .catch((error) => {});
  };
  const prepareGoogleLogin = () => {
    dispatch(showDialog());
    dispatch(
      setDialogData({
        title: "Google Login",
        content: (
          <button
            className="flex justify-between items-center bg-gray-100 p-2 m-16 w-[200px] rounded-lg shadow-gray-600 text-black border-2 border-black"
            onClick={handleGoogleClick}
          >
            <img
              src="https://lh3.googleusercontent.com/C_Ty0alIJNrRQz5pNFmgA1rsRnhZDj67eVCCHXoJFFot0FQEZydARPRKbBADyHQoA0_Dj6gLITCshiJq6C-H-QM_U2mJwJZVLOQPnwvCL2RerGMEhw0"
              alt="Google"
              className="w-[20px]"
            />
            <p className="font-medium">|</p>
            <p className="font-medium">Sign in with Google</p>
          </button>
        ),
      })
    );
  };
  const prepareLastSessionPopup = async () => {
    try {
      const sessionData = await Promise.all(
        lastSession.map(async (element, index) => {
          const trackData = await getSongDataByID(element);
          return trackData;
        })
      );
      sessionData.reverse();
      dispatch(showDialog());
      if (sessionData.length > 0) {
        dispatch(
          setDialogData({
            title: "Last Session",
            content: (
              <div
                className={`${
                  sessionData.length >= 3
                    ? "overflow-y-auto"
                    : "overflow-hidden"
                } max-h-[500px] md:max-h-[300px] px-2 w-full`}
              >
                {sessionData.map((track, index) => (
                  <SongCard data={track} key={index} index={index} />
                ))}
              </div>
            ),
          })
        );
      } else {
        dispatch(
          setDialogData({
            title: "Last Session",
            content: undefined,
          })
        );
      }
    } catch (error) {
      console.error("Error preparing last session popup:", error);
    }
  };
  const prepareFavouritesPopup = async () => {
    try {
      const sessionData = await Promise.all(
        likedTracks.map(async (element, index) => {
          const trackData = await getSongDataByID(element);
          return trackData;
        })
      );
      sessionData.reverse();
      dispatch(showDialog());
      if (sessionData.length > 0) {
        dispatch(
          setDialogData({
            title: "Favourites",
            content: (
              <div
                className={`${
                  sessionData.length >= 3
                    ? "overflow-y-auto"
                    : "overflow-hidden"
                } max-h-[500px] md:max-h-[300px] px-2 w-full`}
              >
                {sessionData.map((track, index) => (
                  <SongCard data={track} key={index} index={index} />
                ))}
              </div>
            ),
          })
        );
      } else {
        dispatch(
          setDialogData({
            title: "Favourites",
            content: undefined,
          })
        );
      }
    } catch (error) {
      console.error("Error preparing last session popup:", error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      buttonRef.current.classList.toggle("animate-ping", !isExpanded);
    }, 10000);
    return () => clearInterval(interval);
  }, [isExpanded]);
  return (
    <aside
      className={`${
        isExpanded ? "w-[60%] md:w-[20%]" : "w-[15%] md:w-[6%]"
      } z-10 fixed top-24 flex justify-center items-center transition-all duration-300`}
    >
      <div className="backdrop-blur-xl bg-white/10 w-full rounded-r-md px-2 py-1">
        {isLogined ? (
          <div className="text-xs md:text-sm italic text-center">
            <button
              className={`flex justify-center items-center text-red-400 not-italic font-semibold bg-black/40 hover:bg-black/80 rounded-md ${
                isExpanded ? "px-12 md:px-14" : "px-3"
              } my-1 py-1.5 w-full transition-all duration-300`}
              onClick={prepareFavouritesPopup}
            >
              <FcLike className={`${isExpanded ? "text-lg" : "text-2xl"}`} />
              {isExpanded && <p className="ml-2 md:mt-1">Liked Songs</p>}
            </button>{" "}
            <button
              className={`flex justify-center items-center text-blue-400 not-italic font-semibold bg-black/40 hover:bg-black/80 rounded-md ${
                isExpanded ? "px-12 md:px-14" : "px-3"
              } my-1 py-1.5 w-full transition-all duration-300`}
              onClick={prepareLastSessionPopup}
            >
              <FaHistory className={`${isExpanded ? "text-lg" : "text-2xl"}`} />{" "}
              {isExpanded && <p className="ml-2 md:mt-0.5">Last Session</p>}
            </button>
            <div className="w-full p-2 flex justify-center items-center">
              <div className="bg-gray-500 w-[80%] h-[1px]"></div>
            </div>
            <button
              className={`flex justify-center items-center text-gray-400 not-italic font-semibold bg-black/40 hover:bg-black/80 rounded-md ${
                isExpanded ? "px-12 md:px-14" : "px-3"
              } my-1 py-1.5 w-full transition-all duration-300`}
              onClick={SignOut}
            >
              <FaSignOutAlt
                className={`${isExpanded ? "text-lg" : "text-2xl"}`}
              />{" "}
              {isExpanded && <p className="ml-2 md:mt-0.5">Log out</p>}
            </button>
          </div>
        ) : (
          <>
            <button
              className={`shadow-lg p-2 rounded-md ${
                isExpanded ? "m-2" : "m-0.5"
              } backdrop-blur-lg bg-black/60 hover:bg-black/80 w-[90%] flex justify-evenly items-center transition-all duration-300`}
              onClick={
                isExpanded
                  ? () => {
                      prepareGoogleLogin();
                    }
                  : () => dispatch(doExpand())
              }
            >
              {isExpanded ? (
                <>
                  <FaGoogle /> <p>Login with Google</p>
                </>
              ) : (
                <FaGoogle />
              )}
            </button>
            <div
              className={`text-xs md:text-sm italic text-center ${
                isExpanded ? "block" : "hidden"
              }`}
            >
              login to enable features like
              <div className="flex justify-evenly items-center text-red-400 not-italic font-semibold opacity-50 bg-black/60 hover:bg-black/80 rounded-md px-14 my-1 py-1.5 cursor-not-allowed">
                <FcLike className="text-lg" />
                <p className="mt-1">Liked Songs</p>
              </div>{" "}
              <div className="flex justify-evenly items-center text-blue-400 not-italic font-semibold opacity-50 bg-black/60 hover:bg-black/80 rounded-md px-14 my-1 py-1.5 cursor-not-allowed">
                <FaHistory className="text-lg" />{" "}
                <p className="mt-0.5">Last Session</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="relative flex justify-center items-center">
        <button
          ref={buttonRef}
          className="absolute -left-2 md:-left-4 text-2xl md:text-3xl"
          onClick={
            isExpanded
              ? () => dispatch(doContract())
              : () => dispatch(doExpand())
          }
        >
          {isExpanded ? (
            <IoIosArrowDropleftCircle />
          ) : (
            <IoIosArrowDroprightCircle />
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;

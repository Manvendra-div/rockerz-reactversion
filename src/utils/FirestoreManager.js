import { getDoc, setDoc, doc } from "firebase/firestore";
import { database } from "../firebase/config";

const getData = async () => {
  const docSnap = await getDoc(
    doc(database, "users", JSON.parse(localStorage.getItem("userData")).uid)
  );
  return docSnap.data();
};
const addData = async (data) => {
  await setDoc(
    doc(database, "users", JSON.parse(localStorage.getItem("userData")).uid),
    {
      favourites: data.favourites,
      lastSession: data.lastSession,
    }
  );
};
export const getFavourites = async () => {
  if ((await getData()).favourites) return (await getData()).favourites;
  else return [];
};

export const getLastSession = async () => {
  if ((await getData()).lastSession) return (await getData()).lastSession;
  else return [];
};
export const updateDB = async (data) => {
  await addData({ favourites: data.favourites, lastSession: data.lastSession });
};

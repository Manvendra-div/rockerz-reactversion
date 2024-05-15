import BASE_API from "../BASE_API";
import { fetchData } from "./FetchData";

export const getSongDataByID = async (id) => {
    const trackData = await fetchData(`${BASE_API}/api/songs/${id}`);
    return trackData.data[0];
  }; 
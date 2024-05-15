import axios from 'axios'
export const fetchData = async (URL) => {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{
    id: "",
    name: "",
    type: "song",
    year: "",
    releaseDate: null,
    duration: 0,
    label: "",
    explicitContent: false,
    playCount: 0,
    language: "",
    hasLyrics: true,
    lyricsId: null,
    url: "https://www.jiosaavn.com/song/",
    copyright: "",
    album: {
      id: "",
      name: "",
      url: "",
    },
    artists: {
      primary: [{}],
      featured: [],
      all: [
        {
          id: "",
          name: "",
          role: "music",
          image: [],
          type: "artist",
          url: "",
        },
      ],
    },
    image: [
      {
        quality: "50x50",
        url: "",
      },
      {
        quality: "150x150",
        url: "",
      },
      {
        quality: "500x500",
        url: "",
      },
    ],
    downloadUrl: [
      {
        quality: "12kbps",
        url: "",
      },
      {
        quality: "48kbps",
        url: "",
      },
      {
        quality: "96kbps",
        url: "",
      },
      {
        quality: "160kbps",
        url: "",
      },
      {
        quality: "320kbps",
        url: "",
      },
    ],
  },0],
};

export const CurrentTrackSlice = createSlice({
  name: "CurrentTrackState",
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentTrack } = CurrentTrackSlice.actions;

export default CurrentTrackSlice.reducer;

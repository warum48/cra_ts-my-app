import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "colortheme",
  initialState: {
    themeMode: "light", //dark
    colorSet: "fresh", //strong
  },
  reducers: {
    setMode: (state, action) => {
      state.themeMode = action.payload;
    },
    setColorSet: (state, action) => {
      state.colorSet = action.payload;
    }
  }
});
// each case under reducers becomes an action
export const { setMode, setColorSet } = themeSlice.actions;
export default themeSlice.reducer;

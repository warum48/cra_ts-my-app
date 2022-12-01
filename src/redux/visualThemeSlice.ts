import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: "light" //dark
  },
  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload;
    }
  }
});
// each case under reducers becomes an action
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

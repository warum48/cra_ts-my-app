import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../ReduxWrapper";

interface uSI {
  value: string;
}

const initialState: uSI = {
  value: "it will persist"
};

export const unpersistableSlice: any = createSlice({
  name: "unpersistable",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      //setValue: (state: any, action: any) => {
      state.value = action.payload;
    }
  }
});
// each case under reducers becomes an action
export const { setValue } = unpersistableSlice.actions;
export default unpersistableSlice.reducer;
//or export const dictonariesReducer = dictonariesSlice.reducer;

//https://bionicjulia.com/blog/clear-redux-toolkit-state-with-redux-persist-and-typescript

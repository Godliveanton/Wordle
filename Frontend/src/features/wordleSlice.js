import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  solution: "",
};

const wordle = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    addSolution: (state, action) => {
      state.solution = action.payload;
    },
  },
});

export default wordle.reducer;
export const { addSolution } = wordle.actions;

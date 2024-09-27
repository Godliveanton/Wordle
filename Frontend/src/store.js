import { configureStore } from "@reduxjs/toolkit";
import wordleReducer from "./features/wordleSlice";

const store = configureStore({
  reducer: {
    wordle: wordleReducer,
  },
  devTools: false,
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import assestReducers from "./Reducer";

const store = configureStore({
  reducer: {
    assest: assestReducers,
  },
});
export default store;

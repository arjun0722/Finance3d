import { createSlice } from "@reduxjs/toolkit";

const assestReducers = createSlice({
  name: "assest",
  initialState: [],
  reducers: {
    addAssest(state, action) {
      state.push(action.payload);
    },
    emptyAsssestState(state) {
      state.length = 0;
    },
    updateAssestReducer(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    deleteAssest(state, action) {
      return state.filter((assest) => assest.id !== action.payload);
    },
  },
});
export const {
  addAssest,
  emptyAsssestState,
  updateAssestReducer,
  deleteAssest,
} = assestReducers.actions;
export default assestReducers.reducer;

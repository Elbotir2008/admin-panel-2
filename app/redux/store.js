import { configureStore } from "@reduxjs/toolkit";
import studentsSlice from "./features/fetchStudents/fetchStudents";
import { combineReducers } from "redux";
// const reducers = combineReducers({
//   studentsSlice,
// });
const store = combineReducers({
  studentsSlice,
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import scoreSlice from "./scoreSlice";
import questionsSlice from "./questionsSlice";
import usersSlice from "./usersSlice";
import examsSlice from "./examsSlice";

export const store = configureStore({
  reducer: {
    score: scoreSlice,
    questions: questionsSlice,
    user: usersSlice,
    exams: examsSlice
  }
})
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../helpers";

const initialState = {
  exams: getStorage(`exams`),
}

export const examsSlice = createSlice({
  name: `exams`,
  initialState,
  reducers: {
    addExam: {
      reducer: (state, action) =>
      {
        state.exams.push(action.payload)
        setStorage(`exams`, state.exams)
      },
      prepare: (title, date, imgText) =>
      {
        return {
          payload: { id: nanoid(), title, date, imgText }
        }
      }
    },
    removeExam: {
      reducer: (state, action) =>
      {
        state.exams = state.exams.filter(exam => exam.id !== action.payload.id)
        setStorage(`exams`, state.exams)
      },
      prepare: (id) =>
      {
        return {
          payload: { id }
        }
      }
    },
    addQuestion: {
      reducer: (state, action) => { },
      prepare: (question, options) =>
      {
        return {
          payload: { question, options }
        }
      }
    }
  }
})

export const exams = state => state.exams.exams
export const { addExam, removeExam } = examsSlice.actions
export default examsSlice.reducer
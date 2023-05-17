import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../helpers";

const initialState = {
  exams: getStorage(`exams`),
};

export const examsSlice = createSlice({
  name: `exams`,
  initialState,
  reducers: {
    addExam: {
      reducer: (state, action) => {
        state.exams.push(action.payload);
        setStorage(`exams`, state.exams);
      },
      prepare: (title, date, imgText) => {
        return {
          payload: { id: nanoid(), title, date, imgText, questions: [] },
        };
      },
    },
    removeExam: {
      reducer: (state, action) => {
        state.exams = state.exams.filter(
          (exam) => exam.id !== action.payload.id
        );
        setStorage(`exams`, state.exams);
      },
      prepare: (id) => {
        return {
          payload: { id },
        };
      },
    },
    addQuestion: {
      reducer: (state, action) => {
        const { id, question, options, examId } = action.payload;
        const tmpExams = state.exams.map((exam) => {
          console.log(examId);
          if (exam.id === examId) {
            console.log(exam);
            exam.questions.push({ id, question, options });
          }
          return exam;
        });
        state.exams = tmpExams;
        setStorage(`exams`, state.exams);
      },
      prepare: (question, options, examId) => {
        return {
          payload: { id: nanoid(), question, options, examId },
        };
      },
    },
  },
});

export const exams = (state) => state.exams.exams;
export const { addExam, removeExam, addQuestion } = examsSlice.actions;
export default examsSlice.reducer;

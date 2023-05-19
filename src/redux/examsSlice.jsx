import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../helpers";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const initialState = {
  exams: getStorage(`exams`),
  answers: getStorage(`answers`),
  scores: getStorage(`scores`),
};

const examSample = {
  date: "2023-05-18T09:44",
  imgText: "PH",
  questions: [
    {
      id: nanoid(),
      options: [
        { id: nanoid(), answerText: "20", isCorrect: false, answered: false },
      ],
      question: "What is time",
    },
  ],
  title: "Philosophy",
};

const addAnExam = async (exam) => {
  await addDoc(collection(db, `exams`), exam);
};

export const examsSlice = createSlice({
  name: `exams`,
  initialState,
  reducers: {
    addExam: {
      reducer: (state, action) => {
        state.exams.push(action.payload);
        addAnExam(action.payload);
      },
      prepare: (title, date, imgText) => {
        return {
          payload: { title, date, imgText, questions: [] },
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
          if (exam.id === examId) {
            options.length > 0
              ? exam.questions.push({ id, question, options })
              : exam.questions.push({ id, question });
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
    removeQuestion: {
      reducer: (state, action) => {
        state.exams = state.exams.map((exam) => {
          if (exam.id === action.payload.examId) {
            exam.questions = exam.questions.filter(
              (question) => question.id !== action.payload.id
            );
          }
          return exam;
        });
        setStorage(`exams`, state.exams);
      },
      prepare: (examId, id) => {
        return {
          payload: { examId, id },
        };
      },
    },
    changeAnswer: {
      reducer: (state, action) => {
        const { userId, examId, questionId, answerId, essayContent, type } =
          action.payload;

        if (
          state.answers.filter(
            (answer) =>
              answer.userId === userId &&
              answer.examId === examId &&
              answer.questionId === questionId
          ).length > 0
        ) {
          const tmpAns = state.answers.map((answer) => {
            if (
              answer.userId === userId &&
              answer.examId === examId &&
              answer.questionId === questionId
            ) {
              answer.answer = type === `option` ? answerId : essayContent;
            }
            return answer;
          });

          state.answers = tmpAns;
          setStorage(`answers`, state.answers);
        } else {
          const answer = type === `option` ? answerId : essayContent;
          state.answers.push({ userId, examId, questionId, answer, type });
          setStorage(`answers`, state.answers);
        }
      },
      prepare: (ids) => {
        const { userId, examId, questionId, answerId, essayContent, type } =
          ids;
        return {
          payload: { userId, examId, questionId, answerId, essayContent, type },
        };
      },
    },
    submitExam: {
      reducer: (state, action) => {
        const { userId, examId } = action.payload;

        const newAnswers = state.answers.filter(
          (answer) => answer.userId === userId && answer.examId === examId
        );

        const score = {
          objective: 0,
          essay: newAnswers
            .filter((answer) => answer.type === `essay`)
            .map((answer) => answer.answer)[0],
        };

        const newOptions = newAnswers.filter(
          (answer) => answer.type === `option`
        );

        newOptions.forEach((option) => {
          state.exams.forEach((exam) => {
            if (exam.id === option.examId) {
              exam.questions.forEach((question) => {
                if (question.id === option.questionId) {
                  question.options &&
                    question.options.forEach((opt) => {
                      if (opt.id === option.answer && opt.isCorrect === true) {
                        score.objective += 1;
                      }
                    });
                }
              });
            }
          });
        });

        if (
          state.scores.filter(
            (sc) => sc.userId === userId && sc.examId === examId
          ).length > 0
        ) {
          const tmpScores = state.scores.map((sc) => {
            if (sc.userId === userId && sc.examId === examId) {
              sc.score = score;
            }
            return sc;
          });

          state.scores = tmpScores;
          setStorage(`scores`, state.scores);
        } else {
          state.scores.push({ userId, examId, score });
          setStorage(`scores`, state.scores);
        }
      },
      prepare: (userId, examId) => {
        return {
          payload: { userId, examId },
        };
      },
    },
  },
});

export const exams = (state) => state.exams.exams;
export const answers = (state) => state.exams.answers;
export const scores = (state) => state.exams.scores;
export const {
  addExam,
  removeExam,
  addQuestion,
  removeQuestion,
  changeAnswer,
  submitExam,
} = examsSlice.actions;
export default examsSlice.reducer;

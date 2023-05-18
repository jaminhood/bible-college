import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../helpers";

const initialState = {
  exams: getStorage(`exams`),
  answers: getStorage(`answers`)
};

export const examsSlice = createSlice({
  name: `exams`,
  initialState,
  reducers: {
    addExam: {
      reducer: (state, action) =>
      {
        state.exams.push(action.payload);
        setStorage(`exams`, state.exams);
      },
      prepare: (title, date, imgText) =>
      {
        return {
          payload: { id: nanoid(), title, date, imgText, questions: [] },
        };
      },
    },
    removeExam: {
      reducer: (state, action) =>
      {
        state.exams = state.exams.filter(
          (exam) => exam.id !== action.payload.id
        );
        setStorage(`exams`, state.exams);
      },
      prepare: (id) =>
      {
        return {
          payload: { id },
        };
      },
    },
    addQuestion: {
      reducer: (state, action) =>
      {
        const { id, question, options, examId } = action.payload;
        const tmpExams = state.exams.map((exam) =>
        {
          console.log(examId);
          if (exam.id === examId)
          {
            console.log(exam);
            (options.length > 0)
              ? exam.questions.push({ id, question, options })
              : exam.questions.push({ id, question })
          }
          return exam;
        });
        state.exams = tmpExams;
        setStorage(`exams`, state.exams);
      },
      prepare: (question, options, examId) =>
      {
        return {
          payload: { id: nanoid(), question, options, examId },
        };
      },
    },
    removeQuestion: {
      reducer: (state, action) =>
      {
        state.exams = state.exams.map(
          (exam) =>
          {
            if (exam.id === action.payload.examId)
            {
              exam.questions = exam.questions.filter(
                (question) => question.id !== action.payload.id
              )
            }
            return exam
          }
        );
        setStorage(`exams`, state.exams);
      },
      prepare: (examId, id) =>
      {
        return {
          payload: { examId, id },
        };
      },
    },
    changeAnswer: {
      reducer: (state, action) =>
      {
        const { userId, examId, questionId, answerId } = action.payload

        if (state.answers.filter(answer => answer.userId === userId && answer.examId === examId && answer.questionId === questionId).length > 0)
        {
          const tmpAns = state.answers.map(answer =>
          {
            if (answer.userId === userId && answer.examId === examId && answer.questionId === questionId)
            {
              answer.answer = answerId
            }
            return answer
          })

          state.answers = tmpAns
          setStorage(`answers`, state.answers);
        } else
        {
          state.answers.push({ userId, examId, questionId, answerId })
          setStorage(`answers`, state.answers);
        }

        // state.exams = state.exams.map(exam =>
        // {
        //   if (exam.id === examId)
        //   {
        //     exam.answerOptions.forEach(option =>
        //     {
        //       option.answers = false
        //       if (option.id === answerId)
        //       {
        //         option.answers = true
        //       }
        //     })
        //   }
        //   return exam
        // }
        // )
      },
      prepare: (ids) =>
      {
        const { userId, examId, questionId, answerId } = ids
        return {
          payload: { userId, examId, questionId, answerId }
        }
      }
    },
    submitExam: {
      reducer: (state, action) =>
      {
        const { examId, questionId, answerId } = action.payload

        if (state.answers.filter(answer => answer.examId === examId && answer.questionId === questionId).length > 0)
        {
          const tmpAns = state.answers.map(answer =>
          {
            if (answer.examId === examId && answer.questionId === questionId)
            {
              answer.answerId = answerId
            }
            return answer
          })

          state.answers = tmpAns
          setStorage(`answers`, state.answers);
        } else
        {
          state.answers.push({ examId, questionId, answerId })
          setStorage(`answers`, state.answers);
        }

        // state.exams = state.exams.map(exam =>
        // {
        //   if (exam.id === examId)
        //   {
        //     exam.answerOptions.forEach(option =>
        //     {
        //       option.answers = false
        //       if (option.id === answerId)
        //       {
        //         option.answers = true
        //       }
        //     })
        //   }
        //   return exam
        // }
        // )
      },
      prepare: (ids) =>
      {
        const { examId, questionId, answerId } = ids
        return {
          payload: { examId, questionId, answerId }
        }
      }
    }
  },
});

export const exams = (state) => state.exams.exams;
export const answers = (state) => state.exams.answers;
export const { addExam, removeExam, addQuestion, removeQuestion, changeAnswer, submitExam } = examsSlice.actions;
export default examsSlice.reducer;

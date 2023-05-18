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
        const { userId, examId, questionId, answerId, essayContent, type } = action.payload

        if (state.answers.filter(answer => answer.userId === userId && answer.examId === examId && answer.questionId === questionId).length > 0)
        {
          const tmpAns = state.answers.map(answer =>
          {
            if (answer.userId === userId && answer.examId === examId && answer.questionId === questionId)
            {
              answer.answer = type === `option` ? answerId : essayContent
            }
            return answer
          })

          state.answers = tmpAns
          setStorage(`answers`, state.answers);
        } else
        {
          const answer = type === `option` ? answerId : essayContent
          state.answers.push({ userId, examId, questionId, answer, type })
          setStorage(`answers`, state.answers);
        }
      },
      prepare: (ids) =>
      {
        const { userId, examId, questionId, answerId, essayContent, type } = ids
        return {
          payload: { userId, examId, questionId, answerId, essayContent, type }
        }
      }
    },
    submitExam: {
      reducer: (state, action) =>
      {
        const { userId, examId } = action.payload

        const newAnswers = state.answers.filter(answer => answer.userId === userId && answer.examId === examId)

        const score = {
          objective: 0,
          essay: newAnswers.filter(answer => answer.type === `essay`).map(answer => answer.answer)[0]
        }

        const newOptions = newAnswers.filter(answer => answer.type === `option`)

        newOptions.forEach(option =>
        {
          state.exams.forEach(exam =>
          {
            if (exam.id === option.examId)
            {
              exam.questions.forEach(question =>
              {
                if (question.id === option.questionId)
                {
                  question.options && question.options.forEach(opt =>
                  {
                    if (opt.id === option.answer && opt.isCorrect === true)
                    {
                      score.objective += 1
                    }
                  })
                }
              })
            }
          })
        })

        console.log(score)
      },
      prepare: (userId, examId) =>
      {
        return {
          payload: { userId, examId }
        }
      }
    }
  },
});

export const exams = (state) => state.exams.exams;
export const answers = (state) => state.exams.answers;
export const { addExam, removeExam, addQuestion, removeQuestion, changeAnswer, submitExam } = examsSlice.actions;
export default examsSlice.reducer;

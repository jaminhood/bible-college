import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [
    {
      id: 1,
      questionText: 'What is the capital of France?',
      answerOptions: [
        { id: 1, answerText: 'New York', isCorrect: false, answered: false },
        { id: 2, answerText: 'London', isCorrect: false, answered: false },
        { id: 3, answerText: 'Paris', isCorrect: true, answered: false },
        { id: 4, answerText: 'Dublin', isCorrect: false, answered: false },
      ],
    },
    {
      id: 2,
      questionText: 'Who is CEO of Tesla?',
      answerOptions: [
        { id: 1, answerText: 'Jeff Bezos', isCorrect: false, answered: false },
        { id: 2, answerText: 'Elon Musk', isCorrect: true, answered: false },
        { id: 3, answerText: 'Bill Gates', isCorrect: false, answered: false },
        { id: 4, answerText: 'Tony Stark', isCorrect: false, answered: false },
      ],
    },
    {
      id: 3,
      questionText: 'The iPhone was created by which company?',
      answerOptions: [
        { id: 1, answerText: 'Apple', isCorrect: true, answered: false },
        { id: 2, answerText: 'Intel', isCorrect: false, answered: false },
        { id: 3, answerText: 'Amazon', isCorrect: false, answered: false },
        { id: 4, answerText: 'Microsoft', isCorrect: false, answered: false },
      ],
    },
    {
      id: 4,
      questionText: 'How many Harry Potter books are there?',
      answerOptions: [
        { id: 1, answerText: '1', isCorrect: false, answered: false },
        { id: 2, answerText: '4', isCorrect: false, answered: false },
        { id: 3, answerText: '6', isCorrect: false, answered: false },
        { id: 4, answerText: '7', isCorrect: true, answered: false },
      ],
    },
    {
      id: 5,
      questionText: 'Essay',
      type: `essay`
    },
  ],
  currentQuestion: 0,
  answered: [],
  score: 0,
  finished: false,
  essay: ``
}

export const questionsSlice = createSlice({
  name: `questions`,
  initialState,
  reducers: {
    nextQuestion: (state, action) =>
    {
      state.answered = [...state.answered, { id: state.currentQuestion + 1, answer: action.payload.id }]
      state.questions[state.currentQuestion].answerOptions.forEach(option =>
      {
        if (option.id === action.payload.id && option.isCorrect === true)
        {
          state.score += 1
        }
      })
      state.currentQuestion += 1
    },
    changeAnswer: (state, action) =>
    {
      const { questionId, answerId } = action.payload

      if (state.answered.filter(answer => answer.questionId === questionId).length > 0)
      {
        const tmpAns = state.answered.map(answer =>
        {
          if (answer.questionId === questionId)
          {
            answer.answerId = answerId
          }
          return answer
        })

        state.answered = tmpAns
      } else
      {
        state.answered = [...state.answered, { questionId, answerId }]
      }

      state.questions = state.questions.map(question =>
      {
        if (question.id === questionId)
        {
          question.answerOptions.forEach(option =>
          {
            option.answered = false
            if (option.id === answerId)
            {
              option.answered = true
            }
          })
        }
        return question
      }
      )
    },
    finishedPaper: (state, action) =>
    {
      state.finished = true
      state.essay = action.payload

      let tmpQuestions = state.answered.map(answer =>
      {
        return { ...state.questions.find(question => question.id === answer.questionId) }
      })

      let score = tmpQuestions.reduce((score, question) =>
      {
        const answer = state.answered.find(ans => ans.questionId === question.id)

        question.answerOptions.forEach(opt =>
        {
          if (opt.id === answer.answerId && opt.isCorrect === true)
          {
            return score += 1
          }
        })
        return score
      }, 0)

      state.score = score
    },
    unfinishPaper: (state) =>
    {
      state.finished = false
      state.answered = []

      state.questions = state.questions.map(question =>
      {
        if (question.type === undefined)
        {
          question.answerOptions.forEach(option =>
          {
            option.answered = false
          })
        }
        // console.log(question.id)

        return question
      }
      )
    }
  }
})

export const { nextQuestion, changeAnswer, finishedPaper, unfinishPaper } = questionsSlice.actions

export default questionsSlice.reducer
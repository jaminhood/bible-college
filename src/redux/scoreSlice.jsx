import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
  questionsAnswered: []
}

export const scoreSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    increment: (state) =>
    {
      state.score += 1
    },
    addToAnswered: (state, action) =>
    {
      const { id, answer } = action.payload
      const tmpQuest = state.questionsAnswered.filter(question => question.id === id)

      if (tmpQuest.length > 0)
      {
        state.questionsAnswered = state.questionsAnswered.map(question =>
        {
          if (question.id === id)
          {
            question.answer = answer
          }

          return question
        })
      } else
      {
        state.questionsAnswered = [...state.questionsAnswered, { id, answer }]
      }
    },
  }
})

export const { increment, addToAnswered } = scoreSlice.actions
export default scoreSlice.reducer
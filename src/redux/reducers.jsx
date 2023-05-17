const initialState = {
  currentQuestion: 0,
  score: 0,
};

const quizReducer = (state = initialState, action) =>
{
  switch (action.type)
  {
    case 'SUBMIT_ANSWER':
      const { selectedAnswer } = action.payload;
      const currentQuestion = state.currentQuestion;
      const correctAnswer = quizData[currentQuestion].correctAnswer;
      const newScore = selectedAnswer === correctAnswer ? state.score + 1 : state.score;

      return {
        ...state,
        currentQuestion: currentQuestion + 1,
        score: newScore,
      };
    default:
      return state;
  }
};

export default quizReducer;

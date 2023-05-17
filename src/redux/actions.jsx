export const submitAnswer = (selectedAnswer) =>
{
  return {
    type: 'SUBMIT_ANSWER',
    payload: selectedAnswer,
  };
};
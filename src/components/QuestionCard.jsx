import React, { useEffect, useState } from "react";
import { FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import { getStorage } from "../helpers";

const QuestionCard = ({ answers, examId, question, handleAnswer, handleEssay }) =>
{
  const [essay, setEssay] = useState(``);
  const [answered, setAnswered] = useState(``);
  const user = getStorage(`active`)

  useEffect(() =>
  {
    question.options && question.options.forEach(option =>
    {
      answers.forEach(answer =>
      {
        if (answer.questionId && answer.answerId === option.id)
        {
          setAnswered(option.id)
        }
      })
    })
  }, [answers])

  const handleClick = (questionId, answerId) =>
  {
    handleAnswer(questionId, answerId)
    const answers = getStorage(`answers`)
    answers.forEach(answer =>
    {
      if (answer.userId === user.id && answer.examId === examId && answer.questionId === questionId && answer.answer === answerId && answer.type === `option`)
      {
        setAnswered(answerId)
      }
    })
  }

  const handleEssayInput = (e, questionId) =>
  {
    setEssay(e.target.value)
    handleEssay(questionId, e.target.value)
  }

  // useEffect(() => handleEssay(essay), [essay]);
  return (
    <div className="card-body">
      <p className="lead">{question.question}</p>
      <ListGroup>
        {question.options ? (
          question.options.map((answerOption) => (
            <ListGroupItem
              key={answerOption.id}
              onClick={() => handleClick(question.id, answerOption.id)}
              className={answered === answerOption.id ? `bg-success text-light` : null}
            >
              {answerOption.answerText}
            </ListGroupItem>
          ))
        ) : (
          <FormGroup>
            <textarea
              id="essay"
              className="form-control"
              value={essay}
              onInput={(e) => handleEssayInput(e, question.id)}
              placeholder="minimum of 100 words.."
            ></textarea>
          </FormGroup>
        )}
      </ListGroup>
    </div>
  );
};

export default QuestionCard;

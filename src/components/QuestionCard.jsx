import React, { useEffect, useState } from "react";
import { FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import { getStorage } from "../helpers";

const QuestionCard = ({ examId, question, handleAnswer, handleEssay }) =>
{
  const [essay, setEssay] = useState(``);
  const [answered, setAnswered] = useState(``);

  useEffect(() =>
  {
    const answers = getStorage(`answers`)
    question.options.forEach(option =>
    {
      answers.forEach(answer =>
      {
        if (answer.examId === examId && answer.questionId && answer.answerId === option.id)
        {
          setAnswered(option.id)
        }
      })
    })
  })

  const handleClick = (questionId, answerId) =>
  {
    handleAnswer(questionId, answerId)
    const answers = getStorage(`answers`)
    answers.forEach(answer =>
    {
      if (answer.examId === examId && answer.questionId && answer.answerId === answerId)
      {
        setAnswered(answerId)
      }
    })
  }

  useEffect(() => handleEssay(essay), [essay]);
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
              onInput={(e) => setEssay(e.target.value)}
              placeholder="minimum of 100 words.."
            ></textarea>
          </FormGroup>
        )}
      </ListGroup>
    </div>
  );
};

export default QuestionCard;

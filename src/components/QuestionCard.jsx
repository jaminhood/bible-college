import { useEffect, useState } from "react";
import { FormGroup, ListGroup, ListGroupItem } from "reactstrap";

const QuestionCard = ({ answers, question, handleAnswer, handleEssay }) =>
{
  const [essay, setEssay] = useState(``);
  const [answered, setAnswered] = useState(``);

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
  }

  const handleEssayInput = (e, questionId) =>
  {
    setEssay(e.target.value)
    handleEssay(questionId, e.target.value)
  }

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

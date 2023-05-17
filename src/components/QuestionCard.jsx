import React, { useEffect, useState } from "react";
import { FormGroup, ListGroup, ListGroupItem } from "reactstrap";

const QuestionCard = ({ question, handleResult, handleEssay }) => {
  const [essay, setEssay] = useState(``);

  useEffect(() => handleEssay(essay), [essay]);
  return (
    <div className="card-body">
      <p className="lead">
        {question.id}. {question.question}
      </p>
      <ListGroup>
        {question.options ? (
          question.options.map((answerOption) => (
            <ListGroupItem
              key={answerOption.id}
              onClick={() => handleResult(question.id, answerOption.id)}
              className={answerOption.answered ? `bg-success text-light` : null}
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

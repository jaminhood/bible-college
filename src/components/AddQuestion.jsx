import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { updateAnExam } from "../helpers";

const AddQuestion = ({ exam, modal, toggle }) => {
  const [question, setQuestion] = useState(``);
  const [optionOne, setOptionOne] = useState(``);
  const [optionTwo, setOptionTwo] = useState(``);
  const [optionThree, setOptionThree] = useState(``);
  const [optionFour, setOptionFour] = useState(``);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const canSubmit = Boolean(question);

  const reset = () => {
    setQuestion(``);
    setOptionOne(``);
    setOptionTwo(``);
    setOptionThree(``);
    setOptionFour(``);
    setCorrectAnswer(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (question) {
      const options = [];

      if (optionOne) {
        options.push({
          id: nanoid(),
          answerText: optionOne,
          isCorrect: correctAnswer === 1 ? true : false,
          answered: false,
        });
      }

      if (optionTwo) {
        options.push({
          id: nanoid(),
          answerText: optionTwo,
          isCorrect: correctAnswer === 2 ? true : false,
          answered: false,
        });
      }

      if (optionThree) {
        options.push({
          id: nanoid(),
          answerText: optionThree,
          isCorrect: correctAnswer === 3 ? true : false,
          answered: false,
        });
      }

      if (optionFour) {
        options.push({
          id: nanoid(),
          answerText: optionFour,
          isCorrect: correctAnswer === 4 ? true : false,
          answered: false,
        });
      }

      options.length > 0
        ? await updateAnExam(exam, { id: nanoid(), question, options }).then(
            reset
          )
        : await updateAnExam(exam, { id: nanoid(), question }).then(reset);
    }
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader>Add Question</ModalHeader>
          <ModalBody>
            <FormGroup>
              <label htmlFor="question">Enter Question</label>
              <textarea
                className="form-control mt-3"
                id="question"
                value={question}
                onInput={(e) => setQuestion(e.target.value)}
              ></textarea>
            </FormGroup>
            <FormGroup>
              <input
                className="form-control mt-3"
                value={optionOne}
                onInput={(e) => setOptionOne(e.target.value)}
                placeholder="Option"
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control mt-3"
                value={optionTwo}
                onInput={(e) => setOptionTwo(e.target.value)}
                placeholder="Option"
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control mt-3"
                value={optionThree}
                onInput={(e) => setOptionThree(e.target.value)}
                placeholder="Option"
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control mt-3"
                value={optionFour}
                onInput={(e) => setOptionFour(e.target.value)}
                placeholder="Option"
              />
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={4} className="d-flex align-items-center">
                  <label htmlFor="correct">Correct Answer</label>
                </Col>
                <Col sm={8}>
                  <input
                    type="number"
                    className="form-control mt-3"
                    id="correct"
                    value={correctAnswer}
                    onInput={(e) => setCorrectAnswer(parseInt(e.target.value))}
                    placeholder="1"
                  />
                </Col>
              </Row>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              type="submit"
              disabled={!canSubmit}
              onClick={toggle}
            >
              Add Question
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AddQuestion;

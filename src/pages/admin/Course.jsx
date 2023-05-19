import { useNavigate, useParams } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import
{
  Button,
  Col,
  Container,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { days, months, removeAQuestion } from "../../helpers";
import AddQuestion from "../../components/AddQuestion";
import { BiTrash } from "react-icons/bi";
import { removeQuestion } from "../../redux/examsSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase";

const Course = () =>
{
  const { id } = useParams();

  const [currentExam, setCurrentExam] = useState(``);

  useEffect(() =>
  {
    const q = query(collection(db, `exams`))
    const unsubscribe = onSnapshot(q, querySnapshot =>
    {
      let examsArr = []
      querySnapshot.forEach(doc =>
      {
        examsArr.push({ ...doc.data(), id: doc.id })
      })
      setCurrentExam(examsArr.find(exam => exam.id === id))
    })
    return () => unsubscribe()
  }, [])

  const dispatch = useDispatch()

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const getDate = () =>
  {
    const dateTime = new Date(currentExam.date);
    const day = days[dateTime.getDay()];
    const date = dateTime.getDate();
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    const hour =
      dateTime.getHours() < 10
        ? `0${dateTime.getHours()}`
        : dateTime.getHours();
    const minutes =
      dateTime.getMinutes() < 10
        ? `0${dateTime.getMinutes()}`
        : dateTime.getMinutes();

    return `${day}, ${date} ${month}, ${year} by ${hour} : ${minutes}`;
  };

  return (
    <DashboardContent title={currentExam.title}>
      <Container>
        <Row>
          <Col md={6}>
            <h1>{currentExam.title}</h1>
            <div className="course-img my-3 rounded bg-success d-flex justify-content-center align-items-center">
              <h2 className="display-1">{currentExam.imgText}</h2>
            </div>
            <p className="lead">Date: {getDate()}</p>
          </Col>
          <Col md={6}>
            <h3 className="border-bottom pb-3 mb-3 d-flex justify-content-between align-items-center">
              <span>Questions</span>
              <Button color="success" onClick={toggle}>
                Add Question
              </Button>
            </h3>
            <AddQuestion exam={currentExam} modal={modal} toggle={toggle} />
            <div className="questions-container overflow-y w-100">
              {currentExam.questions !== undefined &&
                currentExam.questions.map((question) => (
                  <div
                    key={question.id}
                    className="course-question-box card m-3 text-dark"
                  >
                    <div className="card-header">
                      <h5 className="d-flex justify-content-between align-items-center">
                        {question.question}
                        <BiTrash className="icon" onClick={async () => removeAQuestion(currentExam, question)} />
                      </h5>
                    </div>
                    <div className="card-body">
                      <ListGroup>
                        {question.options
                          ? question.options.map((answerOption) => (
                            <ListGroupItem
                              key={answerOption.id}
                              className={
                                answerOption.isCorrect
                                  ? `bg-success text-light`
                                  : null
                              }
                            >
                              {answerOption.answerText}
                            </ListGroupItem>
                          ))
                          : null}
                      </ListGroup>
                    </div>
                  </div>
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </DashboardContent>
  );
};

export default Course;

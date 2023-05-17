import { Page, QuestionCard } from "../../components";
import { BiPaperPlane } from "react-icons/bi";
import { Col, Container, Row } from "reactstrap";
import bg from "../../assets/imgs/bg.jpg";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAnswer,
  finishedPaper,
  unfinishPaper,
} from "../../redux/questionsSlice";
import { getStorage, setStorage } from "../../helpers";

export default function Exam() {
  const navigate = useNavigate();
  const { id } = useParams();

  const exams = useSelector((state) => state.exams.exams);

  const [currentExam, setCurrentExam] = useState(``);

  useEffect(() => {
    if (!exams.find((e) => e.id === id)) {
      navigate("/create");
    }
    setCurrentExam(exams.find((e) => e.id === id));
  });

  // const user = useSelector(activeUser)
  // const allExams = useSelector(exams)

  // useEffect(() => { (user.role === undefined) ? navigate(`/`) : (user.role === `student`) ? false : navigate(`/admin/dashboard`) })

  const [minutes, setMinutes] = useState(getStorage(`time`).minutes);
  const [seconds, setSeconds] = useState(getStorage(`time`).seconds);
  const [essay, setEssay] = useState(``);

  const score = useSelector((state) => state.questions.score);
  const finished = useSelector((state) => state.questions.finished);
  const questions = useSelector((state) => state.questions.questions);

  const student = useSelector((state) => state.user.student);

  const dispatch = useDispatch();
  setStorage(`admin`, { username: ``, matricNo: `` });

  const handleResult = (questionId, answerId) => {
    dispatch(changeAnswer({ questionId, answerId }));
  };

  const timeout = () => {
    dispatch(unfinishPaper());
    navigate(`/`);
  };

  const handleFinished = () => {
    dispatch(finishedPaper(essay));
    setTimeout(timeout, 2000);
    setMinutes(0);
    setSeconds(0);
    setStorage(`time`, {
      minutes: 0,
      seconds: 0,
    });
  };

  const handleEssay = (essay) => {
    setEssay(essay);
  };

  useEffect(() => {
    // if (getStorage(`student`).length < 1 || getStorage(`student`).username === ``)
    // {
    //   navigate(`/`)
    // }
    // let timer;
    // if (minutes > 0 || seconds > 0) {
    //   timer = setInterval(() => {
    //     setSeconds(seconds - 1);
    //     setStorage(`time`, {
    //       minutes,
    //       seconds: seconds - 1,
    //     });
    //     if (seconds === 0) {
    //       setMinutes(minutes - 1);
    //       setSeconds(59);
    //     }
    //   }, 1000);
    // } else {
    //   dispatch(finishedPaper());
    //   setTimeout(timeout, 2000);
    // }
    // return () => clearInterval(timer);
  });
  return (
    <>
      <Page title={`Exam`}>
        <section
          className="exam-section text-light d-flex justify-content-center align-items-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <Container>
            <Row>
              <Col md={6} lg={10} className="offset-md-3 offset-lg-1">
                <div className="form-box w-100 bg-light text-dark p-3 rounded-3">
                  {finished === false ? (
                    <div className="card">
                      <div className="card-header text-center">
                        <p className="display-6 m-0">{currentExam.title}</p>
                      </div>
                      {questions.map((question) => (
                        <QuestionCard
                          question={question}
                          key={question.id}
                          handleResult={handleResult}
                          handleEssay={handleEssay}
                        />
                      ))}
                      <div className="card-footer">
                        <div className="w-100 d-flex justify-content-end align-items-center">
                          <motion.button
                            whileTap={{ scale: 1.2 }}
                            className="btn btn-success btn-md w-100"
                            onClick={handleFinished}
                          >
                            Finish
                            <BiPaperPlane className="icon ms-3" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="card">
                      <div className="card-body text-center">
                        <h3 className="display-6 border-bottom pb-2">
                          Examination Completed Successfully
                        </h3>
                        <p className="lead mt-2">
                          Objective: {score} / {questions.length - 1}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <div className="timer bg-danger p-1 text-light text-center">
          <p className="lead m-0">
            {minutes < 10 ? "0" + minutes : minutes} :{" "}
            {seconds < 10 ? "0" + seconds : seconds} Left
          </p>
        </div>
      </Page>
    </>
  );
}

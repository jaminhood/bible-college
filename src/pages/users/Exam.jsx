import { Page, QuestionCard } from "../../components";
import { BiPaperPlane } from "react-icons/bi";
import { Col, Container, Row } from "reactstrap";
import bg from "../../assets/imgs/bg.jpg";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  setStorage,
  submitExam,
  updateAnswer,
} from "../../helpers";
import { activeUser } from "../../redux/usersSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Exam() {
  // router
  const { id } = useParams();
  const navigate = useNavigate();
  // redux
  const user = useSelector(activeUser);

  useEffect(() => {
    user.role === undefined
      ? navigate(`/`)
      : user.role === `student`
      ? false
      : navigate(`/admin/dashboard`);
  });
  // state
  const [currentExam, setCurrentExam] = useState(``);
  // useEffect(() => {
  //   getStorage(`time`).examId !== currentExam.id
  //     ? setStorage(`time`, {
  //         examId: currentExam.id,
  //         minutes: 40,
  //         seconds: 0,
  //       })
  //     : setStorage(`time`, {
  //         examId: currentExam.id,
  //         minutes: getStorage(`time`).minutes,
  //         seconds: getStorage(`time`).seconds,
  //       });
  // }, []);
  const [minutes, setMinutes] = useState(40);
  const [seconds, setSeconds] = useState(0);
  const [timerEnd, setTimerEnd] = useState(false);
  const [examEnd, setExamEnd] = useState(false);

  const getStore = () => {
    let q = query(collection(db, `exams`));
    let unsubscribe = onSnapshot(q, (querySnapshot) => {
      let examsArr = [];
      querySnapshot.forEach((doc) => {
        examsArr.push({ ...doc.data(), id: doc.id });
      });
      setStorage(`exams`, examsArr);
      if (!examsArr.find((e) => e.id === id)) navigate("/");
      setCurrentExam(examsArr.find((exam) => exam.id === id));
    });

    q = query(collection(db, `answers`));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      let answersArr = [];
      querySnapshot.forEach((doc) => {
        answersArr.push({ ...doc.data(), id: doc.id });
      });
      setStorage(`answers`, answersArr);
    });

    q = query(collection(db, `scores`));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      let scoresArr = [];
      querySnapshot.forEach((doc) => {
        scoresArr.push({ ...doc.data(), id: doc.id });
      });
      setStorage(`scores`, scoresArr);
    });
    return () => unsubscribe();
  };
  useEffect(() => {
    getStore();
  }, [getStorage(`exams`), getStorage(`answers`)]);
  // methods

  const handleAnswer = async (questionId, answerId) => {
    const ids = {
      user: user.matricNumber,
      examId: currentExam.id,
      questionId,
      answerId,
      type: `option`,
    };
    await updateAnswer(ids);
  };

  const timeout = () => navigate(`/`);

  const handleFinished = () => {
    submitExam({ user: user.matricNumber, examId: currentExam.id });
    setExamEnd(!examEnd);
    setTimeout(timeout, 2000);
  };

  const handleEssay = async (questionId, essay) => {
    const ids = {
      user: user.matricNumber,
      examId: currentExam.id,
      questionId,
      essayContent: essay,
      type: `essay`,
    };
    await updateAnswer(ids);
  };

  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setStorage(`time`, {
        minutes,
        seconds,
      });
      console.log(`here`);
      if (seconds === 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(() => 59);
      } else {
        setSeconds((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (minutes <= 0 || seconds <= 0) {
      clearInterval(timer);
      setTimerEnd(true);
      setStorage(`time`, {
        minutes: 0,
        seconds: 0,
      });
    }
  }, [minutes, seconds]);

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
                  {examEnd === false ? (
                    <div className="card">
                      <div className="card-header text-center">
                        <p className="display-6 m-0">{currentExam.title}</p>
                      </div>
                      {currentExam.questions !== undefined &&
                        currentExam.questions.map((question) => (
                          <QuestionCard
                            question={question}
                            examId={currentExam.id}
                            key={question.id}
                            handleAnswer={handleAnswer}
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
                        <h3 className="display-6">
                          Examination Completed Successfully
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {examEnd === false && (
          <div
            className={`timer ${
              timerEnd ? `bg-danger` : `bg-success`
            } p-1 text-light text-center`}
          >
            <p className="lead m-0">
              {timerEnd ? (
                `Time's Up, Please Submit`
              ) : (
                <span>
                  {minutes < 10 ? "0" + minutes : minutes} :{" "}
                  {seconds < 10 ? "0" + seconds : seconds} Left
                </span>
              )}
            </p>
          </div>
        )}
      </Page>
    </>
  );
}

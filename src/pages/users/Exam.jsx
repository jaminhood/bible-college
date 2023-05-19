import { Page, QuestionCard } from "../../components";
import { BiPaperPlane } from "react-icons/bi";
import { Col, Container, Row } from "reactstrap";
import bg from "../../assets/imgs/bg.jpg";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, setStorage } from "../../helpers";
import { changeAnswer, exams, scores, submitExam } from "../../redux/examsSlice";
import { activeUser } from "../../redux/usersSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Exam ()
{
  // router
  const { id } = useParams();
  const navigate = useNavigate();
  // redux
  const user = useSelector(activeUser);
  // effect
  useEffect(() =>
  {
    user.role === undefined ? navigate(`/`) : user.role === `student` ? false : navigate(`/admin/dashboard`)
  });
  // state
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
      if (!examsArr.find((e) => e.id === id))
        navigate("/");
      setCurrentExam(examsArr.find(exam => exam.id === id))
    })
    return () => unsubscribe()
  }, []);
  // methods
  (getStorage(`time`).examId !== currentExam.id)
    ? setStorage(`time`, {
      examId: currentExam.id,
      minutes: 40,
      seconds: 0,
    }) : setStorage(`time`, {
      examId: currentExam.id,
      minutes: getStorage(`time`).minutes,
      seconds: getStorage(`time`).seconds,
    })
  const [minutes, setMinutes] = useState(getStorage(`time`).examId === currentExam.id && getStorage(`time`).minutes);
  const [seconds, setSeconds] = useState(getStorage(`time`).examId === currentExam.id && getStorage(`time`).seconds);
  const [timerEnd, setTimerEnd] = useState(false);
  const [examEnd, setExamEnd] = useState(false);

  const dispatch = useDispatch();

  const handleAnswer = (questionId, answerId) =>
  {
    const ids = { userId: user.id, examId: currentExam.id, questionId, answerId, type: `option` }
    dispatch(changeAnswer(ids));
  };

  const timeout = () => navigate(`/`)

  const handleFinished = () =>
  {
    dispatch(submitExam(user.id, currentExam.id))
    setExamEnd(!examEnd)
    setTimeout(timeout, 2000);
  };

  const handleEssay = (questionId, essay) =>
  {
    const ids = { userId: user.id, examId: currentExam.id, questionId, essayContent: essay, type: `essay` }
    dispatch(changeAnswer(ids));
  };

  useEffect(() =>
  {
    let timer;
    if (minutes > 0 || seconds > 0)
    {
      timer = setInterval(() =>
      {
        setSeconds(seconds - 1);
        setStorage(`time`, {
          examId: currentExam.id,
          minutes,
          seconds: seconds - 1,
        });
        if (seconds === 0)
        {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else
    {
      setTimerEnd(true)
      setStorage(`time`, {
        examId: currentExam.id,
        minutes: 0,
        seconds: 0,
      })
    }
    return () => clearInterval(timer);
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
                  {examEnd === false ? (
                    <div className="card">
                      <div className="card-header text-center">
                        <p className="display-6 m-0">{currentExam.title}</p>
                      </div>
                      {currentExam.questions !== undefined && currentExam.questions.map((question) => (
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
          <div className={`timer ${timerEnd ? `bg-danger` : `bg-success`} p-1 text-light text-center`}>
            <p className="lead m-0">
              {timerEnd ? `Time's Up, Please Submit` : (
                <span>{minutes < 10 ? "0" + minutes : minutes} : {seconds < 10 ? "0" + seconds : seconds} Left</span>
              )}
            </p>
          </div>
        )}
      </Page>
    </>
  );
}

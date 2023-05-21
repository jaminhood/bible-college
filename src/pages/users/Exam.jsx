import { Page, QuestionCard } from "../../components";
import { BiPaperPlane } from "react-icons/bi";
import { Col, Container, Row } from "reactstrap";
import bg from "../../assets/imgs/bg.jpg";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import
{
  formatTime,
  getStorage,
  setStorage,
  submitExam,
  updateAnswer,
} from "../../helpers";
import { activeUser } from "../../redux/usersSlice";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Exam ()
{
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(activeUser);

  useEffect(() =>
  {
    user.role === undefined
      ? navigate(`/`)
      : user.role === `student`
        ? false
        : navigate(`/admin/dashboard`);
  });

  const [currentExam, setCurrentExam] = useState(``);
  const [answers, setAnswers] = useState([]);
  const [timerEnd, setTimerEnd] = useState(false);
  const [examEnd, setExamEnd] = useState(false);

  const getStore = async () =>
  {
    await getDoc(doc(db, `exams`, id))
      .then(data => setCurrentExam(data.data()))

    // await getDoc(doc(db, `answers`, id))
    //   .then(data => setStorage(`answers`, data.data()))

    // await getDoc(doc(db, `scores`, id))
    //   .then(data => setStorage(`scores`, data.data()))
  };
  useEffect(() => { getStore() }, []);

  const handleAnswer = async (questionId, answerId) =>
  {
    if (answers.find(answer => answer.questionId === questionId))
    {
      const tmpAnswer = answers.map(ans =>
      {
        if (ans.questionId === questionId)
        {
          ans.answerId = answerId
        }
        return ans
      })
      setAnswers(tmpAnswer)
    } else
    {
      const ids = {
        questionId,
        answerId,
        type: `option`,
      };
      setAnswers([...answers, ids])
    }
  };

  const timeout = () => navigate(`/`);

  const handleFinished = () =>
  {
    console.log(answers)
    // submitExam({ user: user.matricNumber, examId: currentExam.id });
    setExamEnd(!examEnd);
    // setTimeout(timeout, 2000);
  };

  const handleEssay = async (questionId, essay) =>
  {
    if (answers.find(answer => answer.questionId === questionId))
    {
      const tmpAnswer = answers.map(ans =>
      {
        if (ans.questionId === questionId)
        {
          ans.essayContent = essay
        }
        return ans
      })
      setAnswers(tmpAnswer)
    } else
    {
      const ids = {
        questionId,
        essayContent: essay,
        type: `essay`,
      };
      setAnswers([...answers, ids])
    }
  };

  const [time, setTime] = useState(2400);
  const timer = useRef();

  useEffect(() =>
  {
    timer.current = setInterval(() =>
    {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() =>
  {
    if (time <= 0)
    {
      clearInterval(timer.current);
      setTimerEnd(!timerEnd);
    }
  }, [time]);

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
                            answers={answers}
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
            className={`timer ${timerEnd ? `bg-danger` : `bg-success`
              } p-1 text-light text-center`}
          >
            <p className="lead m-0">
              {timerEnd ? (
                `Time's Up, Please Submit`
              ) : (
                <span>{formatTime(time)}</span>
              )}
            </p>
          </div>
        )}
      </Page>
    </>
  );
}

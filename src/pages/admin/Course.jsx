import { useNavigate, useParams } from 'react-router-dom'
import DashboardContent from './DashboardContent'
import { Button, Col, Container, FormGroup, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { days, months } from '../../helpers'
import AddQuestion from '../../components/AddQuestion'

const Course = () =>
{
  const navigate = useNavigate()
  const { id } = useParams()

  const questions = useSelector(state => state.questions.questions)
  const exams = useSelector(state => state.exams.exams)

  const [currentExam, setCurrentExam] = useState(``)
  // const [questions, setQuestions] = useState([])
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() =>
  {
    if (!exams.find(e => e.id === (id)))
    {
      navigate('/create')
    }
    setCurrentExam(exams.find(e => e.id === (id)))
  })

  const getDate = () =>
  {
    const dateTime = new Date(currentExam.date)
    const day = days[dateTime.getDay()]
    const date = dateTime.getDate()
    const month = months[dateTime.getMonth()]
    const year = dateTime.getFullYear()
    const hour = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours()
    const minutes = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes()

    return (`${day}, ${date} ${month}, ${year} by ${hour} : ${minutes}`)
  }

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
            <h3 className='border-bottom pb-3 mb-3 d-flex justify-content-between align-items-center'>
              <span>Questions</span>
              <Button color="success" onClick={toggle}>
                Add Question
              </Button>
            </h3>
            <AddQuestion id={currentExam.title} modal={modal} toggle={toggle} />
            <div className="questions-container overflow-y w-100">
              {currentExam.questions !== undefined && currentExam.questions.map(question => (
                <div key={question.id} className="course-question-box card m-3 text-dark">
                  <div className="card-header">
                    <h5>{question.id}. {question.questionText}</h5>
                  </div>
                  <div className="card-body">
                    <ListGroup>
                      {question.answerOptions ? question.answerOptions.map(answerOption => (
                        <ListGroupItem key={answerOption.id} className={answerOption.isCorrect ? `bg-success text-light` : null}>
                          {answerOption.answerText}
                        </ListGroupItem>
                      )) : null}
                    </ListGroup>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </DashboardContent>
  )
}

export default Course
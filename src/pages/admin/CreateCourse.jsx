import { Col, Container, FormGroup, Row } from "reactstrap";
import DashboardContent from "./DashboardContent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAnExam } from "../../helpers";

const CreateCourse = () =>
{
  const navigate = useNavigate();

  const [title, setTitle] = useState(``);
  const [date, setDate] = useState(``);
  const [imgText, setImgText] = useState(``);

  useEffect(() => { setImgText(title.slice(0, 2).toUpperCase()) }, [title]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);

  const canSend = Boolean(title) && Boolean(date) && Boolean(imgText);

  const formSubmit = async (e) =>
  {
    e.preventDefault();
    if (title && date && imgText)
    {
      await addAnExam({ title, date, imgText, questions: [] })
        .then(() =>
        {
          navigate(`/admin/dashboard`);
          setDate(``);
          setTitle(``);
          setImgText(``);
        })
    }
  };

  return (
    <>
      <DashboardContent title={`Dashboard`}>
        <Container>
          <h2 className="border-bottom pb-3 mb-3">Create Exam</h2>
          <form onSubmit={formSubmit}>
            <Row>
              <Col md={6} className="offset-md-3">
                <FormGroup>
                  <label htmlFor="title" className="mb-3">
                    Exam Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onInput={onTitleChanged}
                    id="title"
                    placeholder="Philosophy"
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="date" className="mb-3">
                    Date
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={date}
                    onInput={onDateChanged}
                    id="date"
                  />
                </FormGroup>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="create-course-img my-3 bg-success d-flex justify-content-center align-items-center">
                    <h2 className="display-1">{imgText}</h2>
                  </div>
                </div>
                <div className="my-3 d-flex justify-content-end align-items-center">
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={!canSend}
                  >
                    Submit Form
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </DashboardContent>
    </>
  );
};

export default CreateCourse;

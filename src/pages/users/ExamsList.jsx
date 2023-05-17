import { Col, Container, Row } from "reactstrap";
import { Page } from "../../components";
import bg from "../../assets/imgs/bg.jpg";
import { useSelector } from "react-redux";
import { exams } from "../../redux/examsSlice";
import UserExamBox from "../../components/UserExamBox";
import { activeUser } from "../../redux/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ExamsList = () => {
  const navigate = useNavigate();

  const user = useSelector(activeUser);
  const allExams = useSelector(exams);

  useEffect(() => {
    user.role === undefined
      ? navigate(`/`)
      : user.role === `student`
      ? false
      : navigate(`/admin/dashboard`);
  });

  const flexSpaceCls = `d-flex justify-content-between align-items-center`;

  return (
    <>
      <Page title={`Exams`}>
        <section
          className="home-section text-light"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <Container>
            <Row>
              <Col
                md={12}
                className={`border-bottom pb-3 my-3 ${flexSpaceCls}`}
              >
                <h1 className="m-0">Welcome, {user.name}</h1>
                <Link to={`/logout`}>
                  <button className="btn btn-danger">Logout</button>
                </Link>
              </Col>
            </Row>
            <Row>
              {allExams.map((exam) => (
                <Col md={6} lg={4} key={exam.id}>
                  <UserExamBox exam={exam} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </Page>
    </>
  );
};

export default ExamsList;

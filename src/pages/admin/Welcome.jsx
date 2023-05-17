import { Col, Container, Row } from "reactstrap";
import DashboardContent from "./DashboardContent";
import ExamBox from "../../components/ExamBox";
import { useSelector } from "react-redux";

const Welcome = () => {
  const exams = useSelector((state) => state.exams.exams);
  return (
    <>
      <DashboardContent title={`Dashboard`}>
        <h2 className="text-center border-bottom pb-4 mb-4">Exams List</h2>
        <Container className="overflow-y">
          <Row>
            {exams.map((exam) => (
              <Col md={6} lg={4} key={exam.id}>
                <ExamBox exam={exam} />
              </Col>
            ))}
          </Row>
        </Container>
      </DashboardContent>
    </>
  );
};

export default Welcome;

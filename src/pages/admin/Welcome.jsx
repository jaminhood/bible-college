import { Col, Container, Row } from "reactstrap";
import DashboardContent from "./DashboardContent";
import ExamBox from "../../components/ExamBox";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase";

const Welcome = () =>
{
  const [exams, setExams] = useState([])

  useEffect(() =>
  {
    const q = query(collection(db, `exams`))
    const unsubscribe = onSnapshot(q, querySnapshot =>
    {
      console.log(`here`)
      let examsArr = []
      querySnapshot.forEach(doc =>
      {
        examsArr.push({ ...doc.data(), id: doc.id })
      })
      setExams(examsArr)
    })
    return () => unsubscribe()
  }, [])

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

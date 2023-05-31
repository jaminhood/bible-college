import { Page } from "../../components";
import { BiPaperPlane } from "react-icons/bi";
import { Col, Container, FormGroup, Row } from "reactstrap";
import bg from "../../assets/imgs/bg.jpg";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeUser, studentLogin } from "../../redux/usersSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { addStudent } from "../../helpers";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(activeUser);

  useEffect(() => {
    user.role !== undefined
      ? user.role === `student`
        ? navigate(`/exam-list`)
        : navigate(`/admin/dashboard`)
      : false;
  });

  const [name, setName] = useState(``);
  const [matricNumber, setMatricNumber] = useState(``);
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    const q = query(collection(db, `students`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let studentsArr = [];
      querySnapshot.forEach((doc) => {
        studentsArr.push({ ...doc.data(), id: doc.id });
      });
      setStudents(studentsArr);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    getStudents();
  }, [students]);

  const canSend = Boolean(name) && Boolean(matricNumber);

  const handleStart = async () => {
    if (name && matricNumber) {
      const isStudentInDb = students.find(
        (student) => student.matricNumber === matricNumber
      );
      if (!isStudentInDb) {
        await addStudent({ name, matricNumber, role: `student` }).then(() => {
          dispatch(studentLogin(name, matricNumber));
        });
      }
      dispatch(studentLogin(isStudentInDb.name, isStudentInDb.matricNumber));
      navigate(`/exam-list`);
    }
  };

  return (
    <>
      <Page title={`Home`}>
        <section
          className="home-section text-light d-flex justify-content-center align-items-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <Container>
            <Row>
              <Col md={6}>
                <h1 className="display-3 mb-3">Bible College Examination</h1>
                <p>
                  <strong>Note:</strong> Exams are to be submitted on or before
                  40 minutes after you press the start button, you are expected
                  to make use of 25 minutes for the objective section and 15
                  minutes for the essay.
                </p>
                <p className="lead mt-3">Good Luck</p>
                <Link to={`/admin/login`}>
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="btn btn-success btn-lg w-100"
                    onClick={handleStart}
                  >
                    Admin Login
                  </motion.button>
                </Link>
              </Col>
              <Col md={6}>
                <FormGroup className="p-2">
                  <label htmlFor="name" className="mb-3">
                    Please Enter Your Full Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onInput={(e) => setName(e.target.value)}
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup className="p-2">
                  <label htmlFor="name" className="mb-3">
                    Please Enter Your Matric Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="123456"
                    value={matricNumber}
                    onInput={(e) => setMatricNumber(e.target.value)}
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup className="p-2">
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="btn btn-success btn-lg w-100"
                    onClick={handleStart}
                    disabled={!canSend}
                  >
                    List Exams
                    <BiPaperPlane className="icon ms-3" />
                  </motion.button>
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </section>
      </Page>
    </>
  );
}

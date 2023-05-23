import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { activeUser } from "../redux/usersSlice";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const UserExamBox = ({ exam }) => {
  const { id, title, imgText, date } = exam;

  const user = useSelector(activeUser);
  const [userScores, setUserScores] = useState([]);

  const getExams = async () =>
    await getDocs(collection(db, `scores`))
      .then((data) =>
        data.docs.map((item) => {
          const data = item.data();
          data.id = item.id;
          return data;
        })
      )
      .then((data) => setUserScores(data));

  useEffect(() => {
    getExams();
  }, []);

  let done = false;

  const userScore = userScores.find(
    (sc) => sc.user === user.matricNumber && sc.examId === exam.id
  );

  if (userScore) {
    done = true;
  }

  const newDate = (time) => {
    let newTime = ``;
    if (time) {
      const newDate = parseISO(time);
      const timePeriod = formatDistanceToNow(newDate);
      newTime = `${timePeriod} to go`;
    }
    return newTime;
  };

  const flexSpaceCls = `d-flex justify-content-between align-items-center`;

  return (
    <>
      <div className="card bg-transparent border-light m-1 my-3">
        <div className="card-img-top text-center bg-success p-5">
          <h2 className="display-3">{imgText}</h2>
        </div>
        <div className="card-body">
          <h5 className={flexSpaceCls}>{title}</h5>
          {new Date(date).getTime() - new Date().getTime() > 0 ? (
            <p className="m-0">{newDate(date)}</p>
          ) : done === true ? (
            <button className="btn btn-success btn-sm" disabled>
              Exam Ended
            </button>
          ) : (
            <Link to={`/exam/${id}`}>
              <button className="btn btn-success btn-sm">Start Exam</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default UserExamBox;

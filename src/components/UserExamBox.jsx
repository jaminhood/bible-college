import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";

const UserExamBox = ({ exam }) => {
  const { id, title, imgText, date } = exam;

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

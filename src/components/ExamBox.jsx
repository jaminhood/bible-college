import { Link } from "react-router-dom"
import { BiTrash } from 'react-icons/bi';
import { useDispatch } from "react-redux";
import { removeExam } from "../redux/examsSlice";

const ExamBox = ({ exam }) =>
{
  const dispatch = useDispatch()

  const { id, title, imgText } = exam

  const flexSpaceCls = `d-flex justify-content-between align-items-center`

  return (
    <>
      <div className="card bg-transparent border-light m-1 my-3">
        <div className="card-img-top text-center bg-success p-5">
          <h2 className="display-3">{imgText}</h2>
        </div>
        <div className="card-body">
          <h5 className={flexSpaceCls}>
            <Link to={`/admin/exam/${id}`}>
              {title}
            </Link>
            <BiTrash className="icon" onClick={() => dispatch(removeExam(id))} />
          </h5>
        </div>
      </div>
    </>
  )
}

export default ExamBox
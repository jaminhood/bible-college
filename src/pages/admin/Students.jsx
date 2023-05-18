import { Table } from 'reactstrap'
import DashboardContent from './DashboardContent'
import { useSelector } from 'react-redux'
import { exams } from '../../redux/examsSlice'

const Students = () =>
{
  const examsList = useSelector(exams)

  console.log(examsList)
  return (
    <DashboardContent title={`All Students`}>
      <h2 className='border-bottom pb-3 mb-3'>Students of Bible College Examination</h2>
      <div className="table-responsive">
        <Table className='table-bordered'>
          <thead className='bg-dark text-light'>
            <tr>
              <th>S/N</th>
              <th>Full Name</th>
              <th>Matric Number</th>
              {examsList.map(exam => (
                <th key={exam.id}>{exam.title}</th>
              ))}
            </tr>
          </thead>
          <tbody className='text-light'>
            <tr>
              <td>1</td>
              <td>Michael Dipe</td>
              <td>unilag/433/544</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Michael Dipe</td>
              <td>unilag/433/544</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </DashboardContent>
  )
}

export default Students
import { Table } from 'reactstrap'
import DashboardContent from './DashboardContent'

const Students = () =>
{
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
              <th>GST102</th>
              <th>GST102</th>
              <th>GST102</th>
              <th>GST102</th>
              <th>GST102</th>
              <th>GST102</th>
              <th>GST102</th>
              <th>GST102</th>
              <th>GST102</th>
              <th>GST102</th>
              <th>GST102</th>
              <th>GST102</th>
            </tr>
          </thead>
          <tbody className='text-light'>
            <tr>
              <td>1</td>
              <td>Michael Dipe</td>
              <td>unilag/433/544</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Michael Dipe</td>
              <td>unilag/433/544</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
              <td>20</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </DashboardContent>
  )
}

export default Students
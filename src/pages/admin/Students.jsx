import { Table } from 'reactstrap'
import DashboardContent from './DashboardContent'
import { useSelector } from 'react-redux'
import { exams, scores } from '../../redux/examsSlice'
import { students } from '../../redux/usersSlice'
import { nanoid } from '@reduxjs/toolkit'

const Students = () =>
{
  const examsList = useSelector(exams)
  const studentsList = useSelector(students)
  const scoresList = useSelector(scores)

  const display = studentsList.map(student =>
  {
    const id = nanoid()
    const name = student.name
    const matricNumber = student.matricNumber
    const exams = []
    scoresList.forEach(score =>
    {
      if (score.userId === student.id)
      {
        examsList.forEach(exam =>
        {
          if (exam.id === score.examId)
          {
            exams.push({
              id: nanoid(),
              exam: exam.title,
              objective: score.score.objective,
              essay: score.score.essay
            })
          }
        })
      }
    })
    return ({ id, name, matricNumber, exams })
  })

  return (
    <DashboardContent title={`All Students`}>
      <h2 className='border-bottom pb-3 mb-3'>Students of Bible College Examination</h2>
      <div className="table-responsive">
        <h5 className='border-bottom pb-3 mb-3'>Objective</h5>
        <Table className='table-bordered'>
          <tbody className='text-light'>
            {display.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.matricNumber}</td>
                {item.exams.map(exam => (
                  <td key={exam.id} style={{ whiteSpace: `normal` }}>
                    <p className='lead'>{exam.exam}</p>
                    <p className='m-0'>{exam.objective}</p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="table-responsive">
        <h5 className='border-bottom pb-3 mb-3'>Essay</h5>
        <Table className='table-bordered'>
          <tbody className='text-light'>
            {display.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.matricNumber}</td>
                {item.exams.map(exam => (
                  <td key={exam.id} style={{ whiteSpace: `normal` }}>
                    <p className='lead'>{exam.exam}</p>
                    <p className='m-0'>{exam.essay}</p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DashboardContent>
  )
}

export default Students
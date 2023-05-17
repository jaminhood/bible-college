import { Page } from '../../components'
import { Col, Row } from 'reactstrap'
import bg from '../../assets/imgs/admin.jpg'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getStorage, setStorage } from '../../helpers'
import { NavLink } from 'react-router-dom'
import { activeUser } from '../../redux/usersSlice'
import { useSelector } from 'react-redux'

export default function DashboardContent ({ title, children })
{
  const navigate = useNavigate()

  const user = useSelector(activeUser)

  useEffect(() => { (user.role === undefined) ? navigate(`/`) : (user.role === `admin`) ? false : navigate(`/`) })

  return (
    <>
      <Page title={title}>
        <section className='home-section text-light d-flex justify-content-center align-items-center' style={{ backgroundImage: `url(${bg})` }}>
          <div className="container-fluid">
            <Row>
              <Col md={9} className='text-light p-5'>
                {children}
              </Col>
              <Col md={3} className='dashboard-side'>
                <h1 className='display-6 mb-3'>Bible College Examination</h1>
                <p className='lead mb-3'>Welcome, <span className="bg-success badge">Admin</span></p>
                <ul className='admin-menu'>
                  <li>
                    <NavLink className={(NavActive) => NavActive.isActive ? `bg-success` : null} to="/admin/dashboard">Home</NavLink>
                  </li>
                  <li>
                    <NavLink className={(NavActive) => NavActive.isActive ? `bg-success` : null} to="/admin/create">Create a new Exam</NavLink>
                  </li>
                  <li>
                    <NavLink className={(NavActive) => NavActive.isActive ? `bg-success` : null} to="/admin/students">View All Students</NavLink>
                  </li>
                  <li>
                    <NavLink className={(NavActive) => NavActive.isActive ? `bg-success` : null} to="/admin/logout">Logout</NavLink>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        </section>
      </Page>
    </>
  )
}
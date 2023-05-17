import { Page } from '../components'
import { BiPaperPlane } from 'react-icons/bi'
import { Col, Container, FormGroup, Row } from 'reactstrap'
import bg from '../assets/imgs/admin.jpg'
import { motion } from 'framer-motion'
import { Route, Router, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { adminLogin, studentLogin } from '../redux/usersSlice'
import useLocalStorage from '../customHooks/useLocalStorage'
import { getStorage, setStorage } from '../helpers'
import { NavLink } from 'react-router-dom'
import Welcome from './admin/Welcome'

export default function AdminDashboard ()
{
  const navigate = useNavigate()

  useEffect(() =>
  {
    if (getStorage(`admin`).length < 1 || getStorage(`admin`).username !== `admin`)
    {
      navigate(`/admin`)
    }
  })
  const [name, setName] = useState(``)
  const [password, setPassword] = useState(``)

  setStorage(`time`, {
    minutes: 0,
    seconds: 0
  })

  setStorage(`student`, { username: ``, matricNo: `` })

  const dispatch = useDispatch()

  return (
    <>
      <Page title={`Admin`}>
        <section className='home-section text-light d-flex justify-content-center align-items-center' style={{ backgroundImage: `url(${bg})` }}>
          <div className="container-fluid">
            <Row>
              <Col md={9} className='text-light d-flex justify-content-center align-items-center'>
                <Routes>
                  <Route path='/' element={<Welcome />} />
                  <Route path='/create' element={<Create />} />
                </Routes>
              </Col>
              <Col md={3} className='dashboard-side'>
                <h1 className='display-6 mb-3'>Bible College Examination</h1>
                <p className='lead mb-3'>Welcome, <span className="bg-success badge">Admin</span></p>
                <ul>
                  <li>
                    <NavLink to="create">Create a new Exam</NavLink>
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
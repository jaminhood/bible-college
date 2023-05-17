import { Page } from '../../components'
import { BiPaperPlane } from 'react-icons/bi'
import { Col, Container, FormGroup, Row } from 'reactstrap'
import bg from '../../assets/imgs/admin.jpg'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeUser, adminLogin } from '../../redux/usersSlice'
import { setStorage } from '../../helpers'

export default function Admin ()
{
  const navigate = useNavigate()
  const [username, setUsername] = useState(``)
  const [password, setPassword] = useState(``)

  const user = useSelector(activeUser)

  useEffect(() => { (user.role !== undefined) ? (user.role === `admin`) ? navigate(`/admin/dashboard`) : navigate(`/`) : false })

  const dispatch = useDispatch()

  const handleStart = () =>
  {
    if (username && password)
    {
      dispatch(adminLogin(username, password))
      navigate(`/admin/dashboard`)
    }
  }

  return (
    <>
      <Page title={`Admin`}>
        <section className='home-section text-light d-flex justify-content-center align-items-center' style={{ backgroundImage: `url(${bg})` }}>
          <Container>
            <Row>
              <Col md={6}>
                <h1 className='display-3 mb-3'>Bible College Examination</h1>
                <p className='lead mb-3'>Admin Login</p>
              </Col>
              <Col md={6}>
                <FormGroup className='p-2'>
                  <label htmlFor="name" className='mb-3'>Please Enter Your Username:</label>
                  <input type="text" className="form-control" id="name" placeholder='John Doe' value={username} onInput={e => setUsername(e.target.value)} autoComplete='off' />
                </FormGroup>
                <FormGroup className='p-2'>
                  <label htmlFor="password" className='mb-3'>Please Enter Your Password:</label>
                  <input type="password" className="form-control" id="password" placeholder='123456' value={password} onInput={e => setPassword(e.target.value)} autoComplete='off' />
                </FormGroup>
                <FormGroup className='p-2'>
                  <motion.button whileTap={{ scale: 1.1 }} className="btn btn-success btn-lg w-100" onClick={handleStart}>
                    Login
                    <BiPaperPlane className='icon ms-3' />
                  </motion.button>
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </section>
      </Page>
    </>
  )
}

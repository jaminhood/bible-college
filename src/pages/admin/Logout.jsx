import { useNavigate } from 'react-router-dom'
import { setStorage } from '../../helpers'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/usersSlice'

const Logout = () =>
{
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() =>
  {
    dispatch(logout())
    navigate(-1)
  })

  return <></>
}

export default Logout
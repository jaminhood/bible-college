import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../helpers";


const initialState = {
  student: [],
  admin: [
    { id: 1, username: `jamin`, password: `jamin` }
  ],
  active: getStorage(`active`)
}

const usersSlice = createSlice({
  name: `users`,
  initialState,
  reducers: {
    studentLogin: {
      reducer: (state, action) =>
      {
        const { matricNumber } = action.payload
        if (!state.student.find(user => user.matricNumber === matricNumber))
        {
          state.student.push(action.payload)
        }
        state.active = { id: nanoid(), ...action.payload, role: `student` }
        setStorage(`active`, state.active)
      },
      prepare: (name, matricNumber) =>
      {
        return {
          payload: { id: nanoid(), name, matricNumber }
        }
      }
    },
    adminLogin: {
      reducer: (state, action) =>
      {
        const { username, password } = action.payload
        const currentUser = state.admin.find(user => user.username === username)
        if (currentUser && currentUser.password === password)
        {
          state.active = { id: nanoid(), ...action.payload, role: `admin` }
          setStorage(`active`, state.active)
        }
      },
      prepare: (username, password) =>
      {
        return {
          payload: { username, password }
        }
      }
    },
    logout: (state) =>
    {
      state.active = []
      setStorage(`active`, state.active)
    }
  }
})

export const activeUser = state => state.user.active
export const { studentLogin, adminLogin, logout } = usersSlice.actions

export default usersSlice.reducer
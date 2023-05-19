import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../helpers";

const initialState = {
  student: getStorage(`students`),
  admin: [{ id: 1, username: `admin`, password: `admin` }],
  active: getStorage(`active`),
};

const usersSlice = createSlice({
  name: `users`,
  initialState,
  reducers: {
    studentLogin: {
      reducer: (state, action) => {
        state.active = action.payload;
        setStorage(`active`, state.active);
      },
      prepare: (name, matricNumber) => {
        return {
          payload: { name, matricNumber, role: `student` },
        };
      },
    },
    adminLogin: {
      reducer: (state, action) => {
        const { username, password } = action.payload;
        const currentUser = state.admin.find(
          (user) => user.username === username
        );
        if (currentUser && currentUser.password === password) {
          state.active = { id: nanoid(), ...action.payload, role: `admin` };
          setStorage(`active`, state.active);
        }
      },
      prepare: (username, password) => {
        return {
          payload: { username, password },
        };
      },
    },
    logout: (state) => {
      state.active = [];
      setStorage(`active`, state.active);
    },
  },
});

export const activeUser = (state) => state.user.active;
export const students = (state) => state.user.student;
export const { studentLogin, adminLogin, logout } = usersSlice.actions;

export default usersSlice.reducer;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./admin/Welcome";
import CreateCourse from "./admin/CreateCourse";
import Students from "./admin/Students";
import Logout from "./admin/Logout";
import Course from "./admin/Course";
import Home from "./users/Home";
import Exam from "./users/Exam";
import Admin from "./admin/Admin";
import ExamsList from "./users/ExamsList";
import ShowScores from "./ShowScores";
import Error from "./Error";

export default function Pages ()
{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="logout" element={<Logout />} />
            <Route path="scores" element={<ShowScores />} />
            <Route path="exam/:id" element={<Exam />} />
            <Route path="exam-list" element={<ExamsList />} />
            <Route path="admin">
              <Route path="login" element={<Admin />} />
              <Route path="logout" element={<Logout />} />
              <Route path="create" element={<CreateCourse />} />
              <Route path="students" element={<Students />} />
              <Route path="exam/:id" element={<Course />} />
              <Route path="dashboard" element={<Welcome />} />
            </Route>
          </Route>
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

import React from "react";
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

export default function Pages() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam-list" element={<ExamsList />} />
          <Route path="/exam/:id" element={<Exam />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin/login" element={<Admin />} />
          <Route path="/admin/dashboard" element={<Welcome />} />
          <Route path="/admin/create" element={<CreateCourse />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/exam/:id" element={<Course />} />
          <Route path="/admin/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

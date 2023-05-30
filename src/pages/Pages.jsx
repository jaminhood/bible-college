import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './Error';
import Admin from './admin/Admin';
import Course from './admin/Course';
import CreateCourse from './admin/CreateCourse';
import Logout from './admin/Logout';
import Students from './admin/Students';
import Welcome from './admin/Welcome';
import Exam from './users/Exam';
import ExamsList from './users/ExamsList';
import Home from './users/Home';

/**
 * Pages - RCBC
 *
 * Control all routes on App
 * @returns JSX
 */
export default function Pages() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/'>
						<Route
							index
							element={<Home />}
						/>
						<Route
							path='logout'
							element={<Logout />}
						/>
						<Route
							path='exam/:id'
							element={<Exam />}
						/>
						<Route
							path='exam-list'
							element={<ExamsList />}
						/>
						<Route path='admin'>
							<Route
								path='login'
								element={<Admin />}
							/>
							<Route
								path='logout'
								element={<Logout />}
							/>
							<Route
								path='create'
								element={<CreateCourse />}
							/>
							<Route
								path='students'
								element={<Students />}
							/>
							<Route
								path='exam/:id'
								element={<Course />}
							/>
							<Route
								path='dashboard'
								element={<Welcome />}
							/>
						</Route>
					</Route>
					<Route
						path='/*'
						element={<Error />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

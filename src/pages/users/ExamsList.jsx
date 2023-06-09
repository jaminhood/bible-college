import { collection, getDocs } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import bg from '../../assets/imgs/bg.jpg';
import { Page } from '../../components';
import UserExamBox from '../../components/UserExamBox';
import { db } from '../../config/firebase';
import { activeUser } from '../../redux/usersSlice';

const ExamsList = () => {
	const navigate = useNavigate();

	const user = useSelector(activeUser);
	const [allExams, setAllExams] = useState([]);

	const getExams = useCallback(
		async () =>
			await getDocs(collection(db, `exams`))
				.then(data =>
					data.docs.map(item => {
						const data = item.data();
						data.id = item.id;
						return data;
					}),
				)
				.then(data => setAllExams(data)),
		[],
	);

	useEffect(() => {
		getExams();
	}, []);

	useEffect(() => {
		user.role === undefined
			? navigate(`/`)
			: user.role === `student`
			? false
			: navigate(`/admin/dashboard`);
	});

	const flexSpaceCls = `d-flex justify-content-between align-items-center`;

	return (
		<>
			<Page title={`Exams`}>
				<section
					className='home-section text-light'
					style={{ backgroundImage: `url(${bg})` }}>
					<Container>
						<Row>
							<Col
								md={12}
								className={`border-bottom pb-3 my-3 ${flexSpaceCls}`}>
								<h1 className='m-0'>Welcome, {user.name}</h1>
								<Link to={`/logout`}>
									<button className='btn btn-danger'>Logout</button>
								</Link>
							</Col>
						</Row>
						<Row>
							{allExams.map(exam => (
								<Col
									md={6}
									lg={4}
									key={exam.id}>
									<UserExamBox exam={exam} />
								</Col>
							))}
						</Row>
					</Container>
				</section>
			</Page>
		</>
	);
};

export default ExamsList;

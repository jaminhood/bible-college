import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiPaperPlane } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import bg from '../../assets/imgs/bg.jpg';
import { Page, QuestionCard } from '../../components';
import { ExamTimer } from '../../components/ExamTimer';
import { db } from '../../config/firebase';
import { submitExam } from '../../helpers';
import { activeUser } from '../../redux/usersSlice';

export default function Exam() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [store, setStore] = useState({
		currentExam: {},
		answers: [],
		examEnd: false,
		user: useSelector(activeUser),
	});

	useEffect(() => {
		store.user.role === undefined
			? navigate(`/`)
			: store.user.role === `student`
			? false
			: navigate(`/admin/dashboard`);
	});

	const getStore = async () =>
		await getDoc(doc(db, `exams`, id)).then(data =>
			setStore({ ...store, currentExam: data.data() }),
		);

	useEffect(() => {
		getStore();
	}, []);

	const handleAnswer = (questionId, answerId) => {
		if (store.answers.find(answer => answer.questionId === questionId)) {
			const tmpAnswer = store.answers.map(ans => {
				if (ans.questionId === questionId) {
					ans.answerId = answerId;
				}
				return ans;
			});
			setStore({ ...store, answers: tmpAnswer });
		} else {
			const ids = {
				questionId,
				answerId,
				type: `option`,
			};
			setStore({ ...store, answers: [...store.answers, ids] });
		}
	};

	const timeout = () => navigate(`/`);

	const handleFinished = () => {
		const score = {
			user: store.user.matricNumber,
			examId: id,
			objective: 0,
			essay: store.answers
				.filter(answer => answer.type === `essay`)
				.map(answer => answer.essayContent)[0],
		};

		store.answers
			.filter(answer => answer.type === `option`)
			.forEach(option => {
				store.currentExam.questions.forEach(question => {
					if (question.id === option.questionId) {
						question.options &&
							question.options.forEach(opt => {
								if (opt.id === option.answerId && opt.isCorrect === true) {
									score.objective += 1;
								}
							});
					}
				});
			});

		submitExam(score);
		setStore({ ...store, examEnd: !store.examEnd });
		setTimeout(timeout, 2000);
	};

	const handleEssay = (questionId, essay) => {
		if (store.answers.find(answer => answer.questionId === questionId)) {
			const tmpAnswer = store.answers.map(ans => {
				if (ans.questionId === questionId) {
					ans.essayContent = essay;
				}
				return ans;
			});
			setStore({ ...store, answers: tmpAnswer });
		} else {
			const ids = {
				questionId,
				essayContent: essay,
				type: `essay`,
			};
			setStore({ ...store, answers: [...store.answers, ids] });
		}
	};

	return (
		<>
			<Page title='Exam'>
				<section
					className='exam-section text-light d-flex justify-content-center align-items-center'
					style={{ backgroundImage: `url(${bg})` }}>
					<Container>
						<Row>
							<Col
								md={6}
								lg={10}
								className='offset-md-3 offset-lg-1'>
								<div className='form-box w-100 bg-light text-dark p-3 rounded-3'>
									{store.examEnd === false ? (
										<div className='card'>
											<div className='card-header text-center'>
												<p className='display-6 m-0'>
													{store.currentExam.title}
												</p>
											</div>
											{store.currentExam.questions !== undefined &&
												store.currentExam.questions.map(question => (
													<QuestionCard
														question={question}
														key={question.id}
														answers={store.answers}
														handleAnswer={handleAnswer}
														handleEssay={handleEssay}
													/>
												))}
											<div className='card-footer'>
												<div className='w-100 d-flex justify-content-end align-items-center'>
													<motion.button
														whileTap={{ scale: 1.2 }}
														className='btn btn-success btn-md w-100'
														onClick={handleFinished}>
														Finish
														<BiPaperPlane className='icon ms-3' />
													</motion.button>
												</div>
											</div>
										</div>
									) : (
										<div className='card'>
											<div className='card-body text-center'>
												<h3 className='display-6'>
													Examination Completed Successfully
												</h3>
											</div>
										</div>
									)}
								</div>
							</Col>
						</Row>
					</Container>
				</section>
				<ExamTimer examEnd={store.examEnd} />
			</Page>
		</>
	);
}

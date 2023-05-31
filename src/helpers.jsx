import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { db } from './config/firebase';

export const getStorage = key => {
	return JSON.parse(localStorage.getItem(key) || `[]`);
};

export const setStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
	return true;
};

export const formatTime = time => {
	let minute = Math.floor(time / 60);
	let second = Math.floor(time - minute * 60);
	if (minute <= 9) minute = '0' + minute;
	if (second <= 9) second = '0' + second;
	return minute + ':' + second;
};

export const days = [
	`Sunday`,
	`Monday`,
	`Tuesday`,
	`Wednesday`,
	`Thursday`,
	`Friday`,
	`Saturday`,
];

export const months = [
	`January`,
	`Febuary`,
	`March`,
	`April`,
	`May`,
	`June`,
	`July`,
	`August`,
	`September`,
	`October`,
	`November`,
	`December`,
];

export const addScore = async score => {
	await addDoc(collection(db, `scores`), score);
};

export const addAnExam = async exam => {
	await addDoc(collection(db, `exams`), exam);
};

export const removeAnExam = async id => {
	await deleteDoc(doc(db, `exams`, id));
};

export const updateAnExam = async (exam, input) => {
	await updateDoc(doc(db, `exams`, exam.id), {
		questions: [...exam.questions, input],
	});
};

export const removeAQuestion = async (exam, question) => {
	const tmpQuestions = exam.questions.filter(qst => qst.id !== question.id);
	await updateDoc(doc(db, `exams`, exam.id), {
		questions: tmpQuestions,
	});
};

export const addStudent = async student => {
	await addDoc(collection(db, `students`), student);
};

export const updateAnswer = async input => {
	const { user, examId, questionId, answerId, essayContent, type } = input;
	const answers = getStorage(`answers`);
	let tmpAnswers = [];
	if (
		answers.filter(
			answer =>
				answer.user === user &&
				answer.examId === examId &&
				answer.questionId === questionId,
		).length > 0
	) {
		tmpAnswers = answers.map(answer => {
			if (
				answer.user === user &&
				answer.examId === examId &&
				answer.questionId === questionId
			) {
				answer.answer = type === `option` ? answerId : essayContent;
			}
			return answer;
		});
		const answer = answers.find(
			answer =>
				answer.user === user &&
				answer.examId === examId &&
				answer.questionId === questionId,
		);
		await updateDoc(doc(db, `answers`, answer.id), {
			answer: type === `option` ? answerId : essayContent,
		}).then(() => setStorage(`answers`, tmpAnswers));
	} else {
		const answer = type === `option` ? answerId : essayContent;
		tmpAnswers = [...answers, { user, examId, questionId, answer, type }];
		await addDoc(collection(db, `answers`), {
			user,
			examId,
			questionId,
			answer: type === `option` ? answerId : essayContent,
			type,
		}).then(() => setStorage(`answers`, tmpAnswers));
	}
};

export const submitExam = async input => {
	await addDoc(collection(db, `scores`), {
		...input,
		essay: input.essay ? input.essay : ``,
	});
};

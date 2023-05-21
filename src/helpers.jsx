import
  {
    addDoc,
    collection,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
import { db } from "./config/firebase";

export const getStorage = (key) =>
{
  return JSON.parse(localStorage.getItem(key) || `[]`);
};

export const setStorage = (key, value) =>
{
  localStorage.setItem(key, JSON.stringify(value));
  return true;
};

export const formatTime = (time) =>
{
  let minute = Math.floor(time / 60);
  let second = Math.floor(time - minute * 60);
  if (minute <= 9) minute = "0" + minute;
  if (second <= 9) second = "0" + second;
  return minute + ":" + second;
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

export const addScore = async (score) =>
{
  await addDoc(collection(db, `scores`), score);
};

export const addAnExam = async (exam) =>
{
  await addDoc(collection(db, `exams`), exam);
};

export const removeAnExam = async (id) =>
{
  await deleteDoc(doc(db, `exams`, id));
};

export const updateAnExam = async (exam, input) =>
{
  await updateDoc(doc(db, `exams`, exam.id), {
    questions: [...exam.questions, input],
  });
};

export const removeAQuestion = async (exam, question) =>
{
  const tmpQuestions = exam.questions.filter((qst) => qst.id !== question.id);
  await updateDoc(doc(db, `exams`, exam.id), {
    questions: tmpQuestions,
  });
};

export const addStudent = async (student) =>
{
  await addDoc(collection(db, `students`), student);
};

export const updateAnswer = async (input) =>
{
  const { user, examId, questionId, answerId, essayContent, type } = input;
  const answers = getStorage(`answers`);
  let tmpAnswers = [];
  if (
    answers.filter(
      (answer) =>
        answer.user === user &&
        answer.examId === examId &&
        answer.questionId === questionId
    ).length > 0
  )
  {
    tmpAnswers = answers.map((answer) =>
    {
      if (
        answer.user === user &&
        answer.examId === examId &&
        answer.questionId === questionId
      )
      {
        answer.answer = type === `option` ? answerId : essayContent;
      }
      return answer;
    });
    const answer = answers.find(
      (answer) =>
        answer.user === user &&
        answer.examId === examId &&
        answer.questionId === questionId
    );
    await updateDoc(doc(db, `answers`, answer.id), {
      answer: type === `option` ? answerId : essayContent,
    }).then(() => setStorage(`answers`, tmpAnswers));
  } else
  {
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

export const submitExam = async (input) =>
{
  const { user, examId } = input;
  const answers = getStorage(`answers`);

  const newAnswers = answers.filter(
    (answer) => answer.user === user && answer.examId === examId
  );

  const score = {
    objective: 0,
    essay: newAnswers
      .filter((answer) => answer.type === `essay`)
      .map((answer) => answer.answer)[0],
  };

  const newOptions = newAnswers.filter((answer) => answer.type === `option`);
  newOptions.forEach((option) =>
  {
    getStorage(`exams`).forEach((exam) =>
    {
      if (exam.id === option.examId)
      {
        exam.questions.forEach((question) =>
        {
          if (question.id === option.questionId)
          {
            question.options &&
              question.options.forEach((opt) =>
              {
                if (opt.id === option.answer && opt.isCorrect === true)
                {
                  score.objective += 1;
                }
              });
          }
        });
      }
    });
  });
  if (
    getStorage(`scores`).filter(
      (sc) => sc.user === user && sc.examId === examId
    ).length > 0
  )
  {
    const tmpScores = getStorage(`scores`).map((sc) =>
    {
      if (sc.user === user && sc.examId === examId)
      {
        sc.score = score;
      }
      return sc;
    });

    await updateDoc(
      doc(
        db,
        `scores`,
        getStorage(`scores`).find(
          (sc) => sc.user === user && sc.examId === examId
        ).id
      ),
      {
        score,
      }
    ).then(() => setStorage(`scores`, tmpScores));
  } else
  {
    const tmpScores = [...getStorage(`scores`), { user, examId, score }];
    await addDoc(collection(db, `scores`), { user, examId, score }).then(() =>
      setStorage(`scores`, tmpScores)
    );
  }
};

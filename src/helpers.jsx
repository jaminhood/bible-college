import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "./config/firebase"

export const getStorage = (key) =>
{
  return JSON.parse(localStorage.getItem(key) || `[]`)
}

export const setStorage = (key, value) =>
{
  localStorage.setItem(key, JSON.stringify(value))
  return true
}

export const days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
]

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
]

export const addAnExam = async (exam) =>
{
  await addDoc(collection(db, `exams`), exam)
}

export const removeAnExam = async (id) =>
{
  await deleteDoc(doc(db, `exams`, id))
}

export const updateAnExam = async (exam, input) =>
{
  await updateDoc(doc(db, `exams`, exam.id), {
    questions: [
      ...exam.questions,
      input
    ]
  })
}

export const removeAQuestion = async (exam, question) =>
{
  const tmpQuestions = exam.questions.filter(qst => qst.id !== question.id)
  await updateDoc(doc(db, `exams`, exam.id), {
    questions: tmpQuestions
  })
}

export const addStudent = async (student) =>
{
  await addDoc(collection(db, `students`), student)
}

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
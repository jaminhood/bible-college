import { useEffect, useState } from "react"

const getStorage = (key, value) =>
{
  const stored = JSON.parse(localStorage.getItem(key))
  if (stored) return stored
  if (value instanceof Function) return value()
  return value
}

const useLocalStorage = (key, value) =>
{
  const [val, setVal] = useState(() => getStorage(key, value))

  useEffect(() => localStorage.setItem(key, JSON.stringify(val)), [val])

  return [val, setVal]
}

export default useLocalStorage
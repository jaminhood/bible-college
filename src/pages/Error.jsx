import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const formatTime = (time) => {
  let minute = Math.floor(time / 60);
  let second = Math.floor(time - minute * 60);
  if (minute <= 9) minute = "0" + minute;
  if (second <= 9) second = "0" + second;
  return minute + ":" + second;
};

const Error = () => {
  const [time, setTime] = useState(11);
  const timeout = useRef();

  useEffect(() => {
    timeout.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timeout.current);
  }, []);

  useEffect(() => {
    if (time <= 0) clearInterval(timeout.current);
  }, [time]);

  return (
    <>
      <h2>{formatTime(time)}</h2>
    </>
  );
};

export default Error;

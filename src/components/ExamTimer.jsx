import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../helpers';

export const ExamTimer = ({ examEnd }) => {
	const timer = useRef();

	const [data, setData] = useState({
		timerEnd: false,
	});

	const [time, setTime] = useState(2400);

	useEffect(() => {
		timer.current = setInterval(() => {
			setTime(prev => prev - 1);
		}, 1000);
		return () => clearInterval(timer.current);
	}, []);

	useEffect(() => {
		if (data.time <= 0) {
			clearInterval(timer.current);
			setData({ ...data, timerEnd: !data.timerEnd });
		}
	}, [time]);

	return (
		<>
			{examEnd === false && (
				<div
					className={`timer p-1 text-light text-center bg-${
						data.timerEnd ? `danger` : `success`
					}`}>
					<p className='lead m-0'>
						{data.timerEnd ? (
							`Time's Up, Please Submit`
						) : (
							<span>{formatTime(time)}</span>
						)}
					</p>
				</div>
			)}
		</>
	);
};

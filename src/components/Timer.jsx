import React, { useEffect, useState } from 'react'

const Timer = ({ setStopTime, questionNo }) => {
    const [timer, setTimer] = useState(30);
    useEffect(() => {
        if (timer === 0) return setStopTime(true);
        const interval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [setStopTime, timer]);

    useEffect(() => {
        setTimer(30);
    }, [questionNo])

    return timer;

}

export default Timer

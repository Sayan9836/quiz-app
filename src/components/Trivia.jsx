import React, { useEffect, useState } from 'react'
import useSound from 'use-sound';
import correct from '../assests/correct.wav'
import wrong from '../assests/wrong.wav'
const Trivia = ({ data, setStopTime, questionNo, setquestionNo }) => {

    const [question, setquestion] = useState(null);
    const [selectedAns, setSelectedAns] = useState("");
    const [className, setClassName] = useState("answer");
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);


    useEffect(() => {
        setquestion(data[questionNo - 1])
    }, [data, questionNo])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);

    }

    const handleClick = (a) => {
        setSelectedAns(a);
        setClassName("answer active")
        delay(2000, () => setClassName(a.correct ? "answer correct" : "answer wrong"))
        delay(5000, () => {
            if (a.correct) {
                correctAnswer();
                delay(7000, () => {
                    setquestionNo(questionNo + 1);
                    setSelectedAns(null)
                })
            } else {
                wrongAnswer();
                delay(2000, () => {
                    setStopTime(true);
                })
            }
        }
        );

    }

    return (
        <div className='trivia'>
            <div className="questions">{question?.question}</div>
            <div className="answers">
                {
                    question?.answers.map((a) => {
                        return <div className={selectedAns === a ? className : 'answer'} onClick={() => handleClick(a)}>{a.text}</div>
                    })
                }

            </div>
        </div>
    )
}

export default Trivia

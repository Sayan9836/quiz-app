
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Trivia from './components/Trivia';
import data from './components/Data';
import Timer from './components/Timer';
import Start from './components/Start';

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNo, setquestionNo] = useState(1);
  const [stoptime, setStopTime] = useState(false);
  const [earned, setEarned] = useState("$ 0");


  const moneyPiramid = useMemo(() =>
    [
      { id: 1, amount: "$ 100" },
      { id: 2, amount: "$ 200" },
      { id: 3, amount: "$ 300" },
      { id: 4, amount: "$ 400" },
      { id: 5, amount: "$ 500" },
      { id: 6, amount: "$ 1000" },
      { id: 7, amount: "$ 2000" },
      { id: 8, amount: "$ 5000" },
      { id: 9, amount: "$ 10000" },
      { id: 10, amount: "$ 50000" },
      { id: 11, amount: "$ 100000" },
      { id: 12, amount: "$ 150000" },
      { id: 13, amount: "$ 200000" },
      { id: 14, amount: "$ 250000" },
      { id: 15, amount: "$ 500000" },
      { id: 16, amount: "$ 1000000" },

    ].reverse(),
    [])

  useEffect(() => {
    questionNo > 1 &&
      setEarned(moneyPiramid.find((m) => m.id === questionNo - 1).amount)
  }, [moneyPiramid, questionNo])

  return (
    <div className="app">
      {
        !userName ? (
          <Start setUserName={setUserName} />
        ) : (
          <>
            <div className='main'>
              {
                stoptime ? (
                  <h1 className='earnings' > You Earned {earned}</h1>
                ) : (
                  <>
                    <div className='top'>
                      <div className="timer"><Timer setStopTime={setStopTime} questionNo={questionNo} /></div>
                    </div>
                    <div className='bottom'>
                      <Trivia data={data} setStopTime={setStopTime} questionNo={questionNo} setquestionNo={setquestionNo} />
                    </div>
                  </>
                )
              }
            </div >
            <div className='pyramid'>
              <ul className="moneylist">
                {
                  moneyPiramid.map((m, idx) => {
                    return <li idx={m.id} className={questionNo === m.id ? 'moneylistitem active' : 'moneylistitem'}>
                      <span className='moneylistitemnumber'>{m.id}</span>
                      <span className='moneylistitemamout'>{m.amount}</span>
                    </li> 
                  })
                }
              </ul>
            </div>
          </>

        )}

    </div >

  );

}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import questionsData from "./data/quiz.json";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let interval
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1)
      }, 1000)
    }
    else {
      if (timer === 0) {
        setCurrentQuestion(prev => prev + 1);
        setTimer(2);
        // Check if all questions have been answered
        if (currentQuestion + 1 === questionsData.length) {
          setShowScore(true);
        }
      }
    }
    clearInterval(timer)
    return () => {
      clearInterval(interval)
    }
  }, [timer, showScore])

  const handleAnwerClick = (selectedOption) => {
    if (selectedOption === questionsData[currentQuestion].correctOption) {
      setScore(prevScore => prevScore + 1)
    }

    if (currentQuestion < questionsData.length - 1) {
      console.log(currentQuestion);
      console.log(questionsData);
      console.log(questionsData.length);
      setCurrentQuestion((prevQues) => prevQues + 1)
      setTimer(10)
    }
    else {
      setShowScore(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setTimer(10)
  }

  return (
    <>
      <section className="quiz-app">
        {showScore ? (
          <div className="score-section">
            <h2>Your Score: {score} / {questionsData.length} </h2>
            <button onClick={handleRestart}>Restart</button>
          </div>
        ) : (
          <div className="question-section">
            <h2>Question {currentQuestion + 1}</h2>
            <p>{questionsData[currentQuestion].question}</p>
            <div className="options">
              {questionsData[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnwerClick(option)}>{option}</button>
              ))}
            </div>
            <div className="timer">
              Time Left: <span>{timer}s</span>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default App;


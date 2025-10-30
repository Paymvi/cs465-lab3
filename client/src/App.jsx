import { useState } from 'react'
import React, { Component } from "react";
import './App.css'

import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./components/Question";
import qBank from './sampleQuizFile.json';
import Score from "./components/Score";



function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);

  const currentQuestionData = qBank.questions[currentQuestion];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    checkAnswer();
    handleNextQuestion();
  }

  const checkAnswer = () => {
    if (selectedOption === currentQuestionData.answer){
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < qBank.length){
      setCurrentQuestion((prev) => prev + 1)
      setSelectedOption("");
    } else {
      setQuizEnd(true);
    }
  }

console.log("qBank:", qBank);
console.log("currentQuestion:", currentQuestion);

// Don't forget the .question

if (!currentQuestionData) {
  console.error("Invalid currentQuestion index:", currentQuestion);
  return <div>Error: Invalid question index.</div>;
}

if (currentQuestion >= qBank.length || currentQuestion < 0) {
  return <div>Invalid question index. Something went wrong!</div>;
}

  return (

    
    <div className="App d-flex flex-column align-items-center justify-content-center">
      <h1 className="app-title">QUIZ APP</h1>

      

      {!quizEnd ? (
        <Question
          question={currentQuestionData}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          onSubmit={handleFormSubmit}
        />

      ) : (
        <Score score={score} className="score"/>

      )
      }


    </div>
  )
}

export default App

import { useState } from 'react'
// import React, { Component } from "react";
import './App.css'

import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./components/Question";
import quiz1  from './quiz-1.json';
import quiz2  from './quiz-2.json';
import quiz3 from './quiz-3.json';
import quiz4 from './quiz-4.json';
import Score from "./components/Score";



function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);

  const topics = {
    Real_or_Fake: [quiz1, quiz2 ],
    Weird_Facts: [quiz3, quiz4]
  }

  
  const currentQuizData = 
    selectedTopic !== null && selectedQuizIndex !== null
    ? topics[selectedTopic][selectedQuizIndex]
    : null;
  
  const currentQuestionData = currentQuizData?.questions[currentQuestion];

  // Same process as the !currentQuiz one but with a topic
  if (!selectedTopic){
    return (
      <div className="">
        <h1>Select a Topic 👀</h1>
        <div>
          {/* The reason we use this is so that it repeats for as many topics as there is */}
          {Object.keys(topics).map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className="btn btn-primary m-2"
          >
            {topic}
          </button>
        ))}
        </div>
      </div>

    );
  }

  if (selectedTopic && selectedQuizIndex === null) {
    return (
      <div className="">
        <h1>{selectedTopic} Quizzes</h1>
        <div>
          {topics[selectedTopic].map((quiz, index) => (
            <button
              key={index}
              onClick={() => setSelectedQuizIndex(index)}
              className="btn btn-success m-2"
            >
              Quiz {index + 1}
            </button>
          ))}
        </div>
      </div>

    )

  }


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

    if (currentQuestion + 1 < currentQuizData.questions.length){
      setCurrentQuestion((prev) => prev + 1)
      setSelectedOption("");
    } else {
      setQuizEnd(true);
    }
  }


// Don't forget the .question

if (!currentQuestionData) {
  console.error("Invalid currentQuestion index:", currentQuestion);
  return <div>Error: Invalid question index.</div>;
}

if (currentQuestion >= currentQuizData.questions.length || currentQuestion < 0) {
  return <div>Invalid question index. Something went wrong!</div>;
}

  return (

    
    <div className="App d-flex flex-column align-items-center justify-content-center">
      <h1 className="app-title">Time for a quiz! (a fun one)</h1><br/>

      {!quizEnd ? (
        <Question
          question={currentQuestionData}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          onSubmit={handleFormSubmit}
        />

      ) : (
        <div>
          <Score score={score} className="score"/>
          <button
              className="btn btn-secondary mt-3"
              onClick={() => {
                setSelectedTopic(null);
                setSelectedQuizIndex(null);
                setCurrentQuestion(0);
                setScore(0);
                setQuizEnd(false);
              }}

            >
              Go Back to Quiz Selection
          </button>
        </div>

      )
      }


    </div>
  )
}

export default App

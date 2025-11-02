import React from "react";

/* Note: I used AI to help me figure out how to convert the radio button setup to 
a clickable text button setup*/

function Question({ question, selectedOption, onOptionChange, onSubmit }) {
  return (
    <div className="question-container text-center">
      <h3 className="mb-4">{question.question}</h3>

      <div className="options-grid">
        {question.options.map((option, index) => (
          <button
            key={index}
            type="button"
            className={`btn option-btn ${
              selectedOption === option ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => onOptionChange({ target: { value: option } })}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        className="btn btn-success mt-4"
        onClick={onSubmit}
        disabled={!selectedOption}
      >
        Next Question →
      </button>
    </div>
  );
}

export default Question;

import React, { useState, useEffect } from 'react';
import './CookingMode.css'

const CookingMode = ({ recipe }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => {
      // Clear the timer when the component unmounts
      clearTimeout(timer);
    };
  }, [timer]);

  const handleNextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle completion of cooking mode
    }
  };

  const startTimer = (time) => {
    clearTimeout(timer); // Clear the previous timer, if any
    setTimer(
      setTimeout(() => {
        handleNextStep();
      }, time * 1000)
    );
  };

  const currentStepData = recipe.steps[currentStep];

  return (
    <div className="cooking-mode">
      <div className="step-container">
        <h3>{recipe.name}</h3>
        <p>Step {currentStep + 1}</p>
        <p>Description: {currentStepData.description}</p>
        <p>Output: {currentStepData.recipeOutput}</p>
        <p>Timer: {currentStepData.timer} seconds</p>

        {/* Render the ingredients for the current step */}
        <div className="step-content">
          <h3>Ingredients:</h3>
          <ul>
            {currentStepData.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name}: {ingredient.amount}
              </li>
            ))}
          </ul>
        </div>

        {/* Render the user input section if required */}
        {currentStepData.input && (
          <div className="step-content">
            <h3>User Input:</h3>
            <input type="text" />
            {/* Add appropriate event handlers to handle user input */}
          </div>
        )}

        {/* Render the next step button */}
        <div className="step-actions">
          <button onClick={handleNextStep}>Next Step</button>

          {/* Start the timer if required */}
          {currentStepData.timer > 0 && (
            <div className="timer-container">
              <div className="timer">{currentStepData.timer}</div>
              <div>
                <button className="timer-action timer-start" onClick={() => startTimer(currentStepData.timer)}>
                  Start Timer
                </button>
                <button className="timer-action timer-pause">Pause Timer</button>
                <button className="timer-action timer-reset">Reset Timer</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookingMode;

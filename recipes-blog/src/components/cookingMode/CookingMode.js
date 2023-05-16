import React, { useState, useEffect } from "react";
import "./CookingMode.css";

const CookingMode = ({ recipe }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    recipe.steps[0].timer * 60
  );

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  useEffect(() => {
    setIsLastStep(currentStep === recipe.steps.length - 1);
  }, [currentStep, recipe.steps.length]);

  const handleNextStep = () => {
    if (isTimerActive) {
      return;
    }

    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
    }
  };

  const startTimer = (time) => {
    clearTimeout(timer);
    setIsTimerActive(true);
    setTimeRemaining(time * 60);

    setTimer(
      setTimeout(() => {
        setIsTimerActive(false);
        handleNextStep();
      }, time * 60 * 1000)
    );
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isTimerActive, timeRemaining]);

  const currentStepData = recipe.steps[currentStep];

  return (
    <div className="cooking-mode">
      <div className="step-container">
        <h3>{recipe.name}</h3>
        <p>Step {currentStep + 1}</p>
        <p>Description: {currentStepData.description}</p>
        <p>Output: {currentStepData.recipeOutput}</p>
        {currentStepData.timer > 0 && <p>Timer: {formatTime(timeRemaining)}</p>}

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

        {currentStepData.input && (
          <div className="step-content">
            <h3>User Input:</h3>
            <input type="text" />
          </div>
        )}

        <div className="step-actions">
          {!isLastStep && (
            <button onClick={handleNextStep} disabled={isTimerActive}>
              {isTimerActive ? "Timer in progress..." : "Next Step"}
            </button>
          )}

          {currentStepData.timer > 0 && (
            <div className="timer-container">
              <div className="timer">
                {isTimerActive ? (
                  <span>{formatTime(timeRemaining)}</span>
                ) : (
                  <button
                    className="timer-action timer-start"
                    onClick={() => startTimer(currentStepData.timer)}
                  >
                    Start Timer
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookingMode;

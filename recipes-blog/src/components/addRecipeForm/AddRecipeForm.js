import React, { useState } from "react";
import axios from "axios";
import "./AddRecipeForm.css";

const RecipeForm = () => {
  const [name, setName] = useState("");
  const [steps, setSteps] = useState([
    {
      description: "",
      recipeOutput: "",
      timer: 0,
      ingredients: [{ name: "", amount: 0 }],
    },
  ]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, index, subIndex) => {
    const { name, value } = e.target;
    const updatedSteps = [...steps];

    if (subIndex !== undefined) {
      updatedSteps[index].ingredients[subIndex][name] = value;
    } else {
      updatedSteps[index][name] = value;
    }

    setSteps(updatedSteps);
  };

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        description: "",
        recipeOutput: "",
        timer: 0,
        ingredients: [{ name: "", amount: 0 }],
      },
    ]);
  };

  const handleAddIngredient = (index) => {
    const updatedSteps = [...steps];
    updatedSteps[index].ingredients.push({ name: "", amount: 0 });
    setSteps(updatedSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    const validationErrors = {};

    if (name.trim() === "") {
      validationErrors.name = "Recipe Name is required";
    }

    steps.forEach((step, index) => {
      if (step.description.trim() === "") {
        validationErrors[`description-${index}`] = `Step ${
          index + 1
        } Description is required`;
      }

      if (step.timer < 0) {
        validationErrors[`timer-${index}`] = `Step ${
          index + 1
        } Timer must be a positive number`;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const recipe = { name, steps };
      await axios.post("http://localhost:8080/recipe", recipe);

      setName("");
      setSteps([
        {
          description: "",
          recipeOutput: "",
          timer: 0,
          ingredients: [{ name: "", amount: 0 }],
        },
      ]);
      alert("Recipe added successfully!");
    } catch (error) {
      throw new Error("There was an error during adding the recipe");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <div>
        <label htmlFor="name">Recipe Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? "error" : ""}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      <div>
        <h2>Steps:</h2>
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div>
              <label htmlFor={`stepDescription-${index}`}>
                Step {index + 1} Description:
              </label>
              <input
                type="text"
                id={`stepDescription-${index}`}
                name="description"
                value={step.description}
                onChange={(e) => handleInputChange(e, index)}
                className={errors[`description-${index}`] ? "error" : ""}
              />
              {errors[`description-${index}`] && (
                <span className="error-message">
                  {errors[`description-${index}`]}
                </span>
              )}
            </div>
            <div>
              <label htmlFor={`stepRecipeOutput-${index}`}>
                Step {index + 1} Output:
              </label>
              <input
                type="text"
                id={`stepRecipeOutput-${index}`}
                name="recipeOutput"
                value={step.recipeOutput}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div>
              <label htmlFor={`stepTimer-${index}`}>
                Step {index + 1} Timer:
              </label>
              <input
                type="number"
                id={`stepTimer-${index}`}
                name="timer"
                value={step.timer}
                onChange={(e) => handleInputChange(e, index)}
                className={errors[`timer-${index}`] ? "error" : ""}
              />
              {errors[`timer-${index}`] && (
                <span className="error-message">
                  {errors[`timer-${index}`]}
                </span>
              )}
            </div>
            <div className="ingredients">
              <h4>Ingredients:</h4>
              {step.ingredients.map((ingredient, subIndex) => (
                <div key={subIndex} className="ingredient">
                  <div>
                    <label htmlFor={`ingredientName-${index}-${subIndex}`}>
                      Ingredient Name:
                    </label>
                    <input
                      type="text"
                      id={`ingredientName-${index}-${subIndex}`}
                      name="name"
                      value={ingredient.name}
                      onChange={(e) => handleInputChange(e, index, subIndex)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`ingredientAmount-${index}-${subIndex}`}>
                      Ingredient Amount:
                    </label>
                    <input
                      type="number"
                      id={`ingredientAmount-${index}-${subIndex}`}
                      name="amount"
                      value={ingredient.amount}
                      onChange={(e) => handleInputChange(e, index, subIndex)}
                    />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => handleAddIngredient(index)}>
                Add Ingredient
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddStep}>
          Add Step
        </button>
      </div>
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;

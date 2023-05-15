import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [name, setName] = useState('');
  const [steps, setSteps] = useState([
    {
      description: '',
      recipeOutput: '',
      timer: 0,
      ingredients: [{ name: '', amount: 0 }],
    },
  ]);

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
    setSteps([...steps, { description: '', recipeOutput: '', timer: 0, ingredients: [{ name: '', amount: 0 }] }]);
  };

  const handleAddIngredient = (index) => {
    const updatedSteps = [...steps];
    updatedSteps[index].ingredients.push({ name: '', amount: 0 });
    setSteps(updatedSteps);
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const handleRemoveIngredient = (index, subIndex) => {
    const updatedSteps = [...steps];
    updatedSteps[index].ingredients.splice(subIndex, 1);
    setSteps(updatedSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recipe = { name, steps };
      await axios.post('http://localhost:8080/recipe', recipe);
      // Handle success or redirect
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <div>
        <label htmlFor="name">Recipe Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <h2>Steps:</h2>
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div>
              <label htmlFor={`stepDescription-${index}`}>Step {index + 1} Description:</label>
              <input
                type="text"
                id={`stepDescription-${index}`}
                name="description"
                value={step.description}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div>
              <label htmlFor={`stepRecipeOutput-${index}`}>Step {index + 1} Output:</label>
              <input
                type="text"
                id={`stepRecipeOutput-${index}`}
                name="recipeOutput"
                value={step.recipeOutput}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div>
              <label htmlFor={`stepTimer-${index}`}>Step {index + 1} Timer:</label>
              <input
                type="number"
                id={`stepTimer-${index}`}
                name="timer"
                value={step.timer}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div className="ingredients">
              <h4>Ingredients:</h4>
              {step.ingredients.map((ingredient, subIndex) => (
                <div key={subIndex} className="ingredient">
                  <div>
                    <label htmlFor={`ingredientName-${index}-${subIndex}`}>Ingredient Name:</label>
                    <input
                      type="text"
                      id={`ingredientName-${index}-${subIndex}`}
                      name="name"
                      value={ingredient.name}
                      onChange={(e) => handleInputChange(e, index, subIndex)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`ingredientAmount-${index}-${subIndex}`}>Ingredient Amount:</label>
                    <input
                      type="number"
                      id={`ingredientAmount-${index}-${subIndex}`}
                      name="amount"
                      value={ingredient.amount}
                      onChange={(e) => handleInputChange(e, index, subIndex)}
                    />
                  </div>
                  <button type="button" onClick={() => handleRemoveIngredient(index, subIndex)}>
                    Remove Ingredient
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddIngredient(index)}>
                Add Ingredient
              </button>
            </div>
            <button type="button" onClick={() => handleRemoveStep(index)}>
              Remove Step
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddStep}>
          Add Step
        </button>
      </div>
      <button type="submit">Add Recipe</button>
    </form>
  );
  
              }

export default RecipeForm;
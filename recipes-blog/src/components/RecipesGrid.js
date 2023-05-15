import React, { useEffect, useState } from 'react';

const RecipesGrid = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/recipe')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.log(error));
  }, []);

  const handleRecipeClick = recipe => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="recipe-grid">
      {recipes.map(recipe => (
        <div
          key={recipe.id}
          className="recipe-cube"
          onClick={() => handleRecipeClick(recipe)}
        >
          <h3>{recipe.name}</h3>
        </div>
      ))}
      {selectedRecipe && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedRecipe.name}</h2>
            <p>{selectedRecipe.description}</p>
            {/* Add more details about the selected recipe */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesGrid;

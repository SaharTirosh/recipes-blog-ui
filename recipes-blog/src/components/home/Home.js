import React from 'react';
import RecipesGrid from '../recipesGrid/RecipesGrid';

const Home = () => {
  return (
<>
      <h1 style={{textAlign: 'center'}}>Welcome to our Recipes Blog!</h1>
      <h3>Here is all of our recipes, click your favorite to turn on cooking mode</h3>
      <RecipesGrid/>
</>
)

};

export default Home;
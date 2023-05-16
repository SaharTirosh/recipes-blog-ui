import React from 'react';
import RecipesGrid from './RecipesGrid';

const Home = () => {
  return (
<>
      <h1 style={{textAlign: 'center'}}>Welcome to our Recipes Blog!</h1>
      <h2>Here is all of our recipes:</h2>
      <RecipesGrid/>
</>
)

};

export default Home;
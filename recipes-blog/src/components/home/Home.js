import React from "react";
import RecipesGrid from "../recipesGrid/RecipesGrid";

const Home = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome to our Recipes Blog!</h1>
      <h3>
        Here are all the recipes. Click on your favorite recipe to enter cooking
        mode
      </h3>
      <RecipesGrid />
    </>
  );
};

export default Home;

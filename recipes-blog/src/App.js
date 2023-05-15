import './App.css';
import RecipesGrid from './components/RecipesGrid';
import RecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <div className="App">
      <h1>Recipes Blog</h1>
      <RecipesGrid /> 
      <RecipeForm/>
    </div>
  );
}

export default App;

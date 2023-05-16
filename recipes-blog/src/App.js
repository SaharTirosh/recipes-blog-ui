import React from 'react';
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import Home from './components/Home';
import RecipeForm from './components/AddRecipeForm';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path='/' element={<Home/>} />
          {/* // <Route path="/recipe-form" component={RecipeForm} /> */}
          <Route path='/recipe-form' element={<RecipeForm/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
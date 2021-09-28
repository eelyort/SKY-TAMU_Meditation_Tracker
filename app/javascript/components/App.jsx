import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./example/ExampleHomePage";
import Recipes from "./example/ExampleRecipes";
import Recipe from "./example/ExampleRecipe";
import NewRecipe from "./example/ExampleNewRecipe";

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/recipes" exact>
        <Recipes />
      </Route>
      <Route path="/recipe/:id" exact component={Recipe}>
        {/*TODO: use useParams() hook instead*/}
      </Route>
      <Route path="/recipe" exact>
        <NewRecipe />
      </Route>
    </Switch>
  </Router>
);
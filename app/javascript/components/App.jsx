import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage"
import RecipesHomePage from "./example/ExampleHomePage";
import Recipes from "./example/ExampleRecipes";
import Recipe from "./example/ExampleRecipe";
import NewRecipe from "./example/ExampleNewRecipe";
import Header from "./Header";
import EventsPage from "./pages/EventsPage";
import MembersPage from "./pages/MembersPage";
import LoginPage from "./pages/LoginPage";
import SocialMediaPage from "./pages/SocialMediaPage";
import AttendancePage from "./pages/AttendancePage";
import NewAttendancesPage from "./pages/NewAttendance";

export default () => (
  <div className="wrapper">
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/events" exact>
          <EventsPage />
        </Route>
        <Route path="/members" exact>
          <MembersPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/socialmedia" exact>
          <SocialMediaPage />
        </Route>
        <Route path="/attendance" exact>
          <AttendancePage />
        </Route>
        <Route path="/newAttendance" exact>
          <NewAttendancesPage />
        </Route>

        {/* Example stuff */}
        <Route path="/recipeshome" exact>
          <RecipesHomePage />
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
  </div>
);
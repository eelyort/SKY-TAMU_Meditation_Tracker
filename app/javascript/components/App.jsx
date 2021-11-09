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
import Footer from './Footer';
import ShowEventPage from "./pages/events/ShowEventPage";
import UsersPage from "./pages/users/UsersPage";
import UsersShowEditPage from "./pages/users/UsersShowEditPage";
import LoginPage from "./pages/LoginPage";
import SocialMediaPage from "./pages/SocialMediaPage";
import AttendancePage from "./pages/AttendancePage";
import NewAttendancesPage from "./pages/NewAttendance";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(200, 162, 200)',
    },
    secondary: {
      main: 'rgb(14, 16, 61)',
      color: 'white',
    },
  },
});


export default () => (
  <ThemeProvider theme={theme}>
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
      <Footer />
    </Router>
  </ThemeProvider>
);
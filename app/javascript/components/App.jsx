import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage"
import RecipesHomePage from "./example/ExampleHomePage";
import Recipes from "./example/ExampleRecipes";
import Recipe from "./example/ExampleRecipe";
import NewRecipe from "./example/ExampleNewRecipe";
import Header from "./Header";
import Footer from "./Footer"
import EventsPage from "./pages/events/EventsPage";
import ShowEventPage from "./pages/events/ShowEventPage";
import UsersPage from "./pages/users/UsersPage";
import UsersShowEditPage from "./pages/users/UsersShowEditPage";
import LoginPage from "./pages/LoginPage";
import HelpPage from "./pages/HelpPage";
import AboutPage from "./pages/AboutPage";
import AttendancePage from "./pages/attendance/AttendancePage";
import NewAttendancesPage from "./pages/attendance/NewAttendance";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3d8be8ff',
    },
    secondary: {
      main: '#d88c9aff',
      color: 'white',
    },
  },
});


export default () => (
  <ThemeProvider theme={theme}>
    <Router>
      <div className={'top-wrapper'}>
        <Header />
        <div className={'top-content'}>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/about" exact>
              <AboutPage />
            </Route>

            <Route path="/events" exact>
              <EventsPage />
            </Route>
            <Route path="/event/:id" exact component={ShowEventPage}>
            </Route>

            <Route path="/members" exact>
              <UsersPage />
            </Route>
            <Route path="/members/:userId" exact>
              <UsersShowEditPage />
            </Route>
            <Route path="/members/:userId/edit" exact>
              <UsersShowEditPage />
            </Route>

            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/attendance" exact>
              <AttendancePage />
            </Route>
            <Route path="/newAttendance/:eventId" exact>
              <NewAttendancesPage />
            </Route>
            
            <Route path="/help" exact>
              <HelpPage />
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
        </div>
        <Footer />
      </div>
    </Router>
  </ThemeProvider>
);
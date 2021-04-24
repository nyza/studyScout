import './App.css';
import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { withAuthenticator, AmplifyS3Image} from '@aws-amplify/ui-react'
import StudyCard from "./StudyCards/Study_Card";
import PopOut from "./StudyCards/Study_popout";
import MyStudyCards from "../src/MyStudyCards/MyStudyCards";
import EditCard from "../src/EditCard/EditCard";
import UserProfile from "./ProfilePage/UserProfile";
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Registration from './Registration/Registration';
/* import Auth from '@aws-amplify/auth'; */
import { Auth, Amplify } from 'aws-amplify'
import "../src/components/layout.css"

// import Profile from "./components/Profile";
// import ProfilePage from "./ProfilePage/ProfilePage";

function App() {

  const [ setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  //console.log(Auth.currentAuthenticatedUser());
 console.log(Auth.user.attributes.email)

  return (

    <ThemeProvider theme={theme}>
       <>
        <div className="App">
      
          <Router>
          <Link to="/Registration">Registration</Link>
            <div>

            <Navbar />
              <Switch>
                <Route exact path="/">
                <PopOut/>
                </Route>
                <Route exact path="/studyCard">
                  <StudyCard />
                </Route>
                <Route exact path="/Registration">
                  <Registration />
                  </Route> 
                <Route exact path="/profile">
                  <UserProfile />
                </Route>
                <Route exact path="/myStudyCards">
                  <h1>My Study Cards</h1>
                  <h3>Created Study Cards</h3>
                  <MyStudyCards /> 
                  <h3>Joined Study Cards</h3>
                </Route>
                <Route exact path="/EditCard">
                  <h1>Edit Cards on this Page</h1>
                  <EditCard /> 
                </Route>
              </Switch>
            </div>
          </Router>
          <div>
        </div>
       </div>
         
       </>
    
   </ThemeProvider> 

  );
}
export default withAuthenticator(App);
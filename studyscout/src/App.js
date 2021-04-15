import './App.css';
import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { withAuthenticator, AmplifyS3Image} from '@aws-amplify/ui-react'
import StudyCard from "./StudyCards/Study_Card";
import PopOut from "./StudyCards/Study_popout";
import ProfilePage from "./ProfilePage/UserProfile";
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
/* import Auth from '@aws-amplify/auth'; */
import { Auth, Amplify } from 'aws-amplify'

// import Profile from "./components/Profile";
// import ProfilePage from "./ProfilePage/ProfilePage";

function App() {

  const [ setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  console.log(Auth.currentAuthenticatedUser());
  console.log(Auth.user.attributes.email)

  return (
    
    <ThemeProvider theme={theme}>
       <>
        <div className="App">
          <Router>
        
            <div>

            <Navbar />
              <Switch>
                <Route exact path="/">
                <PopOut/>
                </Route>
                <Route exact path="/studyCard">
                  <StudyCard />
                </Route>
                <Route exact path="/Profile">
                  <ProfilePage />
                </Route>
                <Route exact path="/profilePage">
                  <ProfilePage />
                </Route>
                <Route exact path="/myStudyCards">
                  <PopOut />
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
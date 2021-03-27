import './App.css';
import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { withAuthenticator} from '@aws-amplify/ui-react'
import StudyCard from "./StudyCards/Study_Card"
import ProfilePage from "./ProfilePage/UserProfile"
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Burger, Menu } from '../src/components';



function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  return (
    
    <ThemeProvider theme={theme}>
       <>
        <div className="App">
          <Router>
        
            <div>

            <Navbar />
            {/* <h1>Welcome to Study Scout!</h1> */}
              <Switch>
                <Route exact path="/">
                </Route>
                <Route exact path="/studyCard">
                  <StudyCard />
                </Route>
                <Route exact path="/UserProfile">
                  <ProfilePage />
                </Route>
              </Switch>
            </div>
          </Router>
          <div>
{/*           <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} /> */}
        
        </div>
       </div>
         
       </>
    
     
   </ThemeProvider> 
    
    
  );
}
export default withAuthenticator(App);











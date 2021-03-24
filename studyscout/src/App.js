import './App.css';
import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { withAuthenticator} from '@aws-amplify/ui-react'
import StudyCard from "./StudyCards/Study_Card";
import PopOut from "./StudyCards/Study_popout";
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import { Component } from 'react';





function App() {

  const [ setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  console.log('ejnfj');
 
  return (
    
    <ThemeProvider theme={theme}>
       <>
        <div className="App">
          <Router>
        
            <div>

            <Navbar />
              <Switch>
                <Route exact path="/">
                </Route>
                <Route exact path="/studyCard">
                  <StudyCard />
                </Route>
                <Route exact path="/popout">
                  <PopOut/>
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











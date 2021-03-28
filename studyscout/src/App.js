import './App.css';
import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { withAuthenticator} from '@aws-amplify/ui-react'
import StudyCard from "./StudyCards/Study_Card"
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { Burger, Menu } from '../src/components';
import Registration from './Registration/Registration'


function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  return (
    
    

    <ThemeProvider theme={theme}>
       <>
        <div className="App">
        
          <Router>
          <Link to="/Registration">Registration</Link>
            <div>

            <Navbar />
            {/* <h1>Welcome to Study Scout!</h1> */}
              <Switch>
                <Route exact path="/">
                </Route>
                <Route exact path="/studyCard">
                  <StudyCard />
                </Route>
                <Route exact path="/Registration">
                  <Registration />
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











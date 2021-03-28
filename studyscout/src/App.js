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




function App() {

  // const [ setOpen] = useState(false);
  // const node = useRef();
  // useOnClickOutside(node, () => setOpen(false));
 
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
                <Route exact path="/profile">
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
export default App;











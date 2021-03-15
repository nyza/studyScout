import logo from './logo.svg';
import './App.css';
import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './hooks';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Navbar from './components/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import { Burger, Menu } from '../src/components';




function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  return (
    <ThemeProvider theme={theme}>
      <>
         <GlobalStyles />
        <div>
          <Router>
            <Navbar />
          </Router>
      </div>
        <div style={{textAlign:"center"}}>
          <h1>Welcome to Study Scout!</h1>
        </div>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
      </>
    
    </ThemeProvider>
    
    
  );
}
export default withAuthenticator(App);











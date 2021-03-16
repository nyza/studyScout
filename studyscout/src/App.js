import logo from './logo.svg';
import './App.css';
import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import StudyCard from "./components/Study_Card"

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
       
       
        <StudyCard/>
      </header>
      {/* <AmplifySignOut /> */}
    </div>
  );
}

// export default withAuthenticator(App);
export default App;


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
import { Auth, Amplify } from 'aws-amplify'
import API, { graphqlOperation } from '@aws-amplify/api';
import { getCards, listUsers, listCardss } from '../src/graphql/queries'
//import "../src/components/layout.css"

async function RunFirst()  {
 // Sets the local storage user id and Profile_Pic
 const userEmail = Auth.user.attributes.email
 console.log('userEmail: ', userEmail)

 const returnedUser = await API.graphql(graphqlOperation(listUsers, {
     filter: {
         email: {
             eq: userEmail
         }
     }
 }))
console.log("App returnedUser",returnedUser)
console.log("App loaded userid",returnedUser.data.listUsers.items[0].id)
console.log("App loaded profilepicurl",returnedUser.data.listUsers.items[0].Profile_Pic)
 localStorage.setItem('userid', returnedUser.data.listUsers.items[0].id);
 localStorage.setItem('profilepicurl', returnedUser.data.listUsers.items[0].Profile_Pic);
 //window.location.reload(false);
}

 function App() {
  const [ setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  RunFirst();

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
                  <UserProfile />
                </Route>
                <Route exact path="/myStudyCards">
                  <h1>My Study Cards</h1>
                  <MyStudyCards /> 
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
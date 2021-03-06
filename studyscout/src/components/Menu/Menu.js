// Menu.js
import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import { AmplifySignOut } from '@aws-amplify/ui-react'


const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <a href="/profile">
        <span role="img" aria-label="profile"></span>
        Profile
      </a>
      <a href="/myStudyCards">
        <span role="img" aria-label="my study cards"></span>
        My Study Cards
      </a>
      <a href="https://ucae.uncc.edu/academic-support-services/tutoring">
        <span role="img" aria-label="tutoring center"></span>
        Tutoring Center
        </a>
      <a href="/">
        <span role="img" aria-label="logout"></span>
        <AmplifySignOut />
        </a>
    </StyledMenu>
  )
}
Menu.propTypes = {
  open: bool.isRequired,
}
export default Menu;
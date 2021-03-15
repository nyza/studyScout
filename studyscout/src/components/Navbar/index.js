import React from 'react'
import {Nav, NavLink, Bars, NavBtn, NavBtnLink} from './NavbarElements';
import logo from '../../images/logo.png'
const Navbar = () => {
    return (
        <>
         <Nav>

             <Bars />

             <NavLink to="/home">
                 <img src={logo} alt={"logo"} />
             </NavLink>
        

             <NavBtn>
                 <NavBtnLink to="/create-card">New Card</NavBtnLink>
             </NavBtn>

             <NavBtn>
                 <NavBtnLink to="/profile"> Profile</NavBtnLink>
             </NavBtn>
         </Nav>   
        </>
    )
}

export default Navbar

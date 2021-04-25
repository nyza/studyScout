import {React, useState, useRef} from 'react';
import {Nav, NavLink, NavBtn, NavBtnLink} from './NavbarElements';
import { useOnClickOutside } from '../../hooks';
import logo from '../../images/logo.png'
import Burger from '../Burger';
import Menu from '../Menu';
import avatar from '../../images/avatar.png'
import plus from '../../images/plus.png'
import Auth from '@aws-amplify/auth';
import API, { graphqlOperation } from '@aws-amplify/api';
import { getCards, listUsers, listCardss } from '../../graphql/queries'



const Navbar = () => {
    const [open, setOpen] = useState(false);
    const node = useRef();
   useOnClickOutside(node, () => setOpen(false));






    return (
        <>
         <Nav>
             
             <div>
             <Burger open={open} setOpen={setOpen} />
             <Menu open={open} setOpen={setOpen} />
             </div>

             <NavLink to="/">
                 <img src={logo} alt={"logo"} style={{borderWidth: 3, borderColor: "black", width: 250, height: 80}}/>
             </NavLink>

             <NavLink to="/studyCard" >
             <img src={plus} style={{borderWidth: 3, borderColor: "black", width: 80, height: 80, borderRadius: 10, overflow: "visible"}} />
             </NavLink> 

            
             <NavLink to="/profile" >
             <img src={localStorage.getItem('profilepicurl')} alt={avatar} style={{borderWidth: 3, borderColor: "black", width: 80, height: 80, borderRadius: 50, overflow: "hidden"}} />
             </NavLink> 
           
         </Nav>   
        </>
    )
}

export default Navbar

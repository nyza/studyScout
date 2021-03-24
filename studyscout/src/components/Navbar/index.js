import {React, useState, useRef} from 'react';
import {Nav, NavLink, NavBtn, NavBtnLink} from './NavbarElements';
import { useOnClickOutside } from '../../hooks';
import logo from '../../images/logo.png'
import Burger from '../Burger';
import Menu from '../Menu';

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
                 <img src={logo} alt={"logo"} />
             </NavLink>

             <NavBtn>
                 <NavBtnLink to="/studyCard" >New Card</NavBtnLink>
             </NavBtn>

             <NavBtn>
                 <NavBtnLink to="/popout"> Profile</NavBtnLink>
             </NavBtn>
             
         </Nav>   
        </>
    )
}

export default Navbar

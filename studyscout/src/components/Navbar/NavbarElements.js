import styled from 'styled-components';
import {NavLink as Link} from 'react-router-dom';
import {FaBars} from 'react-icons/fa';

export const Nav = styled.nav`
    background: #ffffff ;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
`

export const NavLink = styled(Link)`
    color: #707070;
    display: flex;
    align-items: center;
    text-descordation: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #15cdfc;
    }
`
// Hamburger button stlye
export const Bars = styled(FaBars)`
    display: flex;
    color: #707070;
    align-items: center;
    text-descordation: none;
    padding: 0 2rem;
    height: 2000px
    transform: translate(-100%, 100%);
    margin: 10px;
    font-size: 3rem;

`


export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #707070;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #DFF7E1;
        color: #010606;
    }
`
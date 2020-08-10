import React, { useState, useEffect } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";
import { Link } from 'react-scroll';
import './navbar.css';

export default function NavBar({ navlinks }) {
    const navheight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--myheight-navbar'));
    const [currentLink, setCurrentLink] = useState("");
    const history = useHistory();
    const logout = () => {
        window.sessionStorage.removeItem('user');
        history.go("/");
    }
    const handleSetActive = (to) => {
        console.log(to);
        if (to === 'info') { setCurrentLink('info'); }
        else {
            if (to === 'viaggio') { setCurrentLink('viaggio'); }
            else {
                if (to === 'referente') { setCurrentLink('referente'); }
                else {
                    if (to === 'mappa') { setCurrentLink('mappa'); }
                    else {
                        if (to === 'header') {setCurrentLink(''); }
                    }
                }
            }
        }
        return;
    }

    return (
        <nav className="navbar sticky-top navbar-expand navbar-light my-nav">
            <div className="collapse navbar-collapse">
                <div className="container-fluid">
                    <img className="m-0 p-0 navlogo" alt="logo" />
                    <div className="navbar-nav mr-auto">
                        {navlinks.map((link, i) => {
                            return (
                                <Link key={"link-" + i} className={"nav-link " + ((link.id === "header") ? "d-none" : "")} to={link.id} 
                                offset={(link.id==='header') ? 0 : ((link.id==='info') ? -100 : (navheight*-1))} 
                                spy={true} hashSpy={true} smooth={true} duration={200} onSetActive={handleSetActive}>
                                    <span className={"font-link link-hover " + ((currentLink === link.id) ? '' : '')}>{link.nome}</span>
                                </Link>
                            )
                        })}
                    </div>
                    <button onClick={logout} className="btn btn-sm btn-outline-danger btn-border-radius-10">Logout</button>
                </div>
            </div>
        </nav>
    )
}
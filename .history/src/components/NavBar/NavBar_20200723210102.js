import React, { useState, useEffect } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import './navbar.css';

export default function NavBar({ navlinks, vizSensor }) {
    const [currentLink, setCurrentLink] = useState("");
    const history = useHistory();
    const logout = () => {
        window.sessionStorage.removeItem('user');
        window.history.replaceState(null, null, "/");
        history.go("/");
    }

    useEffect(() => {
        if (vizSensor.header) { setCurrentLink(''); window.history.replaceState(null, null, "/"); }
        else {
            if (vizSensor.mappa) { setCurrentLink('mappa'); window.history.replaceState(null, null, "/#mappa"); }
            else {
                if (vizSensor.referente) { setCurrentLink('referente'); window.history.replaceState(null, null, "/#referente"); }
                else {
                    if (vizSensor.viaggio) { setCurrentLink('viaggio'); window.history.replaceState(null, null, "/#viaggio"); }
                    else {
                        if (vizSensor.info) { setCurrentLink('info'); window.history.replaceState(null, null, "/#info"); }
                    }
                }
            }
        }
    }, [vizSensor]);

    return (
        <nav className="navbar sticky-top navbar-expand navbar-light my-nav">
            <div className="collapse navbar-collapse">
                <div className="container-fluid">
                    <img className="m-0 p-0 navlogo" alt="logo" />
                    <ul className="navbar-nav mr-auto">
                        {navlinks.map((link, i) => {
                            return (
                                <li key={"link-" + i} className="nav-item">
                                    <Link key={i + 1} className={"nav-link " + ((link.id === "header") ? "d-none" : "")} to={"/#" + link.id} spy={true} smooth={true} duration={500}>
                                        <span className={"font-link link-hover " + ((currentLink === link.id) ? 'mycolor-red' : '')}>{link.nome}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <button onClick={logout} className="btn btn-sm btn-outline-danger btn-border-radius-10">Logout</button>
                </div>
            </div>
        </nav>
    )
}

/*
<NavLink className={"nav-link " + ((link.id === "header") ? "d-none" : "")} key={i + 1}
to={"/#" + link.id}><span className={"font-link link-hover " + ((currentLink === link.id) ? 'mycolor-red' : '')}>{link.nome}</span></NavLink>
*/
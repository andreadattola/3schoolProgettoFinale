import React, { useState, useEffect } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";
import { Link } from 'react-scroll';
import './navbar.css';

export default function NavBar({ navlinks, vizSensor }) {
    const [currentLink, setCurrentLink] = useState("");
    const history = useHistory();
    const logout = () => {
        window.sessionStorage.removeItem('user');
        window.history.replaceState(null, null, "/");
        history.go("/");
    }
    const handleSetActive = (to) => {
        console.log(to);
        return;
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
                    <div className="navbar-nav mr-auto">
                        {navlinks.map((link, i) => {
                            return (
                                <Link key={"link-" + i} className={"active nav-link " + ((link.id === "header") ? "d-none" : "")} to={link.id} offset={-35} spy={true} smooth={true} duration={500} onSetActive={handleSetActive}>
                                    <span className={"font-link link-hover " + ((currentLink === link.id) ? 'mycolor-red' : '')}>{link.nome}</span>
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

/*
<NavLink className={"nav-link " + ((link.id === "header") ? "d-none" : "")} key={i + 1}
to={"/#" + link.id}><span className={"font-link link-hover " + ((currentLink === link.id) ? 'mycolor-red' : '')}>{link.nome}</span></NavLink>
*/
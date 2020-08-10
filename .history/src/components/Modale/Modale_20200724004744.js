import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modale.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Modale({ children, title, click }) {
    const divModale = document.getElementById('divModale');
    const [opened, setOpened] = useState(false);

    const chiudiModale = () => {
        document.body.classList.remove('modal-open');
        setOpened(false);
    }
    useEffect(() => {
        if (click) {
            document.body.classList.add('modal-open');
            setOpened(true);
        }
    }, [click]);

    return createPortal(
        opened ? (
            <div className="containermodale">
                <div className="modale shadow mt-3">
                    <div className="row justify-content-between m-0 p-2">
                        <div className="col-10">
                            <div className="title text-uppercase">{title}</div>
                        </div>
                        <div onClick={chiudiModale} className="chiudi col-2 p-1 text-center shadow text-primary">
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> Close
                            </div>
                    </div>
                    <div className="row m-0">
                        <div className="separatore"></div>
                        {children}
                    </div>
                </div>
            </div>
        )
            : <></>, divModale);
}
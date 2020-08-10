import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modale.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Modale({ children, click }) {
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
                <div className="modale shadow">

                    <div className="row justify-content-between">
                        <div></div>
                        <div onClick={chiudiModale} className=" chiudi col-2 mt-2 mx-4 p-1 text-center shadow text-primary">
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> Close
                            </div>
                    </div>
                    {children}
                </div>
            </div>
        )
            : <></>, divModale);
}
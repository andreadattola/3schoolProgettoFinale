import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modale.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Modale({ children, click }) {
    const divModale = document.getElementById('divModale');
    const [opened, setOpened] = useState(false);

    const chiudiModale = () => {
        setOpened(false);
    }
    useEffect(() => {
        click && setOpened(true);
    }, [click]);

    return createPortal(
        opened ? (
            <div className="containermodale">
                <div className="modale  shadow">
                    <div onClick={chiudiModale}>
                        <div className="row justify-content-end">
                            <div className=" chiudi col-2 mt-2 mx-4 p-1 text-center shadow text-primary">
                                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> Close
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        )
            : <></>, divModale);
}
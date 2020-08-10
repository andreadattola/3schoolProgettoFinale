import React, { useContext } from 'react';
import LeafletMap from './LeafletMap/LeafletMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MyContext from '../../MyContext';
import * as utils from '../../utils';

export default function MyTravel() {
    const contesto = useContext(MyContext);
    //il numPartecipants nel json non ci dice se sono adulti o bambini quindi è meglio usare le info nell'array partecipants.
    const [numeroAdulti, numeroBambini] = utils.calcolaNumAdultiBambini(contesto.partecipanti);
    return (
        <div className="border-radius-10 shadow bg-white">
            <LeafletMap></LeafletMap>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className="mediumTitle mycolor-orange mb-0">IL MIO VIAGGIO</p>
                        <p className="tinyText">{contesto.citta.map((citta, i) => {return <span key={i}> {citta.nome} <span className="mycolor-grey">{">"}</span></span>})} {contesto.citta[0].nome}</p>
                        <p className="largeText"><span className="mycolor-orange"><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></span> 
                        <span className="mycolor-grey">{" "+utils.getDateDalAl(contesto.dateFrom, contesto.dateTo)}</span></p>
                        <p className="largeText"><span className="mycolor-orange"><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></span> 
                        <span className="mycolor-grey">{` ${numeroAdulti} adult${(numeroAdulti > 1) ? "i" : "o"}`} {(numeroBambini !== 0) && (`${numeroBambini} bambin${(numeroBambini > 1) ? "i" : "o"}`)}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
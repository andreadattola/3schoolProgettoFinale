import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker} from '@fortawesome/free-solid-svg-icons'
import { arrayAssociativo } from '../../../utils';
import './dayline.css'


export default function Dayline({ giorno, numeroAttivita, transports, end }) {
    return (
        <>
            <div className="row h-100 justify-content-center">
                <div className="col-12 text-center">
                    <div className="row flex-column align-items-center">
                        <div className="col-10 offset-1 col-md-10 offset-md-1">
                            <div className="day-circle text-white text-small">DAY <span className="text-large">{giorno}</span></div>
                        </div>

                        {Array(numeroAttivita).fill(null).map((att,i) => {
                            return <div key={"icon-act-"+i} className='col-12 col-md-8 offset-md-2'>
                                <div className="activity-circle"><FontAwesomeIcon icon={faMapMarker} /></div></div>
                        })}
                        {transports.map((tr,i) => {
                            return <div key={"icon-tr-"+i} className='col-12 col-md-8 offset-md-2'>
                                <div className="div-transport">
                                    <FontAwesomeIcon className={"p-2 "+arrayAssociativo[tr.typology].classe + " transport-circle"} icon={arrayAssociativo[tr.typology].icon} />
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                {(!end) && (<div className='col-1 h-100 p-0 pl-1'><div className="coda-timeline" /></div>)}
            </div>
        </>
    )
}
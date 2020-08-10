import React, { useState } from 'react';
import MyContext from '../../../MyContext';
import './attivita.css';
import Modale from '../../Modale/Modale';
import { Link } from 'react-router-dom';
import * as utils from '../../../utils';


export default function Attivita() {
    const [modAttivita, setModAttivita] = useState(0);
    const contesto = React.useContext(MyContext);
    return (
        <>
            {contesto.map((act, i) => {
                return (
                    <div key={"activity" - i} className='row'>
                        <div className="col-6 col-md-2">
                            <img alt="immagine" className='icon-attivita' src={act.images[0].image}></img>
                        </div>
                        <div className="col-6 col-md-10">
                            <p className='title'>{act.name} </p>
                        </div>
                        <div className="col-12 col-md-10 offset-md-2">
                            <p><span className='taglia-testo color-text-grey text-small'> {act.description}</span>
                                <Link to="" onClick={() => utils.funzioneApriModale(setModAttivita, modAttivita)}>Scopri di più</Link>
                            </p>
                            <Modale click={modAttivita}>
                                <div className="row">
                                    {act.images.map((ele, i) => {
                                        return (<div className="col-4 ">
                                            <img className="img-modale-attivita p-3 " key={i} alt='imgxD' src={ele.image}></img>
                                        </div>
                                        )
                                    })}
                                </div>
                                <div className="row">
                                    <div className="col-12">

                                        <p className='text-center  m-2 color-text-grey text-small '>{act.description}</p>
                                    </div>
                                </div>
                            </Modale>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
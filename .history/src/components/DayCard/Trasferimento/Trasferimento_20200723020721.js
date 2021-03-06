import React, { useState } from 'react'
import MyContext from '../../../MyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Modale from '../../Modale/Modale';
import * as utils from '../../../utils';

export default function Trasferimento() {
    const contesto = React.useContext(MyContext);
    const [modTrasferimento, setModTrasferimento] = useState(0);
    return (
        <>
            {contesto.map((transfer, i) => {
                return (
                    <div className='row' key={"transfer-" + i}>
                        <div className='col-5 col-md-2'>
                            <FontAwesomeIcon className={"myicon-padding " + utils.arrayAssociativo[transfer.typology].classe} icon={utils.arrayAssociativo[transfer.typology].icon} />
                        </div>
                        <div className="col-7 noMdLg">
                            <p className='title mb-0'>{transfer.name}</p>
                        </div>
                        <div className='col-12 col-md-10'>
                            <p className='title nomobile'>{transfer.name}</p>
                            <p><span className='taglia-testo color-text-grey text-small mt-1'>{transfer.description}</span>
                                <Link to="" onClick={() => utils.funzioneApriModale(setModTrasferimento, modTrasferimento)}>Scopri di più</Link>
                            </p>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <span>DA <button className=' btn btn-outline-primary' disabled>{transfer.departure.name}</button></span>
                                </div>
                                <div className="col-12 col-md-6">
                                    <span>A <button className='btn btn-outline-primary' disabled>{transfer.arrival.name}</button></span>
                                </div>
                            </div>

                            <Modale click={modTrasferimento}>
                                <div className="row">
                                    <div className="col-8 offset-2">
                                        <p className='h4'>{transfer.name}</p>
                                        <p className='text-capitalize'>{transfer.typology.replace('_', ' ')}</p>
                                        <FontAwesomeIcon className={utils.arrayAssociativo[transfer.typology].classe} icon={utils.arrayAssociativo[transfer.typology].icon} />
                                        <p>{transfer.description} </p>
                                        <p>{transfer.distance + ' km'}</p>
                                        <div className="row">
                                            <div className="col-12">
                                                <p>DA: <span className='text-primary'>{transfer.departure.name}</span></p>
                                            </div>
                                            <div className="col-12">
                                                <p>A: <span className='text-primary'> {transfer.arrival.name} </span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modale>
                        </div>
                    </div>
                )

            })
            }

        </>

    )

}
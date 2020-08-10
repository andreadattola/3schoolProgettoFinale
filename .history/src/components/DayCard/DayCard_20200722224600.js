import React from 'react'
import MyContext from '../../MyContext'
import Presentazione from './Presentazione/Presentazione'
import Trasferimento from './Trasferimento/Trasferimento';
import Pernottamento from './Pernottamento/Pernottamento';
import Attivita from './Attivita/Attivita';
import CheckInclude from './CheckInclude/CheckInclude'


export default function DayCard({ boleano }) {

    const contesto = React.useContext(MyContext);
    return (
        <>
            <div className="order-md-2">
                <MyContext.Provider value={contesto.giorno.accomodations}>
                    {(contesto.giorno.accomodations.length > 0 && <Pernottamento boleano={boleano} numeroGiorni={contesto.numeroGiorni}></Pernottamento>)}
                </MyContext.Provider>
            </div>

            <div className="order-md-1">
                <MyContext.Provider value={{ day: contesto.giorno.day, data: contesto.giorno.data }}>
                    <Presentazione></Presentazione>
                </MyContext.Provider>
                <MyContext.Provider value={contesto.giorno.activities}>
                    <Attivita></Attivita>
                </MyContext.Provider>
                <MyContext.Provider value={contesto.giorno.transports}>
                    {contesto.giorno.transports.length > 0 && <Trasferimento></Trasferimento>}
                </MyContext.Provider>
                <MyContext.Provider value={{ included: contesto.giorno.included, notIncluded: contesto.giorno.notIncluded }}>
                    <CheckInclude></CheckInclude>
                </MyContext.Provider>
            </div>
        </>

    )

}
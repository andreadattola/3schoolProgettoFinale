import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import Accordion from './components/Accordion';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Referente from './components/Referente/Referente';
import NavBar from './components/NavBar/NavBar';
import MyTravel from './components/MyTravel/MyTravel';
import DayCard from './components/DayCard/DayCard';
import Dayline from './components/DayCard/Dayline/Dayline';
import Tariffa from './components/Tariffa/Tariffa';
import Note from './components/Note/Note';
import OnlyDescription from './components/OnlyDescription/OnlyDescription';
import VizSensor from 'react-visibility-sensor';
import * as utils from './utils';
import './App.css';

const urlJSON = 'http://51.77.82.133:86/api/quotations/QUO_5e5e2952ae57f#'

export default function App() {
	utils.setCssVhVariable();
	var x = 1
	const [datiJson, setDatiJson] = useState(null);
	const [arrayCitta, setArrayCitta] = useState([]);

	/*Variabili di stato per la gestione della visibilità dei componenti*/
	const [vizHeader, setVizHeader] = useState(false);
	const [vizMappa, setVizMappa] = useState(false);
	const [vizReferente, setVizReferente] = useState(false);
	const [vizViaggio, setVizViaggio] = useState(false);
	const [vizInfo, setVizInfo] = useState(false);

	useEffect(() => {
		const getDati = async () => {
			const dati$ = await fetch(urlJSON).then(res => res.json());
			setDatiJson(dati$.results.data);
			setArrayCitta(utils.mapCitta(dati$.results.data.rows));
		}
		getDati();
	}, []);

	return (
		(datiJson != null && arrayCitta.length > 0) ?
			<>
				<div id="divModale"></div>

				<MyContext.Provider value={datiJson}> {/* Questo è il provider più esterno che ha come value tutto il data della fetch*/}
					<NavBar
						vizSensor={{ header: vizHeader, mappa: vizMappa, referente: vizReferente, viaggio: vizViaggio, info: vizInfo }}
						navlinks={
							[{ id: 'mappa', nome: 'MAPPA' },
							{ id: 'referente', nome: 'REFERENTE' },
							{ id: 'viaggio', nome: 'VIAGGIO' },
							{ id: 'info', nome: 'INFO' }]}>
					</NavBar>

					<MyContext.Provider value={{ titolo: datiJson.title, nomeCliente: datiJson.customerName, image: datiJson.images[0].image }}>
						<VizSensor
							scrollCheck={true}
							partialVisibility={'top'}
							onChange={(isVisible) => {
								isVisible ? setVizHeader(true) : setVizHeader(false);
							}}
						><Header /></VizSensor>
					</MyContext.Provider>

					<div className="container-fluid my-5">
						{/**************************************INIZIO ACCORDION VIAGGIO*****************************************/}
						<MyContext.Provider value={{ citta: arrayCitta.map(citta => { return { nome: citta.nome, posizione: citta.coordinate } }), dateFrom: datiJson.dateFrom, dateTo: datiJson.dateTo, partecipanti: datiJson.partecipants }}>
							<div className="anchor" id="mappa"></div>
							<VizSensor
								scrollCheck={true}
								partialVisibility={'top'}
								onChange={(isVisible) => {
									isVisible ? setVizMappa(true) : setVizMappa(false);
								}}
							><MyTravel /></VizSensor>
						</MyContext.Provider>
						<div className="mt-3">
							<MyContext.Provider value={{ operator: datiJson.operator, agency: datiJson.agency }}>
								<div className="anchor" id="referente"></div>
								<VizSensor
									scrollCheck={true}
									partialVisibility={'top'}
									onChange={(isVisible) => {
										isVisible ? setVizReferente(true) : setVizReferente(false);
									}}
								><Referente /></VizSensor>
							</MyContext.Provider>
						</div>

						<div className="anchor" id="viaggio"></div>

						<div className="row">
							<div className="col-12">
								{arrayCitta.map((citta, counter) => {

									return (
										<div key={"citta-" + counter}>
											<VizSensor
												scrollCheck={true}
												partialVisibility={'top'}
												onChange={(isVisible) => {
													isVisible ? setVizViaggio(true) : setVizViaggio(false);
												}}
											>

												<MyContext.Provider value={citta}>
													<Accordion key={citta.id} tipo="citta">
														{citta.giorni.map((giorno, i) => {
															return (
																<div key={"giorno-" + i + "-citta-" + counter}>
																	<MyContext.Provider value={{ giorno: giorno, numeroGiorni: citta.giorni.length }}>
																		<div className="row">
																			<div className="col-1">
																				<Dayline giorno={x++} numeroAttivita={giorno.activities.length} transports={giorno.transports} end={(i + 1) === citta.giorni.length} />
																			</div>
																			<div className="col-10">
																				<DayCard booleano={i < 1} key={giorno.id} />
																			</div>
																			<div className="col-1" />
																		</div>
																	</MyContext.Provider>
																</div>
															)
														})}
													</Accordion>
												</MyContext.Provider>
											</VizSensor>
										</div>
									)
								})}
							</div>
						</div>
						{/****************************************FINE ACCORDION VIAGGIO*****************************************/}

						{/****************************************INIZIO ACCORDION INFO******************************************/}
						<div className="anchor" id="info"></div>
						<div className="row mr-0 ml-0" id="info">
							<VizSensor
								scrollCheck={true}
								partialVisibility={'bottom'}
								offset={{ bottom: -200 }}
								onChange={(isVisible) => {
									isVisible ? setVizInfo(true) : setVizInfo(false);
								}}
							>
								<MyContext.Provider value={{ nome: "TARIFFE" }}>
									<Accordion tipo="info">
										<Tariffa dati={{
											partecipants: datiJson.partecipants, priceTotal: datiJson.priceTotal,
											included: datiJson.included, notIncluded: datiJson.notIncluded
										}} />
									</Accordion>
								</MyContext.Provider>
							</VizSensor>
							<MyContext.Provider value={{ nome: "NOTE" }}>
								<Accordion tipo="info"><Note /></Accordion>
							</MyContext.Provider>
							<MyContext.Provider value={{ nome: "DOCUMENTI RICHIESTI" }}>
								<Accordion tipo="info">
									<OnlyDescription description={datiJson.documentsRequested.description} />
								</Accordion>
							</MyContext.Provider>
							<MyContext.Provider value={{ nome: "ASSICURAZIONE" }}>
								<Accordion tipo="info">
									<OnlyDescription description={datiJson.documentsInsurance.description} />
								</Accordion>
							</MyContext.Provider>
							<MyContext.Provider value={{ nome: "CONDIZIONI DI CANCELLAZIONE" }}>
								<Accordion tipo="info">
									<OnlyDescription description={datiJson.documentsCancellation.description} />
								</Accordion>
							</MyContext.Provider>
							<MyContext.Provider value={{ nome: "CONDIZIONI DI PAGAMENTO" }}>
								<Accordion tipo="info">
									<OnlyDescription name={datiJson.documentsPayment.name} description={datiJson.documentsPayment.description} />
								</Accordion>
							</MyContext.Provider>
						</div>
						{/****************************************FINE ACCORDION INFO******************************************/}
					</div> {/*chiusura div container-fluid*/}
				</MyContext.Provider> {/*chiusura provider con value datiJson*/}
				<Footer></Footer>
			</>
			: <></>
	);
}
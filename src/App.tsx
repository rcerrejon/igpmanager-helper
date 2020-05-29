import React from 'react';
import moment from 'moment'
import { Image, Button, Icon, Table, Header, Modal, Flag, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import monoplaza from './monoplaza.gif';
import { circuits } from './Circuits'
import { localizedText } from './Constant'
import { useWeatherByLocation } from './Weather'
import './App.css';


const getNextCircuit = () => {
  const now = moment().unix()

  let defaultCircuit = circuits[0]

  for (let circuit of circuits) {
    if (now < circuit.date) {
      return circuit
    }
  }

  return defaultCircuit
}

function App() {
  const nextCircuit = getNextCircuit();
  const dateToString = moment.unix(nextCircuit.date).format("DD/MM/YYYY");
  let currentWeater = useWeatherByLocation(nextCircuit.title, dateToString, nextCircuit.lat, nextCircuit.lon, nextCircuit.date, localizedText.getLanguage());
  const locationUrl = `http://maps.google.com/maps?q=${nextCircuit.lat},${nextCircuit.lon}`

  // force update on change Language
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <div className="App">
      <div className="App-header">
        <Segment className="segment-bg">
          <Flag className="flags" name='es' onClick={() => {
              localizedText.setLanguage('es');
              forceUpdate()
            }} />
          <Flag className="flags" name='us' onClick={() => {
              localizedText.setLanguage('en');
              forceUpdate()
            }} />
          <Flag className="flags" name='de' onClick={() => {
              localizedText.setLanguage('de');
              forceUpdate()
            }} />
        </Segment>
        <Header as='h1'>iGP Manager - {localizedText.weather}</Header>
        <Header as='h2'>{localizedText.league} Waranflai</Header>
          <Image src={monoplaza} alt="logo" />
          <Header as='h3'>{localizedText.nextRace}</Header>
        <Table celled inverted selectable className="table">
          <Table.Header>
            <Table.Row>
          <Table.HeaderCell>{currentWeater.title}</Table.HeaderCell>
              <Table.HeaderCell>{currentWeater.dateCircuit} 20:00</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{localizedText.time}</Table.Cell>
              <Table.Cell>{currentWeater.description}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{localizedText.temperature}</Table.Cell>
              <Table.Cell>{currentWeater.temperature}°</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{localizedText.precip}</Table.Cell>
              <Table.Cell>{currentWeater.precipitation}%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{localizedText.density}</Table.Cell>
              <Table.Cell>{currentWeater.density}mm</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <div>
          <Button icon labelPosition='left' onClick={()=> window.open(locationUrl, "_blank")}>
            <Icon name='location arrow' />
            {localizedText.mapButton}
          </Button>
          <Modal
            trigger={
            <Button icon labelPosition='right'>
              <Icon name='car' />
              {localizedText.modalButton}
            </Button>
            }
            header={localizedText.modalButton}
            content={localizedText.modalDescription}
            actions={[{ key: 'done', content: 'Ok', positive: true }]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

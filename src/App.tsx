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
  const now = moment().add(2, 'hours').unix()

  let nextCircuit = circuits.default

  if (now < circuits.usa.finishDate) {
    nextCircuit = circuits.usa;
  } else if (now < circuits.singapur.finishDate) {
    nextCircuit = circuits.singapur;
  } else if (now < circuits.italy.finishDate) {
    nextCircuit = circuits.italy;
  } else if (now < circuits.germany.finishDate) {
    nextCircuit = circuits.germany;
  } else if (now < circuits.belgium.finishDate) {
    nextCircuit = circuits.belgium;
  } else if (now < circuits.austria.finishDate) {
    nextCircuit = circuits.austria;
  }

  return nextCircuit
}

function App() {
  const nextCircuit = getNextCircuit();
  const dateToString = moment.unix(nextCircuit.startDate).format("DD/MM/YYYY");
  let currentWeater = useWeatherByLocation(nextCircuit.title, dateToString, nextCircuit.lat, nextCircuit.lon, nextCircuit.startDate, localizedText.getLanguage());

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
        <Modal
          trigger={
            <Button animated on>
              <Button.Content visible>{localizedText.modalButton}</Button.Content>
              <Button.Content hidden>
                <Icon name='car' />
              </Button.Content>
            </Button>
          }
          header={localizedText.modalButton}
          content={localizedText.modalDescription}
          actions={[{ key: 'done', content: 'Ok', positive: true }]}
        />
      </div>
    </div>
  );
}

export default App;

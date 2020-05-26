import React from 'react';
import moment from 'moment'
import { Image, Button, Icon, Table, Header, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import monoplaza from './monoplaza.gif';
import { circuits } from './Circuits'
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
  const currentWeater = useWeatherByLocation(nextCircuit.title, dateToString, nextCircuit.lat, nextCircuit.lon, nextCircuit.startDate);

  return (
    <div className="App">
      <div className="App-header">
        <Header as='h1'>iGP Manager - Previsión</Header>
        <Header as='h2'>Liga Waranflai</Header>
          <Image src={monoplaza} alt="logo" />
          <Header as='h3'>Próxima carrera</Header>
        <Table celled inverted selectable className="table">
          <Table.Header>
            <Table.Row>
          <Table.HeaderCell>{currentWeater.title}</Table.HeaderCell>
              <Table.HeaderCell>{currentWeater.dateCircuit} 20:00</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Tiempo</Table.Cell>
              <Table.Cell>{currentWeater.description}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Temperatura</Table.Cell>
              <Table.Cell>{currentWeater.temperature}°</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Precipitaciones</Table.Cell>
              <Table.Cell>{currentWeater.precipitation}%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Densidad Lluvia</Table.Cell>
              <Table.Cell>{currentWeater.density}mm</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Modal
          trigger={
            <Button animated on>
              <Button.Content visible>Recomendar Neumáticos</Button.Content>
              <Button.Content hidden>
                <Icon name='car' />
              </Button.Content>
            </Button>
          }
          header='Dame tokens'
          content='Si quieres recomendación de neumáticos, dame dinero'
          actions={[{ key: 'done', content: 'Vale', positive: true }]}
        />
      </div>
    </div>
  );
}

export default App;

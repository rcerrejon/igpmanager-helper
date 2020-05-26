import LocalizedStrings from 'react-localization';

export const dsUrl = 'https://api.darksky.net/forecast/[key]/[latitude],[longitude],[time]?lang=[lang]&units=si'
export const token = 'e5423fe27f60299f99456b7dc9b1b262'

export const localizedText = new LocalizedStrings({
  es:{
    weather: "Previsión Meteorológica",
    league: "Liga",
    nextRace: "Próxima Carrera",
    time: "Tiempo",
    temperature: "Temperatura",
    precip: "Precipitaciones",
    density: "Densidad Lluvia",
    modalButton: "Recomendar Neumáticos",
    modalDescription: "Si quieres recomendación de neumáticos, dame dinero",
  },
  en:{
    weather: "Weather Forecast",
    league: "League",
    nextRace: "Next Race",
    time: "Weather",
    temperature: "Temperature",
    precip: "Precipitations",
    density: "Rain Density",
    modalButton: "Tyres Recommendation",
    modalDescription: "SS = Super Soft",
  },
  de:{
    weather: "Wettervorhersage",
    league: "Liga",
    nextRace: "Nächste Rennen",
    time: "Zeit",
    temperature: "Wetter",
    precip: "Niederschlag",
    density: "Niederschlag Dichte",
    modalButton: "Reifen Empfehlung",
    modalDescription: "SS = Super Soft",
  }
});
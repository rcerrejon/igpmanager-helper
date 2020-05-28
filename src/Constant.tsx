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
    mapButton: "Mostrar en Google Maps",
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
    mapButton: "Show in Google Maps",
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
    mapButton: "In Google Maps Zeigen",
    modalButton: "Reifen Empfehlung",
    modalDescription: "SS = Super Soft",
  }
});
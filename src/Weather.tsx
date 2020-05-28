import { useState, useEffect } from 'react';
import { dsUrl, token } from './Constant'
import axios from 'axios';

export const useWeatherByLocation = (title: string, dateCircuit: string, lat:Number, lon:Number, timestamp: Number, lang: string) => {
  const [weatherObject, setWeatherObject] = useState(defaultWeatherObject);

  let url = dsUrl;
  url = url.replace('[key]', token)
  url = url.replace('[latitude]', `${lat}`)
  url = url.replace('[longitude]', `${lon}`)
  url = url.replace('[time]', `${timestamp}`)
  url = url.replace('[lang]', `${lang}`)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${url}`);

      setWeatherObject({
        title: title,
        dateCircuit: dateCircuit,
        description: result.data.currently.summary,
        temperature: Math.round(result.data.currently.temperature),
        precipitation: Math.round(result.data.currently.precipProbability * 100),
        density: Math.round(result.data.currently.precipIntensity * 100) / 10
      });
    };
    fetchData();
  }, [dateCircuit, title, url]);


  return weatherObject
}

const defaultWeatherObject = {
  title: 'placeholder',
  dateCircuit: '19/11/1982',
  description: 'hot',
  temperature: 100,
  precipitation: 50,
  density: 0.3
}
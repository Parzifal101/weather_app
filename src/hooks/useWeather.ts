import axios, { Axios, AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';
import { IAddInfo, IWeather } from '../model';
import { weatherDef } from '../data/weatherDef';


export function useWeather() {
  const [weather, setWeather] = useState<IWeather>(weatherDef);
  const [wwCode, setWwCode] = useState<number>(0);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('Москва');
  const [cords, setCords] = useState<Array<number>>([55.37, 37.24]);
  const [error, setError] = useState('');
  const [timezone, setTimezone] = useState<Array<string>>(["Europe/Moscow"]);
  const [addInfo, setAddInfo] = useState<IAddInfo>({
    sunrise: '',
    sunset: '',
    uv_index_max: 0,
    windspeed_120m: 0,
    winddirection: 0,
    humidity: 0,
    pressure: 0,
    visibility: 0
  });
  async function fetchGeo() {
    try {
      const API_MAP: string = "99e1c859-c9cd-4345-8108-34aefd18a828";
      const geo = await axios.get<any>(`https://geocode-maps.yandex.ru/1.x?geocode=${searchValue}&apikey=${API_MAP}&format=json`);
      fetchData(geo);
      // fetchData();
    } catch (error) {
      const e = error as AxiosError;
      setLoader(false);
      setError(e.message);
      console.error('OOOOPS... ERROR in GEOCODING! - ' + e.message);
    }

  }
  const GeoObject = {
    GeoObject: {
      Point: {
        pos: '37.617520 55.755865'
      }
    }

  }
  const geos = {
    data: {
      response: {
        GeoObjectCollection: {
          featureMember: [GeoObject]
        }
      }
    }
  }

  async function fetchData(geo: any = geos) {
    try {
      setLoader(true);

      const lat: number = geo.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.match(/[0-9]+\.[0-9]+/gi)[1];
      const lon: number = geo.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.match(/[0-9]+\.[0-9]+/gi)[0];

      const res = await axios.get<IWeather>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=windspeed_120m,winddirection_120m,relativehumidity_2m,pressure_msl,visibility&daily=weathercode,temperature_2m_max,apparent_temperature_max,sunrise,sunset,uv_index_max&timezone=${timezone}&current_weather=true`);

      setWeather(res.data);
      setWwCode(res.data.current_weather.weathercode);
      setCords([lat, lon]);
      setLoader(false);
    } catch (error: unknown) {
      const e = error as AxiosError;
      setLoader(false);
      setError(e.message);
      console.error('OOOOPS... ERROR in FETCHING WEATHER! - ' + e.message);
    }

  }

  useEffect(() => {

  }, [cords]);

  useEffect(() => {

    fetchData();
  }, [timezone]);

  useEffect(() => {

    fetchData();
  }, []);

  return { weather, wwCode, loader, searchValue, cords, error, timezone, setSearchValue, fetchData, fetchGeo, setTimezone, addInfo, setAddInfo }
}



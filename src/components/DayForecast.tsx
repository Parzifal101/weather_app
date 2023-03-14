import { useEffect } from "react";
import { days, visualiseWeather } from "../data/data";
import { useChangeInfo } from "../hooks/useChangeInfo";
import { IWeather } from "../model";
import classes from './style/DayForecast.module.scss'

interface DayProps {
  weekday: number,
  weathercode: number,
  temp: number,
  appar_temp: number,
  my_key: number,
  setAddInfo: any,
  weather: IWeather
}

export function DayForecast({ weekday, weathercode, temp, appar_temp, my_key, setAddInfo, weather }: DayProps) {

  const {windspeed,winddirection,humidty,pressure,visibility_km} = useChangeInfo(weather);

  function changeInfo(index: number) {
    setAddInfo({ 
      sunrise: weather.daily.sunrise[index], 
      sunset: weather.daily.sunset[index], 
      uv_index_max: weather.daily.uv_index_max[index], 
      windspeed_120m: windspeed[index], 
      winddirection: winddirection[index], 
      humidity: humidty[index], 
      visibility: visibility_km[index], 
      pressure: pressure[index] 
    })
  }

  useEffect(() => {
    changeInfo(0);
  }, [])

  return (
    <div onClick={e => changeInfo(my_key)} className={classes.weekForecast__day}>
      <h3>{days[weekday]}</h3>
      <div className={classes.weekForecast__imgWrapper}><img src={process.env.PUBLIC_URL + `/img/${visualiseWeather(weathercode)}.png`} alt="" /></div>
      <p>{temp}°<span>{Math.floor(appar_temp)}°</span></p>
    </div>
  );
}

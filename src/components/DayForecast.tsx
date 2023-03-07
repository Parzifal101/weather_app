import { days, visualiseWeather } from "../data/data";

interface DayProps{
    weekday:number,
    weathercode:number,
    temp:number,
    appar_temp:number
}

export function DayForecast({weekday,weathercode,temp,appar_temp}:DayProps){

    return(
            <div className="weekForecast__day">
              <h3>{days[weekday]}</h3>
              <div className='weekForecast__imgWrapper'><img src={process.env.PUBLIC_URL + `img/${visualiseWeather(weathercode)}.png`}alt="" /></div>
              <p>{temp}°<span>{Math.floor(appar_temp/2)}°</span></p>
            </div>
    );
}
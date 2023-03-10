import { useEffect } from "react";
import { days, visualiseWeather } from "../data/data";
import { IWeather } from "../model";

interface DayProps{
    weekday:number,
    weathercode:number,
    temp:number,
    appar_temp:number,
    my_key:number,
    setAddInfo: any,
    weather: IWeather
}

export function DayForecast({weekday,weathercode,temp,appar_temp,my_key,setAddInfo,weather}:DayProps){

    function findAverage(arr:Array<any>){
      const tempArr:Array<any> = [];
      let temp = 0;
      for (let index = 0; index < arr.length+1; index++) {
        if (index%24===0 && index > 23) {
          tempArr.push(Math.round(temp/24));
          temp = 0;
        }
        temp += arr[index];
      }
      return tempArr;
    }

    function changeInfo(index:number){
      const windspeed = findAverage(weather.hourly.windspeed_120m);
      const winddirection = findAverage(weather.hourly.winddirection_120m);
      const humidty = findAverage(weather.hourly.relativehumidity_2m);
      const visibility_m = findAverage(weather.hourly.visibility);
      const pressure = findAverage(weather.hourly.pressure_msl);
      const visibility_km = visibility_m.map(value => (value/1000).toFixed(1));
      
      console.log(visibility_km);
      

      setAddInfo({sunrise:weather.daily.sunrise[index],sunset:weather.daily.sunset[index],uv_index_max:weather.daily.uv_index_max[index],windspeed_120m:windspeed[index],winddirection:winddirection[index],humidity:humidty[index],visibility:visibility_km[index],pressure:pressure[index]})
    }
    useEffect(()=>{
      changeInfo(0);
    },[])
    return(
            <div onClick={e => changeInfo(my_key)} className="weekForecast__day">
              <h3>{days[weekday]}</h3>
              <div className='weekForecast__imgWrapper'><img src={process.env.PUBLIC_URL + `/img/${visualiseWeather(weathercode)}.png`}alt="" /></div>
              <p>{temp}°<span>{Math.floor(appar_temp/2)}°</span></p>
            </div>
    );
}
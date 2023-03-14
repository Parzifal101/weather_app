import { useWeather } from "../../hooks/useWeather";
import { IAddInfo } from "../../model";
import classes from './style/Select.module.scss';

interface ISelectProps{
    timezone:any,
    setTimezone:any
}


export function Select({setTimezone,timezone}:ISelectProps){
    
    return(
        <div className={classes.wellcome}>
            <h1>Wellcome, <span>choose your country timezone</span> </h1>
            <select value={timezone[0]} onChange={e => setTimezone([e.target.value])} name="" id="">
              <option value="America/Anchorage">America/Anchorage</option>
              <option value="America/Los_Angeles">America/Los_Angeles</option>
              <option value="America/Denver">America/Denver</option>
              <option value="America/Chicago">America/Chicago</option>
              <option value="America/New_York">America/New_York</option>
              <option value="America/Sao_Paulo">America/Sao_Paulo</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Europe/Berlin">Europe/Berlin</option>
              <option value="Europe/Moscow">Europe/Moscow</option>
              <option value="Africa/Cairo">Africa/Cairo</option>
              <option value="Asia/Bangkok">Asia/Bangkok</option>
              <option value="Asia/Singapore">Asia/Singapore</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
              <option value="Australia/Sydney">Australia/Sydney</option>
              <option value="Pacific/Auckland">Pacific/Auckland</option>
            </select>
          </div>
    );
}
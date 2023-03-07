import { days, visualiseWeather, wwCodes } from '../data/data';
import { IWeather } from '../model';
import styles from './style/Current.module.scss';

interface WeatherProps {
    weather: IWeather
    wwCode: number
    loadStatus: boolean
}
interface WwCodes {
    [key: number]: string;
}
export function CurrentWeather({ weather, wwCode, loadStatus }: WeatherProps) {
    const date = new Date();

    return (
        <div className={loadStatus ? styles.currentWeather__load : styles.currentWeather}>
            <div className={styles.currentWeather__visual}>
                <img src={process.env.PUBLIC_URL + `/img/${visualiseWeather(wwCode)}.png`} alt="" />
            </div>
            <div className={styles.currentWeather__temp}>
                <p>{weather.current_weather.temperature}<span>°C</span></p>
            </div>
            <div className={styles.currentWeather__date}>
                <p>{days[date.getDay()]}, <span>{date.getHours() + ':' + date.getMinutes()}</span></p>
            </div>
            <hr />
            <div className={styles.currentWeather__param}>
                <div className={styles.param__wwcode}>
                    <div className={styles.param__iconWrapper}>
                        <img src={process.env.PUBLIC_URL + `/img/${visualiseWeather(wwCode)}.png`} alt="" />
                    </div>
                    <span>{wwCodes[wwCode]}</span>
                </div>
                <div className={styles.param__rain}>
                    <div className={styles.param__iconWrapper}>
                        <img src={process.env.PUBLIC_URL + '/img/rain.png'} alt="" />
                    </div>
                    <span>Rain - {wwCode}%</span>
                </div>
            </div>
        </div>
    );


}
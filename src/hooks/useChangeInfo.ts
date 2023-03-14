import { IWeather } from "../model";

export function useChangeInfo(weather: IWeather) {
    function findAverage(arr: Array<any>) {
        const tempArr: Array<any> = [];

        let temp = 0;
        for (let index = 0; index < arr.length + 1; index++) {
            if (index % 24 === 0 && index > 23) {
                tempArr.push(Math.round(temp / 24));
                temp = 0;
            }
            temp += arr[index];
        }
        return tempArr;
    }

    const windspeed = findAverage(weather.hourly.windspeed_120m);
    const winddirection = findAverage(weather.hourly.winddirection_120m);
    const humidty = findAverage(weather.hourly.relativehumidity_2m);
    const visibility_m = findAverage(weather.hourly.visibility);
    const pressure = findAverage(weather.hourly.pressure_msl);
    const visibility_km = visibility_m.map(value => Number((value / 1000).toFixed(1)));
    return { windspeed, winddirection, humidty, pressure, visibility_km }
}
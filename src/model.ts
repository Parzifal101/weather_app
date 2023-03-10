export interface IWeather {
    current_weather: {
        temperature: number,
        windspeed: number,
        winddirection: number,
        weathercode: number,
        time: any,
    },
    daily: {
        apparent_temperature_max:Array<number>,
        sunrise:Array<string>,
        sunset:Array<string>,
        temperature_2m_max:Array<number>,
        time:Array<string>,
        uv_index_max:Array<number>,
        weathercode:Array<number>,
    },
    hourly:{
        pressure_msl:Array<number>,
        relativehumidity_2m:Array<number>,
        time:Array<string>,
        visibility:Array<number>,
        winddirection_120m:Array<number>,
        windspeed_120m:Array<number>,
    }
}
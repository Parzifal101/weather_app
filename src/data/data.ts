
interface WwCodes {
    [key: number]: string;
}
export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const wwCodes: WwCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Drizzle: light',
        53: 'Drizzle: moderate',
        55: 'Drizzle: dense intensity light',
        56: 'Freezing drizzle: Light',
        57: 'Freezing drizzle: Dense intensity',
        61: 'Rain: slight',
        63: 'Rain: moderate',
        65: 'Rain: heavy intensity',
        66: 'Freezing Rain: light',
        67: 'Freezing Rain: heavy intensity',
        71: 'Snow fall: slight',
        73: 'Snow fall: moderate',
        75: 'Snow fall: heavy intensity',
        77: 'Snow grains',
        80: 'Rain showers: slight',
        81: 'Rain showers: moderate',
        82: 'Rain showers: violent',
        85: 'Snow showers: slight',
        86: 'Snow showers: heavy',
        95: 'Thunderstorm',
        96: 'Thunderstorm: slight',
        99: 'Thunderstorm: heavy hail',
    }

export function visualiseWeather(wwCode:number):string{
    if (wwCode > -1 && wwCode < 2) {
        return 'sunny'
    }
    if (wwCode > 1 && wwCode < 4) {
        return 'half_sun'
    }
    if (wwCode > 44 && wwCode < 49) {
        return 'fog'
    }
    if (wwCode > 50 && wwCode < 54) {
        return 'moros'
    }
    if (wwCode > 54 && wwCode < 62) {
        return 'moros_power'
    }
    if (wwCode > 62 && wwCode < 68) {
        return 'rain'
    }
    if ((wwCode > 65 && wwCode < 72) || wwCode === 85) {
        return 'light_snow'
    }
    if ((wwCode > 72 && wwCode < 78) || wwCode === 86) {
        return 'power_snow'
    }
    if (wwCode > 79 && wwCode < 83) {
        return 'rain'
    }
    if (wwCode === 95) {
        return 'thunder'
    }
    if (wwCode > 95 && wwCode < 100) {
        return 'thunder_rain'
    }
    return ''
}

// export const graphData = {
//     labels: ['', '', '', ''],
//     datasets: [
//       {
//         label: 'UV Index',
//         data: [6, addInfo.uv_index_max],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0)',
//           'rgba(255, 191, 94,1)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 0)',
//           'rgba(54, 162, 235, 0)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };
import axios, { Axios, AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';
import './App.scss';
import { CurrentWeather } from './components/CurrentWeather';
import { Search } from './components/Search';
import { SugTest } from './components/SugTest';
import { weatherDef } from './data/weatherDef';
import { IWeather } from './model';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { DayForecast } from './components/DayForecast';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

function App() {
  const screenHeight = window.screen.height;
  const [weather, setWeather] = useState<IWeather>(weatherDef);
  const [wwCode, setWwCode] = useState<number>(0);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('Москва');
  const [cords, setCords] = useState<Array<number>>([55.37, 37.24]);
  const [error, setError] = useState('');
  const [searchSug, setSearchSug] = useState<Array<string>>([]);
  const [timezone, setTimezone] = useState<Array<string>>(["Europe/Moscow"]);
  const [addInfo, setAddInfo] = useState({ sunrise: '', sunset: '', uv_index_max: 0, windspeed_120m: 0, winddirection: 0, humidity: 0, pressure: 0, visibility: 0 });



  ChartJS.register(ArcElement, Legend, CategoryScale, LinearScale, BarElement);
  const graphData = {
    labels: ['', '', '', ''],
    datasets: [
      {
        label: 'UV Index',
        data: [6, addInfo.uv_index_max],
        backgroundColor: [
          'rgba(255, 99, 132, 0)',
          'rgba(255, 191, 94,1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0)',
          'rgba(54, 162, 235, 0)',
        ],
        borderWidth: 1,
      },
    ],
  };


  async function fetchData() {
    try {
      setLoader(true);
      const API_MAP: string = "99e1c859-c9cd-4345-8108-34aefd18a828";
      // const geo = await axios.get<any>(`https://geocode-maps.yandex.ru/1.x?geocode=${searchValue}&apikey=${API_MAP}&format=json`);

      // const lat: number = geo.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.match(/[0-9]+\.[0-9]+/gi)[1];
      // const lon: number = geo.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.match(/[0-9]+\.[0-9]+/gi)[0];
      const lat: number = 55.36;
      const lon: number = 37.42;
      // const urlTimezone:RegExpMatchArray|null = timezone[0].match(/\w+[^\/]/gi);

      const res = await axios.get<IWeather>(`https://ap.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=windspeed_120m,winddirection_120m,relativehumidity_2m,pressure_msl,visibility&daily=weathercode,temperature_2m_max,apparent_temperature_max,sunrise,sunset,uv_index_max&timezone=${timezone}&current_weather=true`);
      console.log(res.data);


      setWeather(res.data);
      setWwCode(res.data.current_weather.weathercode);
      setCords([lat, lon]);
      setLoader(false);
    } catch (error: unknown) {
      const e = error as AxiosError;
      setLoader(false);
      setError(e.message);
      console.log('OOOOPS... ERROR!');
    }

  }

  useEffect(() => {
    // console.log(cords);

  }, [cords]);
  useEffect(() => {
    // console.log(addInfo.humidity);

  }, [addInfo]);
  useEffect(() => {
    // console.log(timezone);
    fetchData();
  }, [timezone]);

  useEffect(() => {
    fetchData();
  }, []);
  const mapState = React.useMemo(
    () => ({ center: [cords[0], cords[1]], zoom: 6, controls: ["zoomControl", "fullscreenControl"], }),
    [cords]
  );

  return (
    <div style={{ height: screenHeight }} className='container'>
      <div className='left-side__menu'>
        <Search fetch={fetchData} setValue={setSearchValue} />
        <div style={{ backgroundColor: '#dbdbdb', width: '100%' }}>
          {/* {searchSug && searchSug.map((sug,i) => <SugTest sugest={sug} key={i}/>)} */}
        </div>
        <CurrentWeather weather={weather} wwCode={wwCode} loadStatus={loader} />
        <div className={loader ? "choosen-city__load" : "choosen-city"}>
          <YMaps>
            <Map state={mapState} modules={["control.ZoomControl", "control.FullscreenControl"]}>
              <Placemark geometry={[cords[0], cords[1]]} />
            </Map>
          </YMaps>
        </div>
      </div>
      {/* <h1 style={{color:'red'}}>{error}</h1> */}
      <div className="rightSection">
        <div className="rightSection__wrapper">
          <div className='wellcome'>
            <h1>Wellcome, <span>choose your country timezone</span> </h1>
            <select value={timezone[0]} onChange={e => setTimezone([e.target.value])} name="" id="">
              <option value="America/Anchorage">America/Anchorage</option>
              <option value="America/Los_Angeles">America/Los_Angeles</option>
              <option value="America/Denver">America/Denver</option>
              <option value="America/Chicago">America/Chicago</option>
              <option value="America/New_York">America/New_York</option>
              <option value="America/Sao_Paulo">America/Sao_Paulo</option>
              {/* <option value="auto">Automatically detect time zone</option> */}
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
          <div className='weekForecast'>
            {weather.daily.temperature_2m_max.map((item, i) => <DayForecast weather={weather} setAddInfo={setAddInfo} my_key={i} weekday={i} weathercode={weather.daily.weathercode[i]} temp={item} appar_temp={weather.daily.apparent_temperature_max[i]} key={i} />)}
          </div>
          <div className="addInfo">
            <h3>Additional Information</h3>
            <div className="addInfo__firstRow">
              {/* ВЫНОСИМ МОДУЛИ В ОТДЕЛЬНЫЕ КОМПОНЕНТЫ */}

              <div className="addInfo__module">
                <h4>UV Index</h4>
                <div className="module__uvIndex">
                  <span className='uvIndex1'>0</span>
                  <span className='uvIndex2'>4</span>
                  <span className='uvIndex3'>6</span>
                  <span className='uvIndex4'>12</span>
                  <div className="uvIndex__graphWrapper">
                    <div className="uvIndex__graph">
                      <div className="uvIndex__shadowLine">

                      </div>
                      <Doughnut data={graphData} />;
                      <div className="uvIndex__mainNum">
                        <span>{Math.floor(addInfo.uv_index_max)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="addInfo__module">
                <h4>Wind Status</h4>
                <div className="module__wind">
                  <h1>{addInfo.windspeed_120m}<span>km/h</span></h1>
                </div>
                <div className="module__windDir">
                  <div style={{ transform: `rotate(${addInfo.winddirection}deg)` }} className="wind__imgWrapper"><img src={process.env.PUBLIC_URL + '/img/winddir.png'} alt="" /></div>
                  <span>WIND DIRECTION</span>
                </div>
              </div>
              <div className="addInfo__module">
                <h4>Sunrise & Sunset</h4>
                <div className="module__sunrise">
                  <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + '/img/sunrise.png'} alt="" /></div>
                  <div className="sunrise__time">
                    <p>{addInfo.sunrise.match(/[0-9]+:[0-9]+/)}</p>
                    <span>Sunrise</span>
                  </div>
                </div>
                <div className="module__sunrise">
                  <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + '/img/sunset.png'} alt="" /></div>
                  <div className="sunrise__time">
                    <p>{addInfo.sunset.match(/[0-9]+:[0-9]+/)}</p>
                    <span>Sunset</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="addInfo__firstRow">

              <div className="addInfo__module">
                <h4>Humidity</h4>
                <div className="module__humidity">
                  <div className="humidty_value">
                    <h1>{addInfo.humidity} <span>%</span></h1>
                    <div className="humidty__bar">
                      <div className="bar__wrapper">
                        <div style={{ height: `${100 - addInfo.humidity}%` }}></div>
                      </div>
                    </div>
                    <div className="humidity__legend">
                      <p><span>—</span> Very High</p>
                      <p><span>—</span> High</p>
                      <p><span>—</span> Normall</p>
                      <p><span>—</span> Low</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="addInfo__module">
                <h4>Visibility</h4>
                <div className="module__visibility">
                  <div className="visibility__value">
                    <h1>{addInfo.visibility} <span>km</span></h1>
                  </div>
                </div>

              </div>
              <div className="addInfo__module">
                <h4>Pressure</h4>
                <div  className="module__pres">
                  <div  className="pres_value">
                    <h1>{addInfo.pressure}<span>Pa</span></h1>
                    <div className="pres__bar">
                      <div className="bar__wrapper">
                        <div style={{ height: `${100 - Math.abs(((1070-addInfo.pressure)/140-1)*100)}%` }}></div>
                      </div>
                    </div>
                    <div className="pres__legend">
                      <p><span>—</span> Very High</p>
                      <p><span>—</span> High</p>
                      <p><span>—</span> Normall</p>
                      <p><span>—</span> Low</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

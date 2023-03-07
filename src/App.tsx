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

  async function fetchData() {
    try {
      setLoader(true);
      const API_MAP: string = "5f85554c-4706-4b49-ad4f-1f2a43e0db91";
      const geo = await axios.get<any>(`https://geocode-maps.yandex.ru/1.x?geocode=${searchValue}&apikey=${API_MAP}&format=json`);

      const lat: number = geo.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.match(/[0-9]+\.[0-9]+/gi)[1];
      const lon: number = geo.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.match(/[0-9]+\.[0-9]+/gi)[0];
      // const urlTimezone:RegExpMatchArray|null = timezone[0].match(/\w+[^\/]/gi);

      const res = await axios.get<IWeather>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=relativehumidity_2m,pressure_msl,visibility&daily=weathercode,temperature_2m_max,apparent_temperature_max,sunrise,sunset,uv_index_max&timezone=${timezone}&current_weather=true`);
      console.log(res.data);
      
      setWeather(res.data);
      setWwCode(res.data.current_weather.weathercode);
      setCords([lat, lon]);
      setLoader(false);
    } catch (error: unknown) {
      const e = error as AxiosError;
      setLoader(false);
      setError(e.message);
    }

  }

  useEffect(() => {
    // console.log(cords);

  }, [cords]);
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
            {weather.daily.temperature_2m_max.map((item, i) => <DayForecast weekday={i} weathercode={weather.daily.weathercode[i]} temp={item} appar_temp={weather.daily.apparent_temperature_max[i]} key={i} />)}
          </div>
          <div className="addInfo">
            <h3>Additional Information</h3>
            <div className="addInfo__firstRow">
              {/* ВЫНОСИМ МОДУЛИ В ОТДЕЛЬНЫЕ КОМПОНЕНТЫ */}

              <div className="addInfo__module">
                <h4>Sunrise & Sunset</h4>
                <div className="module__sunrise">
                  <div className="sunrise__time">
                  </div>
                </div>
              </div>
              <div className="addInfo__module">
                <h4>Wind Status</h4>
                <div className="module__wind">
                  <h1>7.70 <span>km/h</span></h1>
                </div>
                <div className="module__windDir">
                  <div className="wind__imgWrapper"><img src={process.env.PUBLIC_URL + 'img/sunny.png'} alt="" /></div>
                  <span>WIND DIRECTION</span>
                </div>
              </div>
              <div className="addInfo__module">
                <h4>Sunrise & Sunset</h4>
                <div className="module__sunrise">
                  <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + 'img/sunny.png'} alt="" /></div>
                  <div className="sunrise__time">
                    <p>6:35 AM</p>
                    <span>Left: 2h 32m</span>
                  </div>
                </div>
                <div className="module__sunrise">
                  <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + 'img/sunny.png'} alt="" /></div>
                  <div className="sunrise__time">
                    <p>6:35 AM</p>
                    <span>Left: 2h 32m</span>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="addInfo__firstRow">

            <div className="addInfo__module">
                <h4>Sunrise & Sunset</h4>
                <div className="module__sunrise">
                  <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + 'img/sunny.png'} alt="" /></div>
                  <div className="sunrise__time">
                    <p>6:35 AM</p>
                    <span>Left: 2h 32m</span>
                  </div>
                </div>
                <div className="module__sunrise">
                  <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + 'img/sunny.png'} alt="" /></div>
                  <div className="sunrise__time">
                    <p>6:35 AM</p>
                    <span>Left: 2h 32m</span>
                  </div>
                </div>
              </div>
              <div className="addInfo__module">
                <h4>Sunrise & Sunset</h4>
                <div className="module__sunrise">
                  <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + 'img/sunny.png'} alt="" /></div>
                  <div className="sunrise__time">
                    <p>6:35 AM</p>
                    <span>Left: 2h 32m</span>
                  </div>
                </div>
                <div className="module__sunrise">
                  <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + 'img/sunny.png'} alt="" /></div>
                  <div className="sunrise__time">
                    <p>6:35 AM</p>
                    <span>Left: 2h 32m</span>
                  </div>
                </div>
              </div>
              <div className="addInfo__module">
                <h4>Sunrise & Sunset</h4>
                <div className="module__sunrise">
                  <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + 'img/sunny.png'} alt="" /></div>
                  <div className="sunrise__time">
                    <p>6:35 AM</p>
                    <span>Left: 2h 32m</span>
                  </div>
                </div>
                <div className="module__sunrise">
                  <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + 'img/sunny.png'} alt="" /></div>
                  <div className="sunrise__time">
                    <p>6:35 AM</p>
                    <span>Left: 2h 32m</span>
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

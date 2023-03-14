import axios, { Axios, AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';
import './App.scss';
import { CurrentWeather } from './components/CurrentWeather';
import { Search } from './components/UI/Search';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { DayForecast } from './components/DayForecast';
import { useWeather } from './hooks/useWeather'
import { Select } from './components/UI/Select';
import { UvModule } from './components/UvModule';
import { WindModule } from './components/WindModule';
import { SunriseModule } from './components/SunriseModule';
import { HumidityModule } from './components/HumidityModule';
import { VisibilityModule } from './components/VisibilityModule';
import { PressureModule } from './components/PressureModule';
import Slider from 'react-touch-drag-slider';
import { useChangeInfo } from './hooks/useChangeInfo';

function App() {
  const {
    weather,
    wwCode,
    loader,
    searchValue,
    cords,
    error,
    timezone,
    setSearchValue,
    fetchData,
    fetchGeo,
    setTimezone,
    addInfo,
    setAddInfo } = useWeather();
    
  const {windspeed,winddirection,humidty,pressure,visibility_km} = useChangeInfo(weather);

  const screensize = window.screen.width;
  
  useEffect(() => {

  }, [addInfo]);

  const mapState = React.useMemo(
    () => ({ center: [cords[0], cords[1]], zoom: 6, controls: ["zoomControl", "fullscreenControl"], }),
    [cords]
  );

  return (
    <div className='container'>
      <div className='left-side__menu'>
        <Search fetchGeo={fetchGeo} fetch={fetchData} setValue={setSearchValue} />
        <CurrentWeather weather={weather} wwCode={wwCode} loadStatus={loader} />
        <div className={loader ? "choosen-city__load" : "choosen-city"}>
          <YMaps >
            <Map style={{ width: '362px', height: '240px' }} state={mapState} modules={["control.ZoomControl", "control.FullscreenControl"]}>
              <Placemark geometry={[cords[0], cords[1]]} />
            </Map>
          </YMaps>
        </div>
      </div>
      <div className="rightSection">
        <div className="rightSection__wrapper">
          <Select timezone={timezone} setTimezone={setTimezone} />
          <div id='weekForecast__mobile' className='weekForecast'>
              <Slider onSlideComplete={(i) => {
                setAddInfo({ 
                  sunrise: weather.daily.sunrise[i], 
                  sunset: weather.daily.sunset[i], 
                  uv_index_max: weather.daily.uv_index_max[i], 
                  windspeed_120m: windspeed[i], 
                  winddirection: winddirection[i], 
                  humidity: humidty[i], 
                  visibility: visibility_km[i], 
                  pressure: pressure[i] 
                })
              }}
                onSlideStart={(i) => {
                  // console.log('started dragging on slide', i)
                }}
                activeIndex={0}
                threshHold={100}
                transition={0.5}
                scaleOnDrag={true}>
                {weather.daily.temperature_2m_max.map((item, i) => <DayForecast weather={weather} setAddInfo={setAddInfo} my_key={i} weekday={i} weathercode={weather.daily.weathercode[i]} temp={item} appar_temp={weather.daily.apparent_temperature_max[i]} key={i} />)}
              </Slider>
          </div>
          <div id='weekForecast__pc' className='weekForecast'>
                {weather.daily.temperature_2m_max.map((item, i) => <DayForecast weather={weather} setAddInfo={setAddInfo} my_key={i} weekday={i} weathercode={weather.daily.weathercode[i]} temp={item} appar_temp={weather.daily.apparent_temperature_max[i]} key={i} />)}
          </div>
          <div className="addInfo">
            <h3>Additional Information</h3>
            <div className="addInfo__firstRow">
              <UvModule addInfo={addInfo} />
              <WindModule addInfo={addInfo} />
              <SunriseModule addInfo={addInfo} />
            </div>
            <div className="addInfo__firstRow">
              <HumidityModule addInfo={addInfo} />
              <VisibilityModule addInfo={addInfo} />
              <PressureModule addInfo={addInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import './App.css'
import searchIcon from './assets/search.png';
import Clearicon from './assets/clear.png';
import humidityicon from './assets/humidity.png';
import windicon from './assets/wind.png';
import cloudicon from './assets/cloud.png';
import drizzleicon from './assets/drizzle.png';
import rainicon from './assets/rain.png';
import snowicon from './assets/snow.png';
const WeatherDetails= ({icon,temp,city,country,lat,long,humidity,wind}) => {
return(
  <>
  <div className='image'>
    <img src={icon} alt="" />
  </div>
  <div className='temp'>{temp}°c</div>
  <div className='location'>{city}</div>
  <div className='countrys'>{country}</div>
  <div className='cord'>
    <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='long'>Longitude</span>
      <span>{long}</span>
    </div>
  </div>
  <div className='data-container'>
    <div className='element'>
      <img src={humidityicon} alt="humidity" className='icon' />
      <div className='data'>
        <div className='humidity-percent'>{humidity}%</div>
        <div className='text'>Humidity</div>
      </div>
    </div>
  <div className='element'>
      <img src={windicon} alt="humidity" className='wind' />
      <div className='data'>
        <div className='wind-percent'>{wind}km</div>
        <div className='text'>wind speed
        </div>
      </div>
    </div>
    </div>
  </>)
};
WeatherDetails.propTypes ={
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,

};
function App() {
  let api_key="638705a031ed02e69011fb83650e5951";
  const [text,setText]=useState("coimbatore");
const [icon, setIcon] =useState(Clearicon);
const [temp, settemp] =useState(0);
const [city, setcity]=useState("");
const [country, setcountry]=useState("");
const [lat, setlat]=useState(0);
const [long, setlong]=useState(0);
const [humidity, sethumidity]=useState(0);
const [wind, setwind]=useState(0);
const[citynotfound, setcitynotfound] = useState(false);
const [loading, setloading] = useState(false);
const[error, seterror] = useState(null);
const weatherIconmap ={
  "01d": Clearicon,
  "01n": Clearicon,
  "02d": cloudicon,
  "02n": cloudicon,
  "03d": drizzleicon,
  "03n": drizzleicon,
  "04d": drizzleicon,
  "04n": drizzleicon,
  "09d": rainicon,
  "09n": rainicon,
  "10d": rainicon,
  "10n": rainicon,
  "13d": snowicon,
  "13n": snowicon,
};
const search=async () =>{ 
  setloading(true);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  try{
    let res =await fetch(url);
    let data= await res.json();
    if(data.cod === "404"){
    
      setcitynotfound(true);
      setloading(false);
      return;
    }
    sethumidity(data.main.humidity);
    setwind(data.wind.speed);
     settemp(Math.floor(data.main.temp));
     setcity(data.name);
     setcountry(data.sys.country);
     setlat(data.coord.lat);
     setlong(data.coord.lon);
     const weathericoncode = data.weather[0].icon;
     setIcon(weatherIconmap[weathericoncode] || Clearicon);
     setcitynotfound(false);
  }
  catch (error){console.log("An error ocuured:",error.message );
    seterror("An error occured while fetching weather data.");
  }
  finally{
    setloading(false);
  }
};
const handlecity = (e) => {
 setText(e.target.value);
};
const handlekeydown =(e) =>{
  if(e.key === "Enter"){
    search();
  }
};
useEffect(function(){
  search();
}, []);
  return (
    <> 
    <div className='container'>
      <div className='input-container'>
      <input type="text" className='city' placeholder='Search city' onChange={handlecity} value={text} onKeyDown={handlekeydown}/>
      <div className='search-icon' onClick={() => search()}>
         <img src= {searchIcon} alt="search" />
      </div>
      </div>
      {!loading && !citynotfound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} humidity={humidity} wind={wind}/>}
      {loading && <div className='loading-message'>Loading.....</div>}
      {error && <div className='error-message'>{error}</div>}
        {citynotfound && <div className='citynotfound'>city not found</div>}
      <p className='copyright'>
        Designed by <span>Siva </span>
      </p>
    </div>
    </>
  )
}

export default App

import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { APP_TITLE } from "./constants/text";
import SearchBox from "./components/search_box";
import ErrorMessageBox from "./components/error_msg";
import { CURRENT_WEATHER_LINK, HISTORY_WEATHER_LINK } from "./constants/links";
import { Spinner } from "reactstrap";
import WeatherDetails from "./components/weather_details";
import {getIcon} from './constants/icons'

function App() {
  const [state, setState] = useState({
    city: null,
    weatherInfo: null,
    error: null,
    isLoading: false
  });

  const { city, weatherInfo, error, isLoading } = state;

  const onSubmit = async (city) => {
    setState({ ...state, city,isLoading:true});
    const API_KEY = process.env.REACT_APP_API_KEY;
    var query = `q=${city}&appid=${API_KEY}`;

    Promise.all([
      fetch(CURRENT_WEATHER_LINK + query),
      fetch(HISTORY_WEATHER_LINK + query),
    ])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()]);
        }
        throw Error(res1.statusText, res2.statusText);
      })
      .then(([data1, data2]) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "Nocvember",
          "December",
        ];
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`;
        const sunset = new Date(data1.sys.sunset * 1000)
          .toLocaleTimeString()
          .slice(0, 5);
        const sunrise = new Date(data1.sys.sunrise * 1000)
          .toLocaleTimeString()
          .slice(0, 5);

        const weatherInfo = {
          city: data1.name,
          country: data1.sys.country,
          date,
          icon:getIcon(data1.weather[0].description),
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp-273.15,
          highestTemp: data1.main.temp_max-273.15,
          lowestTemp: data1.main.temp_min-273.15,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          history:data2.list
        };
        setState({
          ...state,
          weatherInfo,
          error: false,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);

        setState({
          ...state,
          error:"Data Not Found!",
          weatherInfo: null,
          isLoading: false,
        });
      });
  };

  return (
    <div>
      {weatherInfo === null ? (
        <div className="d-flex justify-content-center align-items-center full-height flex-column">
          <div className="m-4">
            <h1 className="text-light m-4">{APP_TITLE}</h1>
            <SearchBox cityValue={city} onSubmit={onSubmit} />
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <div>
              {error !== null ? <ErrorMessageBox message={error} /> : null}
            </div>
          )}
        </div>
      ) : (
        <WeatherDetails cityValue={city} onSubmit={onSubmit} weatherInfo={weatherInfo} />
      )}
    </div>
  );
}

export default App;

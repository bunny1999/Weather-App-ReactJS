import React, { useEffect, useState } from "react";
import "../App.css";
import SearchBox from "./search_box";
import Chart from "./chart";
import { Input, Spinner, Container } from "reactstrap";
import _debounce from 'lodash.debounce';
import { useMediaQuery } from 'react-responsive';

export default function WeatherDetails({ cityValue, onSubmit, weatherInfo }) {
  const [param, setParam] = useState({});
  const [chartData, setChartData] = useState(null);
  const isPortrait = useMediaQuery({ query: `(max-width: 760px)` });
  useEffect(() => {
    var data = {};
    for (var i = 0; i < weatherInfo.history.length; i += 8) {
      if (data.Temprature == null) data.Temprature = [];
      if (data.Pressure == null) data.Pressure = [];
      if (data.Humidity == null) data.Humidity = [];
      if (data.WindSpeed == null) data.WindSpeed = [];
      const date = weatherInfo.history[i].dt_txt.split(" ")[0].split("-")[2];
      data["Temprature"] = [
        ...data["Temprature"],
        {
          date: date,
          val: weatherInfo.history[i].main.temp,
        },
      ];
      data["Pressure"] = [
        ...data["Pressure"],
        {
          date: date,
          val: weatherInfo.history[i].main.pressure,
        },
      ];
      data["Humidity"] = [
        ...data["Humidity"],
        {
          date: date,
          val: weatherInfo.history[i].main.humidity,
        },
      ];
      data["WindSpeed"] = [
        ...data["WindSpeed"],
        {
          date: date,
          val: weatherInfo.history[i].wind.speed,
        },
      ];
    }
    setParam(data);
    setChartData("Temprature");
  }, []);

  const {
    city,
    country,
    date,
    description,
    icon,
    temp,
    highestTemp,
    lowestTemp,
    sunrise,
    sunset,
    humidity,
    wind,
  } = weatherInfo;

  return (
    <div className="d-flex flex-column full-height text-light">
      <div className="d-flex flex-grow-1 justify-content-center align-items-center flex-column">
        <div className="d-flex flex-grow-2 align-items-center">
          <SearchBox cityValue={cityValue} onSubmit={onSubmit} />
        </div>
        <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center ">
          <p className="h1-sm">{city + ", " + country}</p>
          <h5>{date}</h5>
        </div>
      </div>
      <div
        className={"d-flex flex-grow-3 " + (isPortrait ? "flex-column" : "")}
      >
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <div>{icon}</div>
          <div className="d-flex flex-column mx-4">
            <p className="h1-lg">{Math.floor(temp)}&#176;</p>
            <h4>{description}</h4>
          </div>
        </div>
        <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
          {param !== null && chartData !== null ? (
            <div
              className="d-block"
              style={{ width: "50%", height: "50%", margin: "0" }}
            >
              <Chart data={param[chartData]} />
            </div>
          ) : (
            <Spinner />
          )}
          <div className="d-block">
            <Input
              type="select"
              onChange={(event) => setChartData(event.target.value)}
              className="rounded-pill"
            >
              {param != null
                ? Object.keys(param).map((val) => <option>{val}</option>)
                : null}
            </Input>
          </div>
        </div>
      </div>
      <div
        className={
          "d-flex transperent-box " + (isPortrait ? "flex-column" : "")
        }
      >
        <div className="d-flex flex-grow-1 align-items-center flex-column">
          <div>
            <div className="d-flex flex-grow-1">
              <h3>{Math.floor(highestTemp)}&#176;</h3>
            </div>
            <div className="d-flex flex-grow-1">Hight</div>
          </div>
        </div>
        <div className="d-flex flex-grow-1 align-items-center flex-column justify-content-center">
          <div>
            <div className="d-flex flex-grow-2">
              <h3>{Math.floor(lowestTemp)}&#176;</h3>
            </div>
            <div className="d-flex flex-grow-1">Low</div>
          </div>
        </div>
        <div className="d-flex flex-grow-1 align-items-center flex-column">
          <div className="d-flex flex-grow-2">
            <h3>{wind}mph</h3>
          </div>
          <div className="d-flex flex-grow-1">Wind</div>
        </div>
        <div className="d-flex flex-grow-1 align-items-center flex-column">
          <div className="d-flex flex-grow-2">
            <h3>{humidity}%</h3>
          </div>
          <div className="d-flex flex-grow-1">Humidity</div>
        </div>
        <div className="d-flex flex-grow-1 align-items-center flex-column">
          <div className="d-flex flex-grow-2">
            <h3>{sunrise}</h3>
          </div>
          <div className="d-flex flex-grow-1">Sunrise</div>
        </div>
        <div className="d-flex flex-grow-1 align-items-center flex-column">
          <div className="d-flex flex-grow-2">
            <h3>{sunset}</h3>
          </div>
          <div className="d-flex flex-grow-1">Sunset</div>
        </div>
      </div>
    </div>
  );
}

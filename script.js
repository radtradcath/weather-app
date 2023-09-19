const searchInput = document.querySelector("#city");
const form = document.querySelector("form");
const todayDate = document.querySelector(".day");
const cityName = document.querySelector(".city-name");
const currentConditionIco = document.querySelector(".current-ico");
const maxTemp = document.querySelector(".max-temp");
const minTemp = document.querySelector(".min-temp");
const currentTemp = document.querySelector(".current-temp");
const rainChance = document.querySelector(".rain-chance");
const avgHumidity = document.querySelector(".avg-humidity");
const uv = document.querySelector(".uv");
const condition = document.querySelector(".condition");
const maxWind = document.querySelector(".max-wind");
const currentWind = document.querySelector(".current-wind");
const day1Date = document.querySelector(".day1");
const day2Date = document.querySelector(".day2");
const fore1Ico = document.querySelector(".fore1-ico");
const fore2Ico = document.querySelector(".fore2-ico");
const dailyRain1 = document.querySelector(".daily-rain1");
const dailyRain2 = document.querySelector(".daily-rain2");
const avgTemp1 = document.querySelector(".avg-temp1");
const avgTemp2 = document.querySelector(".avg-temp2");
const minTemp1 = document.querySelector(".min-temp1");
const maxTemp1 = document.querySelector(".max-temp1");
const minTemp2 = document.querySelector(".min-temp2");
const maxTemp2 = document.querySelector(".max-temp2");
const toggleBtn = document.querySelector(".toggle-unit");
let isF = false;
let city = "São Paulo";
console.log(city);
toggleBtn.addEventListener("click", () => {
  if (!isF) {
    toggleBtn.textContent = "To °C";
    isF = true;
    getForecastAPI(city)
      .then(renderAPI)
      .catch((err) => {
        alert("Input a valid location.");
      });
  } else {
    toggleBtn.textContent = "To °F";
    isF = false;
    getForecastAPI(city)
      .then(renderAPI)
      .catch((err) => {
        alert("Input a valid location.");
      });
  }
});

function renderAPI(result) {
  if (!isF) {
    maxTemp.textContent =
      "max: " + result.forecast.forecastday[0].day.maxtemp_c + " °C";
    minTemp.textContent =
      "min: " + result.forecast.forecastday[0].day.mintemp_c + " °C";
    currentTemp.textContent = result.current.temp_c + " °C";
    avgTemp1.textContent = result.forecast.forecastday[1].day.avgtemp_c + " °C";
    minTemp1.textContent =
      "min: " + result.forecast.forecastday[1].day.mintemp_c + " °C";
    maxTemp1.textContent =
      "max: " + result.forecast.forecastday[1].day.maxtemp_c + " °C";
    avgTemp2.textContent = result.forecast.forecastday[2].day.avgtemp_c + " °C";
    minTemp2.textContent =
      "min: " + result.forecast.forecastday[2].day.mintemp_c + " °C";
    maxTemp2.textContent =
      "max: " + result.forecast.forecastday[2].day.maxtemp_c + " °C";
  } else {
    maxTemp.textContent =
      "max: " + result.forecast.forecastday[0].day.maxtemp_f + " °F";
    minTemp.textContent =
      "min: " + result.forecast.forecastday[0].day.mintemp_f + " °F";
    currentTemp.textContent = result.current.temp_f + " °F";
    avgTemp1.textContent = result.forecast.forecastday[1].day.avgtemp_f + " °F";
    minTemp1.textContent =
      "min: " + result.forecast.forecastday[1].day.mintemp_f + " °F";
    maxTemp1.textContent =
      "max: " + result.forecast.forecastday[1].day.maxtemp_f + " °F";
    avgTemp2.textContent = result.forecast.forecastday[2].day.avgtemp_f + " °F";
    minTemp2.textContent =
      "min: " + result.forecast.forecastday[2].day.mintemp_f + " °F";
    maxTemp2.textContent =
      "max: " + result.forecast.forecastday[2].day.maxtemp_f + " °F";
  }
  cityName.textContent =
    result.location.region + ", " + result.location.country;
  currentConditionIco.src = result.current.condition.icon;
  todayDate.textContent = result.current.last_updated;

  rainChance.textContent =
    "Rain: " + result.forecast.forecastday[0].day.daily_chance_of_rain + " %";
  avgHumidity.textContent =
    "Avg Humidity: " + result.forecast.forecastday[0].day.avghumidity + " %";
  uv.textContent = "UV Index: " + result.current.uv;
  condition.textContent = result.current.condition.text;
  maxWind.textContent =
    "Max: " + result.forecast.forecastday[0].day.maxwind_kph + " kph";
  currentWind.textContent = "Current: " + result.current.wind_kph + " kph";

  day1Date.textContent = result.forecast.forecastday[1].date;
  fore1Ico.src = result.forecast.forecastday[1].day.condition.icon;
  dailyRain1.textContent =
    "Rain: " + result.forecast.forecastday[1].day.daily_chance_of_rain + " %";

  day2Date.textContent = result.forecast.forecastday[2].date;
  fore2Ico.src = result.forecast.forecastday[2].day.condition.icon;
  dailyRain2.textContent =
    "Rain: " + result.forecast.forecastday[2].day.daily_chance_of_rain + " %";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  city = searchInput.value;
  getForecastAPI(city)
    .then(renderAPI)
    .catch((err) => {
      alert("Input a valid location.");
    });
});

async function getForecastAPI(location) {
  let todayJson = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=69f03f565d6547a29d0143942231809&q=${location}&days=3&aqi=yes&alerts=yes`
  );
  let forecast = await todayJson.json();
  console.log(forecast);
  return forecast;
}

getForecastAPI("São Paulo").then(renderAPI);

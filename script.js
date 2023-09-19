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
const day3Date = document.querySelector(".day3");
const fore1Ico = document.querySelector(".fore1-ico");
const fore2Ico = document.querySelector(".fore2-ico");
const fore3Ico = document.querySelector(".fore3-ico");
const avgTemp1 = document.querySelector(".avg-temp1");
const avgTemp2 = document.querySelector(".avg-temp2");
const avgTemp3 = document.querySelector(".avg-temp3");
const minTemp1 = document.querySelector("min-temp1");
const maxTemp1 = document.querySelector("max-temp1");
const minTemp2 = document.querySelector("min-temp2");
const maxTemp2 = document.querySelector("max-temp2");
const minTemp3 = document.querySelector("min-temp3");
const maxTemp3 = document.querySelector("max-temp3");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = searchInput.value;
  getForecastAPI(city).then(renderAPI);
});

async function getForecastAPI(location) {
  try {
    let todayJson = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=69f03f565d6547a29d0143942231809&q=${location}&days=3&aqi=yes&alerts=yes`
    );
    let forecast = await todayJson.json();
    console.log(forecast);
    return forecast;
  } catch (err) {
    alert(err);
  }
}

function renderAPI(result) {
  cityName.textContent =
    result.location.region + ", " + result.location.country;
  currentConditionIco.src = result.current.condition.icon;
  todayDate.textContent = result.current.last_updated;
  maxTemp.textContent =
    "max: " + result.forecast.forecastday[0].day.maxtemp_c + " °C";
  minTemp.textContent =
    "min: " + result.forecast.forecastday[0].day.mintemp_c + " °C";
  currentTemp.textContent = result.current.temp_c + " °C";
  rainChance.textContent =
    "Rain: " + result.forecast.forecastday[0].day.daily_chance_of_rain + " %";
  avgHumidity.textContent =
    "Avg Humidity: " + result.forecast.forecastday[0].day.avghumidity + " %";
  uv.textContent = "UV Index: " + result.current.uv;
  condition.textContent = result.current.condition.text;
  maxWind.textContent =
    "Max: " + result.forecast.forecastday[0].day.maxwind_kph + " kph";
  currentWind.textContent = "Current: " + result.current.wind_kph + " kph";
}

getForecastAPI("São Paulo").then(renderAPI);

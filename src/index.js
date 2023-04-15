function displayFormatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date();
  let currentDay = days[date.getDay()];
  let currentTime = date.getHours();
  let currentMinutes = date.getMinutes();
  let formattedDate = `${currentDay}, ${currentTime}:${currentMinutes} `;

  return formattedDate;
}
let h3 = document.querySelector("h3");
h3.innerHTML = displayFormatDate();

function searchCity(city) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature");
  let h4Element = document.querySelector(".discription");
  h4Element.innerHTML = response.data.weather[0].discription();
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = `${temperature}`;
  iconElement.innerHTML = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
}
function displayWeatherCondition(response) {
  document.querySelector(".city").innerHTML = `${response.data.name}`;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity ${response.data.main.humidity} %`;
  document.querySelector(".wind").innerHTML = `Wind ${Math.round(
    response.data.wind.speed
  )} km/h`;
  displayTemperature(response);
}

function searchLocation(position) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function showFormValues(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
}
let searchEngineForm = document.querySelector("form");
searchEngineForm.addEventListener("submit", showFormValues);
let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentLocation);
function showFahrenheitValues(event) {
  event.preventDefault();
  let celsiusToFahrenheit = Math.round(
    (document.querySelector(".temperature").textContent * 9) / 5 + 32
  );
  document.querySelector(".temperature").textContent = celsiusToFahrenheit;
}

let fahrenheitUnits = document.querySelector(".fahrenheitUnits");
fahrenheitUnits.addEventListener("click", showFahrenheitValues);

function showCelsiusValues(event) {
  event.preventDefault();
  let fahrenheitToCelsius = Math.round(
    ((document.querySelector(".temperature").textContent - 32) * 5) / 9
  );
  document.querySelector(".temperature").textContent = fahrenheitToCelsius;
}
let celsiusUnits = document.querySelector(".celsiusUnits");
celsiusUnits.addEventListener("click", showCelsiusValues);

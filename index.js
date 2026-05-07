function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;

  let apiKey = "2ao1da5ab13686440tfd9513dff43f39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
} 
function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}°C`;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = description;

  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `Wind: ${windSpeed} m/s`;

  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", description);
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);


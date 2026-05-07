function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  getWeather(city);
}

function getWeather(city) {
  const apiKey = "1081ee1877082d205cc9e2cd985c72af";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayWeather(data) {
  
  document.querySelector("#current-city").innerHTML = data.name;

  
  document.querySelector("#temperature").innerHTML = Math.round(data.main.temp);

  
  document.querySelector("#wind").innerHTML = `Wind: ${data.wind.speed} m/s`;

  
  document.querySelector("#description").innerHTML =
    data.weather[0].description;


  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.querySelector("#icon").setAttribute("src", iconUrl);
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

  return `${days[day]} ${hours}:${minutes}`;
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);


getWeather("London");

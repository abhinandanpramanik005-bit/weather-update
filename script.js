const apiKey = "8640055510579aa69c4f9bd620f2cdd2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const extraDetails = document.querySelector(".extra-details");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  
  if (response.status == 404) {
    document.querySelector(".city").innerHTML = "City not found!";
    document.querySelector(".temp").innerHTML = "--°c";
    document.querySelector(".humidity").innerHTML = "--%";
    document.querySelector(".wind").innerHTML = "-- km/h";
    weatherIcon.src = "images/error.png";
    extraDetails.innerHTML = "";
    return;
  }

  const data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  // Extra details
  extraDetails.innerHTML = `
    <p>Feels Like: ${Math.round(data.main.feels_like)}°c</p>
    <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
    <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
  `;

  // Weather icon only (no background change)
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const locationApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      
      const response = await fetch(locationApiUrl);
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      extraDetails.innerHTML = `
        <p>Feels Like: ${Math.round(data.main.feels_like)}°c</p>
        <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
      `;
    });
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

getWeatherByLocation();


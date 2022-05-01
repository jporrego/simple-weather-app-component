document.querySelector(".btn").addEventListener("click", searchCityWeather);

async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4dcff09dee99876a903ebfe4277effa9&units=metric`;
    const response = await fetch(url, { mode: "cors" });
    if (response.status == 200) {
      const json = await response.json();
      return json;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    console.log(err);
  }
}

function weatherJsonToObject(json) {
  city = json.name;
  country = json.sys.country;
  temp = json.main.temp;
  temp_max = json.main.temp_max;
  temp_min = json.main.temp_min;
  description = json.weather[0].description;
  wind = json.wind.speed;
  humidity = json.main.humidity;
  pressure = json.main.pressure;
  return {
    city,
    country,
    temp,
    temp_max,
    temp_min,
    description,
    wind,
    humidity,
    pressure,
  };
}

function displayWeather(weatherObj) {
  const weatherDiv = document.querySelector(".weather");

  const city = document.querySelector(".city");
  city.textContent = `${weatherObj.city}, ${weatherObj.country}`;

  const temp = document.querySelector(".temp");
  temp.textContent = weatherObj.temp;

  const minMax = document.querySelector(".min-max");
  minMax.textContent = `Min ${weatherObj.temp_max} - Max ${weatherObj.temp_min}`;

  const description = document.querySelector(".description");
  description.textContent = weatherObj.description;

  const humidity = document.querySelector(".humidity");
  humidity.textContent = weatherObj.humidity + "%";

  const wind = document.querySelector(".wind");
  wind.textContent = weatherObj.wind + "m/s";

  const pressure = document.querySelector(".pressure");
  pressure.textContent = weatherObj.pressure + "mb";
}

function showLoadingComponent() {
  const loading = document.querySelector(".loading");

  loading.style.display = "flex";
}

function hideLoadingComponent() {
  const loading = document.querySelector(".loading");
  loading.style.display = "none";
}

async function searchCityWeather() {
  let cityToSearch = document.querySelector("input").value;
  if (cityToSearch === "") {
    cityToSearch = "vancouver";
  }
  showLoadingComponent();
  const weatherJson = await fetchWeather(cityToSearch);
  const weatherObj = weatherJsonToObject(weatherJson);
  displayWeather(weatherObj);
  hideLoadingComponent();
}

searchCityWeather();

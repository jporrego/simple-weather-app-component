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
  return {
    city,
    country,
    temp,
    temp_max,
    temp_min,
    description,
  };
}

function displayWeather(weatherObj) {
  const weatherDiv = document.querySelector(".weather");
  weatherDiv.textContent = "";

  const city = document.createElement("div");
  city.textContent = `${weatherObj.city}, ${weatherObj.country}`;

  const temp = document.createElement("div");
  temp.textContent = weatherObj.temp;

  const temp_max = document.createElement("div");
  temp_max.textContent = weatherObj.temp_max;

  const temp_min = document.createElement("div");
  temp_min.textContent = weatherObj.temp_min;

  const description = document.createElement("div");
  description.textContent = weatherObj.description;

  weatherDiv.append(city, temp, temp_max, temp_min, description);
}

async function searchCityWeather(e) {
  const cityToSearch = document.querySelector("input").value;
  const weatherJson = await fetchWeather(cityToSearch);
  const weatherObj = weatherJsonToObject(weatherJson);
  displayWeather(weatherObj);
}

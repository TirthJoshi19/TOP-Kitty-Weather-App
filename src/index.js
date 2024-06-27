let res;
let temp;
let cloudPct;
let feelsLike;
let humidity;
let maxTemp;
let minTemp;
let sunriseMil;
let sunsetMil;
let windSpeed;

let isCelsius = true;
let unit = 'C';
let unitIsCel = true;

const btn = document.querySelector('#toggle');
btn.addEventListener('click', () => {
  isCelsius = !isCelsius;
  if (unitIsCel) {
    unit = 'F';
    unitIsCel = false;
    btn.textContent = 'F';
  } else {
    unit = 'C';
    unitIsCel = true;
    btn.textContent = 'C';
  }
  updateTemperatures();
});

function updateTemperatures() {
  if (isCelsius) {
    showWeatherStatus(temp);
    feelsLikeUpdater(feelsLike);
    showMaxTemp(maxTemp);
    showMinTemp(minTemp);
  } else {
    showWeatherStatus(celToFarenheit(temp));
    feelsLikeUpdater(celToFarenheit(feelsLike));
    showMaxTemp(celToFarenheit(maxTemp));
    showMinTemp(celToFarenheit(minTemp));
  }
}

function celToFarenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

async function getWeather(city) {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '07a61fe7edmshe91f126dfac679ap182e4fjsn058bad2dcbca',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);

  res = result;
  temp = result.temp;
  sunsetMil = result.sunset;
  sunriseMil = result.sunrise;
  humidity = result.humidity;
  feelsLike = result.feels_like;
  cloudPct = result.cloud_pct;
  maxTemp = result.max_temp;
  minTemp = result.min_temp;
  windSpeed = result.wind_speed;
}

getWeather()
  .then(() => {
    console.log(feelsLike + ' hey ');
    console.log(cloudPct);
  })
  .catch((error) => {
    console.log(error);
  });

const submit = document.querySelector('#send');

submit.addEventListener('click', () => {
  const input = document.querySelector('#search');
  getWeather(input.value).then(() => {
    const value = input.value;
    changeWeather(value);
    showWeatherStatus(temp);
    updateWeatherIconandText(cloudPct);
    feelsLikeUpdater(feelsLike);
    showMaxTemp(maxTemp);
    showMinTemp(minTemp);
    showWindSpeed(windSpeed);
    callGiphyApi();
  });
});

function changeWeather(city) {
  const tempDivHead = document.querySelector('.tempDiv > h2');
  tempDivHead.textContent = `Weather of ${city}`;
}

let degree = `\u00B0`;
let farenheit = '';
function showWeatherStatus(temp) {
  const head = document.querySelector('#temph3');
  head.textContent = `Temperature: ${temp} ${degree}${unit}`; // Corrected to use ${degree}
}

function feelsLikeUpdater(feelsLike) {
  const feelsLikeh3 = document.querySelector('.feels-like-div-h');
  feelsLikeh3.textContent = `Feels Like: ${feelsLike} ${degree}${unit}`;
}

function showMaxTemp(maxTemp) {
  const p = document.querySelector('.max-temp-para');
  p.textContent = `Maximum Temperature is ${maxTemp} ${degree}${unit}`;
}

function showMinTemp(minTemp) {
  const p = document.querySelector('.min-temp-para');
  p.textContent = `Minimum Temperature is ${minTemp} ${degree}${unit}`;
}

function showWindSpeed(windSpeed) {
  const p = document.querySelector('.wind-para');
  p.textContent = `Wind Speed is ${windSpeed} km/h`;
}

function updateWeatherIconandText(cloudPct) {
  const head = document.querySelector('.status-head');
  if (cloudPct >= 0 && cloudPct <= 30) {
    head.textContent = 'Weather is Clear';
  } else if (cloudPct >= 30 && cloudPct <= 70) {
    head.textContent = 'Weather is Partly Cloudy';
  } else {
    head.textContent = 'Weather is Cloudy';
  }
}
let gifId;
let milkGifId = 'qZLecn5oiepK8';
let comfyCatId = 'NfzERYyiWcXU4';

const kittyPara = document.querySelector('.kitty-p');

function callGiphyApi() {
  const key = 'lGL10IXhndKxFF6MdmHBImKrc4JPaLfE';

  if (temp < 25) {
    let url = `https://api.giphy.com/v1/gifs/${milkGifId}?api_key=${key}`;
    fetch(url)
      .then((response) => response.json())
      .then((content) => {
        //data, pagination, meta
        console.log(content.data);
        const gif = document.querySelector('#kittyGif');
        gif.src = content.data.images.downsized.url;
        console.log(content.data.images.downsized.url);
        kittyPara.textContent =
          "It's too cold, I just wanna drink milk whilst staying Inside";
      })
      .catch();
  } else {
    const url2 = `https://api.giphy.com/v1/gifs/${comfyCatId}?api_key=${key}`;

    fetch(url2)
      .then((response) => response.json())
      .then((content) => {
        //data, pagination, meta
        console.log(content.data);
        const gif = document.querySelector('#kittyGif');
        gif.src = content.data.images.downsized.url;
        kittyPara.textContent = "It's a sunny day, my Fav";
      });
  }
}

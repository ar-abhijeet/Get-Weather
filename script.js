document.addEventListener('DOMContentLoaded',()=>{
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const tempratureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "a3c767081d3423c68c305ae7fad550b7"

  getWeatherButton.addEventListener('click',async()=>{
    const city = cityInput.value.trim();
    if(!city) return;

    try{
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    }
    catch(error){
      console.log(error);
    }

  })

  async function fetchWeatherData(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    console.log(response);
    if(!response.ok){
      showErrorMessage();
      throw new Error("City not found");
    };

    const data2 = await response.json();
    console.log(data2);
    return data2;
  }

  function displayWeatherData(data2){
    const {name,main,weather} = data2;

    cityNameDisplay.textContent = name;
    tempratureDisplay.textContent = `Temperature - ${main.temp}`;
    descriptionDisplay.textContent = `Weather - ${weather[0].description}`;
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }

  function showErrorMessage(){
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  }
});


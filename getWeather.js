document.getElementById('getWeather').addEventListener('click', () => {
  getWeather();
});

const getWeather = async () => {
  const city = document.getElementById('cityInput').value;

  try {
    // You can use your own api key
    const apiKey = 'dbb9068f6096c93316204fe4857c7ee7';

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = '';

    if (data.cod === '404') {
      const errorCard = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">City Not Found</h5>
            <p class="card-text">The city you entered was not found. Please try again.</p>
          </div>
        </div>
      `;
      weatherContainer.innerHTML = errorCard;
    } else {
      for (let i = 0; i < data.list.length; i += 8) {
        const weatherData = data.list[i];
        const date = new Date(weatherData.dt_txt);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temperature = Math.round(weatherData.main.temp);
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;

        const weatherCard = `
        <div class="col">
          <div class="card">
            <div class="card-header">
              <p class="card-text">${date.toLocaleDateString('id-ID')}</p>
            </div>
            <div class="card-body">
              <h5 class="card-title">${day}</h5>
              <img class="card-img-top" src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="Weather Icon">
              <p class="card-text">${temperature}°C</p>
              <p class="card-text text-uppercase">${description}</p>
            </div>
          </div>
        </div>
        `;
        weatherContainer.innerHTML += weatherCard;
      }
    }
  } catch (error) {
    console.log('Error:', error);
  }
};
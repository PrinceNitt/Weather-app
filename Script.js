const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiUrlByCoords = 'https://api.openweathermap.org/data/2.5/weather?';

const searchBox = document.querySelector('#search');
const cityInput = document.querySelector('#city');
const weatherDiv = document.querySelector('#weather');
const locationBtn = document.querySelector('#location-btn');

// Function to get weather icon based on weather condition
function getWeatherIcon(weatherMain) {
    const iconMap = {
        'Clear': 'clear.png',
        'Clouds': 'clouds.png',
        'Rain': 'rain.png',
        'Drizzle': 'drizzle.png',
        'Mist': 'mist.png',
        'Snow': 'snow.png',
        'Haze': 'mist.png',
        'Fog': 'mist.png'
    };
    return iconMap[weatherMain] || 'clouds.png';
}

// Function to display weather data
function displayWeather(data) {
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const cityName = data.name;
    const country = data.sys.country;
    
    weatherDiv.innerHTML = `
        <div class="weather-info">
            <div class="weather-icon">
                <img src="images/${weatherIcon}" alt="${data.weather[0].main}">
            </div>
            <div class="temperature">${temperature}°C</div>
            <div class="city">${cityName}, ${country}</div>
            <div class="description">${description.charAt(0).toUpperCase() + description.slice(1)}</div>
            <div class="details">
                <div class="detail-item">
                    <img src="images/humidity.png" alt="Humidity">
                    <div>
                        <div class="detail-value">${humidity}%</div>
                        <div class="detail-label">Humidity</div>
                    </div>
                </div>
                <div class="detail-item">
                    <img src="images/wind.png" alt="Wind">
                    <div>
                        <div class="detail-value">${windSpeed} km/h</div>
                        <div class="detail-label">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to get weather by coordinates (latitude and longitude)
async function checkWeatherByCoords(lat, lon) {
    // Check if API key is still the placeholder
    if (apiKey === 'YOUR_API_KEY' || !apiKey || apiKey.trim() === '') {
        weatherDiv.innerHTML = `
            <div class="error">
                <p><strong>API Key Required</strong></p>
                <p>Please add your OpenWeatherMap API key to use this app.</p>
                <p class="error-detail">1. Get a free API key from <a href="https://openweathermap.org/api" target="_blank">openweathermap.org/api</a></p>
                <p class="error-detail">2. Replace 'YOUR_API_KEY' in script.js with your actual API key</p>
            </div>
        `;
        return;
    }
    
    try {
        const response = await fetch(`${apiUrlByCoords}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 401) {
                weatherDiv.innerHTML = `
                    <div class="error">
                        <p><strong>Invalid API Key</strong></p>
                        <p>${data.message || 'Please check your API key and try again.'}</p>
                        <p class="error-detail">Get a free API key from <a href="https://openweathermap.org/api" target="_blank">openweathermap.org/api</a></p>
                    </div>
                `;
            } else {
                weatherDiv.innerHTML = `
                    <div class="error">
                        <p>Error: ${data.message || 'Weather data not available'}</p>
                        <p class="error-detail">Status code: ${response.status}</p>
                    </div>
                `;
            }
            return;
        }
        
        // Update weather display
        displayWeather(data);
        
    } catch (error) {
        weatherDiv.innerHTML = `
            <div class="error">
                <p>Error fetching weather data. Please try again later.</p>
                <p class="error-detail">${error.message}</p>
            </div>
        `;
    }
}

// Function to get current location and fetch weather
function getCurrentLocationWeather() {
    if (!navigator.geolocation) {
        weatherDiv.innerHTML = `
            <div class="error">
                <p>Geolocation is not supported by your browser.</p>
            </div>
        `;
        return;
    }
    
    weatherDiv.innerHTML = `
        <div class="error" style="color: #667eea;">
            <p>Getting your location...</p>
        </div>
    `;
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            checkWeatherByCoords(lat, lon);
        },
        (error) => {
            weatherDiv.innerHTML = `
                <div class="error">
                    <p>Unable to get your location.</p>
                    <p class="error-detail">${error.message}</p>
                    <p class="error-detail">Please allow location access or search by city name.</p>
                </div>
            `;
        }
    );
}

// Function to fetch weather data
async function checkWeather(city) {
    // Check if API key is still the placeholder
    if (apiKey === 'YOUR_API_KEY' || !apiKey || apiKey.trim() === '') {
        weatherDiv.innerHTML = `
            <div class="error">
                <p><strong>API Key Required</strong></p>
                <p>Please add your OpenWeatherMap API key to use this app.</p>
                <p class="error-detail">1. Get a free API key from <a href="https://openweathermap.org/api" target="_blank">openweathermap.org/api</a></p>
                <p class="error-detail">2. Replace 'YOUR_API_KEY' in script.js with your actual API key</p>
            </div>
        `;
        return;
    }
    
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 401) {
                weatherDiv.innerHTML = `
                    <div class="error">
                        <p><strong>Invalid API Key</strong></p>
                        <p>${data.message || 'Please check your API key and try again.'}</p>
                        <p class="error-detail">Get a free API key from <a href="https://openweathermap.org/api" target="_blank">openweathermap.org/api</a></p>
                    </div>
                `;
            } else if (response.status === 404) {
                weatherDiv.innerHTML = `
                    <div class="error">
                        <p>City not found. Please check the city name and try again.</p>
                    </div>
                `;
            } else {
                weatherDiv.innerHTML = `
                    <div class="error">
                        <p>Error: ${data.message || 'Weather data not available'}</p>
                        <p class="error-detail">Status code: ${response.status}</p>
                    </div>
                `;
            }
            return;
        }
        
        // Update weather display
        displayWeather(data);
        
    } catch (error) {
        weatherDiv.innerHTML = `
            <div class="error">
                <p>Error fetching weather data. Please try again later.</p>
                <p class="error-detail">${error.message}</p>
            </div>
        `;
    }
}

// Event listeners
searchBox.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        weatherDiv.innerHTML = `
            <div class="error">
                <p>Please enter a city name.</p>
            </div>
        `;
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            weatherDiv.innerHTML = `
                <div class="error">
                    <p>Please enter a city name.</p>
                </div>
            `;
        }
    }
});

// Event listener for location button
locationBtn.addEventListener('click', () => {
    getCurrentLocationWeather();
});

// Check weather on page load (optional - can be removed)
// Uncomment and add a default city if you want to show weather on load
// checkWeather('London');


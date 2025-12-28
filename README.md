# Weather App 🌤️

A beautiful, modern weather application that shows current weather conditions for any city or your current location.

## Features

- 🔍 Search weather by city name
- 📍 Get weather for your current location (using geolocation)
- 🌡️ Temperature display in Celsius
- 💧 Humidity information
- 💨 Wind speed details
- 🎨 Beautiful, responsive UI with animations

## How to Run

### Method 1: Direct Browser (Simple)

1. **Open the project folder** in Finder
2. **Double-click** on `index.html`
3. The app will open in your default browser

**Note:** Geolocation feature may not work with this method. Use Method 2 for full functionality.

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Setup API Key

**Important:** Before using the app, you need to add your OpenWeatherMap API key.

1. Get a free API key from [https://openweathermap.org/api](https://openweathermap.org/api)
2. Open `Script.js` file
3. Find line 1: `const apiKey = 'YOUR_API_KEY';`
4. Replace `'YOUR_API_KEY'` with your actual API key
5. Save the file

See `API_SETUP.md` for detailed instructions.

## Project Structure

```
Weather/
├── index.html          # Main HTML file
├── Script.js           # JavaScript logic
├── style.css           # Styling
├── images/             # Weather icons
│   ├── clear.png
│   ├── clouds.png
│   ├── rain.png
│   ├── snow.png
│   ├── mist.png
│   ├── drizzle.png
│   ├── humidity.png
│   ├── wind.png
│   └── search.png
├── API_SETUP.md        # API setup guide
└── README.md           # This file
```

## Usage

1. **Search by City:**
   - Enter a city name in the search box
   - Click the search button or press Enter

2. **Get Current Location Weather:**
   - Click "📍 Get My Location Weather" button
   - Allow location access when prompted
   - Weather for your location will be displayed

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### API Key Error
- Make sure you've added your API key in `Script.js`
- Wait 10-15 minutes after creating the API key for it to activate

### Location Not Working
- Make sure you're using a local server (Method 2)
- Allow location permissions in your browser
- Check that HTTPS is enabled or you're on localhost

### City Not Found
- Check the spelling of the city name
- Try using the format: "City, Country" (e.g., "London, UK")

## License
Developed by Prince Kumar



export interface WeatherData {
    temperature: number;
    condition: string;
    icon: string;
  }
  
  export const fetchWeather = async (capital: string): Promise<WeatherData> => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) {
      throw new Error("Weather API key is missing in environment variables.");
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }
  
    const data = await response.json();
    return {
      temperature: data.main.temp,
      condition: data.weather[0].description,
      icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    };
  };
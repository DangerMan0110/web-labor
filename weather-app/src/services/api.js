import axios from "axios";

// IDE ÍRD A SAJÁT API KULCSODAT:
const API_KEY = "4ae691720b5db65e4437e53b91756d1a";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(city) {
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}&lang=hu`;
  const { data } = await axios.get(url);
  return data;
}

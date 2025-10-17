<template>
  <div class="container">
    <h1>🌤️ Időjárás alkalmazás</h1>

    <div class="search">
      <input
        v-model="city"
        placeholder="Add meg a város nevét"
        @keyup.enter="fetchWeather"
      />
      <button @click="fetchWeather">Keresés</button>
    </div>

    <div v-if="weather" class="card">
      <h2>{{ weather.name }}</h2>
      <p>{{ weather.weather[0].description }}</p>
      <p class="temp">{{ Math.round(weather.main.temp) }} °C</p>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getWeather } from "./services/api";

const city = ref("");
const weather = ref(null);
const error = ref("");

async function fetchWeather() {
  if (!city.value) return;
  error.value = "";
  weather.value = null;

  try {
    weather.value = await getWeather(city.value);
  } catch (err) {
    error.value = "Nem sikerült lekérni az adatokat. Ellenőrizd a város nevét!";
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background: linear-gradient(180deg, #89f7fe, #66a6ff);
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 400px;
  margin: 4rem auto;
  text-align: center;
  background: white;
  color: #333; /* <-- EZ FONTOS */
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #007bff; /* szép kék cím */
}

.search input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 70%;
  color: #333; /* <-- a beírt városnév látszódjon */
}

button {
  margin-left: 8px;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.card {
  margin-top: 1.5rem;
}

.temp {
  font-size: 2rem;
  font-weight: bold;
  color: #222;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>

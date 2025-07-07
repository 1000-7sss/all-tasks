const apiKey = "58fc99d29953616461e08b8cf57001a0";
const historyList = document.getElementById("history");
const input = document.getElementById("cityInput");

async function getCurrentWeather(city) {
  try {
    showLoading(true);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru&units=metric`
    );
    if (!res.ok) throw new Error("Город не найден");
    const data = await res.json();
    formatWeatherData(data);
    saveToHistory(city);
  } catch (err) {
    handleApiError(err);
  } finally {
    showLoading(false);
  }
}

async function getForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=ru&units=metric`
  );
  const data = await res.json();
  showForecast(data);
}

function formatWeatherData(data) {
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = `
    <div class="card">
      <h2>${data.name}</h2>
      <p>${data.weather[0].description}</p>
      <p>Температура: ${data.main.temp}°C</p>
      <p>Влажность: ${data.main.humidity}%</p>
      <p>Ветер: ${data.wind.speed} м/с</p>
    </div>
  `;
  getForecast(data.name);
}

function showForecast(data) {
  const weatherDiv = document.getElementById("weather");
  const days = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (!days[date] && Object.keys(days).length < 5) {
      days[date] = item;
    }
  });

  Object.entries(days).forEach(([date, item]) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${new Date(date).toLocaleDateString("ru-RU")}</h3>
      <p>${item.weather[0].description}</p>
      <p>Темп: ${item.main.temp}°C</p>
    `;
    weatherDiv.appendChild(card);
  });
}

function showLoading(show) {
  document.getElementById("loading").classList.toggle("hidden", !show);
}

function handleApiError(error) {
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = error.message;
  errorDiv.classList.remove("hidden");
  setTimeout(() => errorDiv.classList.add("hidden"), 3000);
}

function saveToHistory(city) {
  const existing = JSON.parse(localStorage.getItem("weatherHistory")) || [];
  if (!existing.includes(city)) {
    existing.unshift(city);
    if (existing.length > 5) existing.pop();
    localStorage.setItem("weatherHistory", JSON.stringify(existing));
  }
  renderHistory();
}

function renderHistory() {
  const list = JSON.parse(localStorage.getItem("weatherHistory")) || [];
  historyList.innerHTML = "";
  list.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.style.cursor = "pointer";
    li.onclick = () => getCurrentWeather(city);
    historyList.appendChild(li);
  });
}

function searchWeather() {
  const city = input.value.trim();
  if (city) getCurrentWeather(city);
}

function getWeatherByLocation() {
  getUserLocation()
    .then(({ lat, lon }) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`
      )
        .then(res => res.json())
        .then(data => formatWeatherData(data));
    })
    .catch(err => handleApiError(new Error("Не удалось определить местоположение")));
}

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Геолокация не поддерживается"));
    } else {
      navigator.geolocation.getCurrentPosition(
        pos => {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          });
        },
        () => reject(new Error("Разрешение на геолокацию отклонено"))
      );
    }
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const themeBtn = document.getElementById("themeBtn");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️ Тема" : "🌙 Тема";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    document.getElementById("themeBtn").textContent = "☀️ Тема";
  }
}

// Добавляем слушателей
document.getElementById("themeBtn").addEventListener("click", toggleTheme);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") searchWeather();
});

applySavedTheme();
renderHistory();

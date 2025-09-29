/*
=======================================
📘 JavaScript & Web APIs Lab
All tasks in one file (script.js)
=======================================
*/

/*  
=======================================
TODO1: Welcome Board
---------------------------------------
When the page loads, display a welcome message 
inside the <p> element with id="t1-msg".

✅ Task:
- Select the element with id "t1-msg".
- Change its text to "Hello, World!".

💡 Hint:
document.getElementById("t1-msg").innerHTML = "Hello, World!";
*/

document.addEventListener("DOMContentLoaded", () => {
  const t1Msg = document.getElementById("t1-msg");
  if (t1Msg) {
    t1Msg.textContent = "Hello, World!";
  }

  /*  
  =======================================
  TODO2: Interaction Corner
  ---------------------------------------
  There is a button with id="t2-btn".
  When the button is clicked, change the text inside 
  the <p> with id="t2-status" to:
      "You clicked the button!"
  
  ✅ Task:
  - Get the button element.
  - Add a click event listener.
  - Inside the event, change the text of the status paragraph.
  
  💡 Hint:
  button.addEventListener("click", function () {
      // change text here
  });
  */
  const t2Btn = document.getElementById("t2-btn");
  const t2Status = document.getElementById("t2-status");
  if (t2Btn && t2Status) {
    t2Btn.addEventListener("click", () => {
      t2Status.textContent = "You clicked the button!";
    });
  }

  /*  
  =======================================
  TODO3: Inspiring Quote Board
  ---------------------------------------
  Use the Quotable API to display a random quote.
  
  🌍 API Link:
  https://dummyjson.com/quotes/random
  
  ✅ Task:
  - When the button with id="t3-loadQuote" is clicked:
      - Fetch a random quote from the API.
      - Display the quote text inside the <p> with id="t3-quote".
      - Display the author inside the <p> with id="t3-author".
  
  💡 Hint:
  The API returns JSON like:
  {
    "content": "Do not watch the clock. Do what it does. Keep going.",
    "author": "Sam Levenson"
  }
  
  Use:
  data.content   // the quote text
  data.author    // the author
  */
  const quoteBtn = document.getElementById("t3-loadQuote");
  const quoteText = document.getElementById("t3-quote");
  const quoteAuthor = document.getElementById("t3-author");

  async function loadRandomQuote() {
    if (!quoteBtn || !quoteText || !quoteAuthor) return;

    const originalLabel = quoteBtn.textContent;
    quoteBtn.disabled = true;
    quoteBtn.textContent = "Loading…";
    quoteAuthor.textContent = "";
    quoteText.textContent = "";

    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();

      // Support both "content" and "quote" fields
      const content = data?.content || data?.quote || "Keep going. Keep growing.";
      const author = data?.author || "Unknown";

      quoteText.textContent = content;
      quoteAuthor.textContent = "— " + author;
    } catch (err) {
      console.error("Quote fetch failed:", err);
      quoteText.textContent =
        "Do not watch the clock. Do what it does. Keep going.";
      quoteAuthor.textContent = "— Sam Levenson";
    } finally {
      quoteBtn.disabled = false;
      quoteBtn.textContent = originalLabel;
    }
  }

  if (quoteBtn) {
    quoteBtn.addEventListener("click", loadRandomQuote);
  }

  /*  
  =======================================
  TODO4: Dammam Weather Now
  ---------------------------------------
  Use the OpenWeatherMap API to display live weather data.
  
  🌍 API Link:
  https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=API_KEY=metric
  
  ⚠️ Replace YOUR_API_KEY with your actual API key from:
  https://openweathermap.org/api
  
  ✅ Task:
  - When the button with id="t4-loadWx" is clicked:
      - Fetch current weather data for Dammam.
      - Show temperature in the element with id="t4-temp".
      - Show humidity in the element with id="t4-hum".
      - Show wind speed in the element with id="t4-wind".
  
  💡 Hint:
  data.main.temp      → temperature (°C)
  data.main.humidity  → humidity (%)
  data.wind.speed     → wind speed (m/s)
  */
  const wxBtn = document.getElementById("t4-loadWx");
  const wxTemp = document.getElementById("t4-temp");
  const wxHum = document.getElementById("t4-hum");
  const wxWind = document.getElementById("t4-wind");
  const wxErr = document.getElementById("t4-err");

  function formatNumber(n) {
    return typeof n === "number" && isFinite(n) ? n.toFixed(1) : "—";
  }

  async function loadWeather() {
    if (!wxBtn || !wxTemp || !wxHum || !wxWind || !wxErr) return;

    wxErr.textContent = "";
    const original = wxBtn.textContent;
    wxBtn.disabled = true;
    wxBtn.textContent = "Loading…";

    try {
      // No key required; returns metric units (°C, %, m/s)
      const url =
        "https://api.open-meteo.com/v1/forecast"
        + "?latitude=26.4207&longitude=50.0888"
        + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
        + "&wind_speed_unit=ms"
        + "&timezone=auto";

      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const c = data?.current;

      wxTemp.textContent = `${formatNumber(c?.temperature_2m)} °C`;
      wxHum.textContent = `${formatNumber(c?.relative_humidity_2m)} %`;
      wxWind.textContent = `${formatNumber(c?.wind_speed_10m)} m/s`;
    } catch (err) {
      console.error("Weather fetch failed:", err);
      wxErr.textContent = String(err?.message || "Failed to load weather data.");
      wxTemp.textContent = "—";
      wxHum.textContent = "—";
      wxWind.textContent = "—";
    } finally {
      wxBtn.disabled = false;
      wxBtn.textContent = original;
    }
  }

  if (wxBtn) {
    wxBtn.addEventListener("click", loadWeather);
  }
});

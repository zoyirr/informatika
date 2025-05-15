const input = document.getElementById("input");
const btn = document.getElementById("btn");
const ota = document.getElementById("ota");
const apiKey = "0837213505e842f3a3b0490b885afd02";
const units = "metric";

async function fetchWeather() {
    const shahar = input.value.trim();
    if (shahar.length < 1) {
        alert("Shaharni kiriting!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${shahar}&units=${units}&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            alert("Shahar topilmadi!");
            return;
        }

        chizish(data);
    } catch (err) {
        console.error("Xatolik:", err);
    }
}

function chizish(malumot) {
    const sana = new Date();
    const oylar = ["January", "February", "March", "April", "May", "June", "July", 
                   "August", "September", "October", "November", "December"];
    const oy = oylar[sana.getMonth()];
    const kun = sana.getDate();



    ota.innerHTML = `
        <img src="./img/havo.png" alt="">
        <h1>${malumot.main.temp}°C</h1>
        <h2>${malumot.name}</h2>
        <div class="harorat">
            <p>Max: ${malumot.main.temp_max}°</p>
            <p>Min: ${malumot.main.temp_min}°</p>
        </div>
        <div class="kun">
            <h3>Today</h3>
            <h3>${oy}, ${kun}</h3>
        </div>
    `;
}

btn.addEventListener("click", fetchWeather);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchWeather();
    }
});

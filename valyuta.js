// Elementlarni olish
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const result = document.getElementById("result");
const toSelect = document.getElementById("to-select");
const fromSelect = document.getElementById("from-select");
const toImg = document.getElementById("to-img");
const fromImg = document.getElementById("from-img");

// API URL'lari va sozlamalari
let api = `https://currency-converter-pro1.p.rapidapi.com/convert`;
const url = "https://currency-converter-pro1.p.rapidapi.com/latest-rates?base=USD";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "3a85454212mshfe09c9b1b69ab49p1aa3e3jsn784737adc563",
    "x-rapidapi-host": "currency-converter-pro1.p.rapidapi.com",
  },
};

// Valyutalar ro'yxatini olish va dropdownlarni to'ldirish
async function getData() {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);

    // Dropdownlarni to'ldirish
    for (const currency in data.result) {
      const optionFrom = document.createElement("option");
      const optionTo = document.createElement("option");

      optionFrom.value = currency;
      optionFrom.innerText = currency;

      optionTo.value = currency;
      optionTo.innerText = currency;

      fromSelect.appendChild(optionFrom);
      toSelect.appendChild(optionTo);
    }

    // Bayroqlarni o'zgartirish
    fromSelect.addEventListener("change", () => {
      fromImg.src = `https://flagcdn.com//${fromSelect.value.slice(0, 2).toLowerCase()}.png`;
    });

    toSelect.addEventListener("change", () => {
      toImg.src = `https://flagcdn.com//${toSelect.value.slice(0, 2).toLowerCase()}.png`;
    });
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    result.innerText = "Valyutalar ro'yxatini olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
  }
}

// Sahifa yuklanganda valyutalarni olish
getData();

// Convert tugmasi bosilganda hisoblash
btn.addEventListener("click", async (e) => {
  e.preventDefault();

  const amount = parseFloat(input.value);

  // Kiritilgan qiymatni tekshirish
  if (isNaN(amount) || amount <= 0) {
    result.innerText = "❗ Iltimos, to'g'ri miqdor kiriting!";
    return;
  }

  try {
    const res = await fetch(
      `${api}?from=${fromSelect.value}&to=${toSelect.value}&amount=${amount}`,
      options
    );
    const data = await res.json();

    // Natijani tekshirish va chiqarish
    if (!data.result) {
      result.innerText = "❗ Valyuta konvertatsiyasi muvaffaqiyatsiz bo'ldi. Qayta urinib ko'ring.";
      return;
    }

    const formattedResult = parseFloat(data.result).toFixed(2);
    result.innerText = `${amount} ${fromSelect.value} = ${formattedResult} ${toSelect.value}`;
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    result.innerText = "❗ Hisoblashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
  }
});

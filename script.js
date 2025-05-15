function checkLogin() {
  const correctUsername = "zoyir";
  const correctPassword = "2008";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  error.textContent = "";

  if (username === "" || password === "") {
    return;
  }

  if (username === correctUsername && password === correctPassword) {
    document.getElementById("loginBox").classList.add("hidden"); // login-box ni yashirish
    document.getElementById("overlay").style.display = "none"; // overlay ni yashirish
  } else {
    error.textContent = "Parol noto‘g‘ri yoki login xato!";
  }
}
async function getData() {
    const javob = await fetch('https://ipinfo.io/json');
    const data = await javob.json();
    console.log(data);
    chizish(data); 
}

const box = document.getElementById('box');
const btn = document.getElementById('btn');

function chizish(malumot) {
    box.innerHTML = `
        <h1>Foydalanuvchi joylashuvini aniqlash</h1>
        <button id="btn">Joylashuvni ko'rsat</button>
        <p>Kenglik: ${malumot.loc.split(',')[0]}</p>
        <p>Uzunlik: ${malumot.loc.split(',')[1]}</p>
        <p>Mamlakat: ${malumot.country}</p>
        <p>Shahar: ${malumot.city}</p>
        <p>IP manzil: ${malumot.ip}</p>
        <p>Internet provayder: ${malumot.org}</p>
        <div id="map">
        <iframe 
    width="100%"
    height="300"
    frameborder="0" style="border: 0; border-radius: 20px;"
    src="https://www.google.com/maps?q=${
        malumot.loc.split(',')[0]
        },${malumot.loc.split(',')[1]}&output=embed" allowfullscreen></iframe>
        </div>
    `;

    const newBtn = document.getElementById('btn');
    newBtn.addEventListener('click', getData);
}

btn.addEventListener('click', getData);


const body = document.getElementsByTagName("body")[0];
const swiperOta = document.getElementById("swiper-container");


swiperOta.addEventListener("swiperslidechange", () => {
    const raqam = swiperOta.swiper.realIndex;
    switch (raqam) {
        case 0:
            body.style =
                "background: linear-gradient(105.54deg, #F4A764 -2.93%, #FFDEC2 72.14%)";
            break;
        case 1:
            body.style =
                "background: linear-gradient(105.54deg, #ADB0B0 -2.93%, #E1E1E1 72.14%)";
            break;
        case 2:
            body.style =
                "background: linear-gradient(105.54deg, #30A357 -2.93%, #75E39A 72.14%)";
            break;
        case 3:
            body.style =
                "background: linear-gradient(105.54deg, #F24F4F -2.93%, #FFA895 72.14%)";
            break;
        default: body.style = "background: linear-gradient(105.54deg, #F4A764 -2.93%, #FFDEC2 72.14%)";
    }
});



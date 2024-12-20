document.querySelector("#btn-reset").addEventListener("click", () => {
  const input = document.querySelector("input");
  input.value = "";
  input.focus();
});

document.querySelector("#search").addEventListener("click", async (event) => {
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input !== "") {
    clearInfo();
    showWarning("Carregando");

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input
      )}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`
    );

    let json = await response.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        description: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      console.log("Não encontramos esta localização.");
    }
  } else {
    clearInfo();
    showWarning("Não encontramos esta localização.");
  }
});

function showInfo(obj) {
  showWarning("");

  document.querySelector(".city").innerHTML =
    `${obj.name}, ${obj.country}.`.toLocaleUpperCase();

  document.querySelector(".celsius").innerHTML = `${obj.temp} <sup>°C</sup>`;
  document.querySelector(
    ".windInfo"
  ).innerHTML = `${obj.windSpeed} <sup>km/h</sup>`;

  document
    .querySelector(".weatherImg img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`
    );

  document.querySelector(".windDot").style.transform = `rotate(${
    obj.windAngle - 90
  }deg)`;

  document.querySelector(".result").style.display = "block";
}

function clearInfo() {
  showWarning("");
  document.querySelector(".result").style.display = "none";
}
function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

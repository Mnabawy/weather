var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;
  const lat = crd.latitude;
  const lon = crd.longitude;
}

function error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}

const getLocationPromise = new Promise(
  (resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function success(pos) {
      {
        const crd = pos.coords;
        lat = crd.latitude;
        lon = crd.longitude;

        resolve({ latitude: lat, longitude: lon });
      }
    });
  },
  error,
  options
);

const url = new URL("https://weather-proxy.freecodecamp.rocks/api/current");

getLocationPromise.then((location) => {
  const params = { lat: location.latitude, lon: location.longitude };

  url.search = new URLSearchParams(params).toString();

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let app = document.getElementById("weather");
      let city = (document.getElementById(
        "city"
      ).innerHTML = `${data.name}, ${data.sys.country}`);
      let desc = (document.getElementById(
        "desc"
      ).innerHTML = `${data.weather[0].main}`);
      let logo = (document.getElementById(
        "logo"
      ).src = `${data.weather[0].icon}`);

      let tempBtn = document.getElementById("tempBtn");

      let temp = data.main.temp;
      let tempreture = (document.getElementById(
        "tempreture"
      ).innerHTML = `${temp}° `);
      tempBtn.innerHTML = "C";
      
      tempBtn.addEventListener("click", convertToFahrenheit);

      //   converting the tempreture
      let tempInCel = data.main.temp;
      let tmpInFeh = (temp * 9) / 5 + 32;
      function convertToFahrenheit() {
        tempBtn.innerHTML = tempBtn.innerHTML == `C` ? `F` : `C`;

        if (tempBtn.innerHTML == "F") {
          temp = tmpInFeh;
          console.log(temp);
        } else if (tempBtn.innerHTML == "C") {
          temp = tempInCel;
          console.log(temp);
        }
        let tempreture = (document.getElementById(
          "tempreture"
        ).innerHTML = `${temp}° `);
      }
    });
});

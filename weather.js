const weather = document.querySelector(".js-weather");
const API_KEY = "";
const COORDS_LS = "coords";

// function getWeather(lat,lng){
//   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
//   ).then(function(response){
//     return response.json();
//   }).then(function(json){
//     const temperature = json.main.temp;
//     const place = json.name;
//     weather.innerText = `${temperature} @ ${place}`;
//   });
// }

function saveCoords(coordsObj){
  localStorage.setItem(COORDS_LS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  getWeather(latitude,longitude);
  saveCoords(coordsObj);
}

function handleGeoError(){
  console.log("Can't access your location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if(loadedCoords === null){
    askForCoords();
  } else {
    // const parsedCoords = JSON.parse(loadedCoords);
    // getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
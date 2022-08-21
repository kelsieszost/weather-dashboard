var APIKey = "b3a39c328c85f0183f77ee0cb31af416";

var cities = [];
var selectedCity;

var searchList = document.getElementById(".history");
var ciySearchHistory = JSON.parse(localStorage.getItem("cities")) || [];

$(document).ready(function() {
    if (cities !==null) {
        cities = ciySearchHistory || [];
    }
});

function storedCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage);
}

$("#searchBtn").on("click", function(event){
    event.preventDefault();
    city = $("#input").val();
    cities = [];
    cities.push(city);
    

    getWeather();
    storedCities();
    cityDisplay()
;}
)

function getWeather(){

    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey
    fetch(weatherUrl)
    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
        currentDay = moment.unix(data.dt).format("l");
        var temperature = data.main.temp;
        temp = ((temperature - 273.15) * 1.80 + 32).toFixed(1);
        windSpeed = data.wind.speed;
        humidity = data.main.humidity;
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" +latitude + "&lon=" +longitude;
        fetch(uvUrl)

    .then(function(response){
        return response.json
    })
    .then(function(data) {
        uvId = data.value;
    }
    )
    })
}

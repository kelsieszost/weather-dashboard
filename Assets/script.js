var APIKey = "b3a39c328c85f0183f77ee0cb31af416";

var cities = [];
var currentCity;

var searchList = document.getElementById("list-of-cities");
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
    showCity()
;}
)

function getWeather(){

    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey
    fetch(weatherUrl)
    .then(function(response) {
        return response.json();
    }
    )
}
var cities = [];
var currentCity;

var tableBody =document.getElementById('history');
var citySearchHistory = JSON.parse(localStorage.getItem(cities)) ||[];

$(document).ready(function(){
    if(cities !== null) {
        cities = citySearchHistory || [];

    }
});

function storedCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage);
}

$("searchBtn").on("click", function(event) {
    event.preventDefault();
    city = $("#userForm").val();
    cities = [];
    cities.push(city);

    getWeather();
    storedCities();
    showCity();
})

function getWeather





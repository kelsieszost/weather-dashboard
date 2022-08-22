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
    weatherSearch();
    storedCities();
    cityDisplay()
;}
)

function weatherSearch(){

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

    
    })
    })
}

function weatherDisplay() {
    var weather = $("#todaysForecast");
    var weatherHeader = $("<div class = 'container'>")
    var weatherdiv = $("<div class = 'container'>")

    console.log(city);

    var cityEl = $("<h3>");
    cityEl.text(city);
    weather.empty();
    dateEl = $('<h3>').text(currentDate.toString());
    console.log(dateEl);

    var tempEL = $("<p>").text("Temperature: " +tempF + "F");
    $("#todaysForecast").append(weatherdiv);
    console.log(tempEl);
}

function cityDisplay(){
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    var ulEl = document.createElement("ul");
    ulEl.classList.add("list-unstyled");
    ulEl.classList.add("w-100");

    for(var i = 0; i < storedCities.length; i++){
        
        var liEl = document.createElement("li");
        liEl.innerHTML = "<button type='button' class='list-group-item list-group-item-action' attr='"+cities[i]+"'>" + cities[i] + "</button>";
        ulEl.appendChild(liEl);
    }
        searchList.appendChild(ulEl); 
    
};
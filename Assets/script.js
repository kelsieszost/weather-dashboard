// Set Variables

var APIKey = "b3a39c328c85f0183f77ee0cb31af416";

let cityName = document.querySelector(".city-name");
let date = document.querySelector(".date");
let temp = document.querySelector(".temp");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let uvIndex = document.querySelector(".uv-index");
let icon = document.querySelector(".icon");
let forecast = document.querySelector(".five-day-forecast");
let searchBtn = document.querySelector(".search-btn");
let cityBtn = document.querySelector(".city-btn");
let cities = JSON.parse(localStorage.getItem("cities")) || [];

// stores users search history into local storage 
function searchHistory() {
    let cityList = localStorage.getItem("cities");
    if (cityList) {
        cities = JSON.parse(cityList);
        console.log(cities);
        return cities();
    }
}

function getCity(event) {
    event.preventDefault();
    let citySearch = document.querySelector(".city-search").value;
    document.getElementById("citySearch").value= "";
    saveCitySearch(citySearch)
}

// $("#searchBtn").on("click", function(event){
//     event.preventDefault();
//     city = $("#input").val();
//     cities = [];
//     cities.push(city);
//     weatherSearch();
//     storedCities();
//     cityDisplay()
// ;}
// )

function weatherSearch(citySearch){
    let city = citySearch.target || citySearch;
    city = citySearch.target ?
        city.getAttribute("data-city") : citySearch;
        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey
    fetch (weatherUrl)
        .then(response => response.json())
        .then(data => {
            let name = data["name"];
            let currentDate = moment.unix(data.dt).format("l");
            let weatherIcon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            let options = {date};
            let windValue = data["wind"]["speed"];
            let tempValue = data["main"]["temp"];
            let humidityValue = data["main"]["humidity"];
            city.name.innerHTML = name;
            date.innerHTML = currentDate;
            weatherIcon.innerHTML = weatherIcon;
            temp.innerHTML = "Temperature: ${tempValue} + degrees F ";
            humidity.innerHTML = "Humidity: ${humidityValue} + %";
            weatherIcon.setAttribute("src", weatherIcon);
            GeolocationCoordinates(city);
        })

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
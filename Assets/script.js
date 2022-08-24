var APIKey = "b3a39c328c85f0183f77ee0cb31af416";

var cityName = document.getElementById("cityName");
var date = document.getElementById("date");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvIndex = document.getElementById("uvIndex");
var icon = document.getElementById("icon");
var forecast = document.getElementById(".fiveDay");
var searchBtn = document.querySelector(".search-btn");
var cityBtn = document.querySelector(".city-btn");
var cities = JSON.parse(localStorage.getItem("cities")) || [];

// stores users search history into local storage 
function searchHistory() {
    // let cityList = localStorage.getItem("cities");
    // if (cityList) {
    //     cities = JSON.parse(cityList);
    //     console.log(cities);
    //     console.log("SearchHistory Function was Run")
    //     return cities;
    // }
    console.log(cities);
}

// retrieves value of city-search by class/value.
function getCity(event) {
    event.preventDefault();
    let citySearch = document.querySelector(".city-search").value;
    document.getElementById("citySearch").value= "";
    saveCitySearch(citySearch);
    weatherSearch(citySearch);
};


//retrives data from API 
function weatherSearch(citySearch) {
    let city = citySearch.target || citySearch;
    city = citySearch.target ?
        city.getAttribute("data-city") : citySearch;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            let nameValue = data["name"];
            let currentDate = moment.unix(data.dt).format("l");
            let weatherIcon = 'https://openweathermap.org/img/w/' + data.weather[0].icon + ".png";
            let options = {date};
            let windValue = data["wind"]["speed"];
            let tempValue = data["main"]["temp"];
            let humidityValue = data["main"]["humidity"];
            cityName.innerHTML = nameValue;
            date.innerHTML = currentDate;
            weatherIcon.innerHTML = weatherIcon;
            temp.innerHTML = tempValue + "°F";
            humidity.innerHTML = humidityValue + "% Humidity";
            icon.setAttribute("src", weatherIcon);
            getCoordinates(city);
        })
};

function getCoordinates(citySearch) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            let lat = data.coord.lat;
            let lon = data.coord.lon;
                getUVI(lat, lon);
                showFiveDay(lat, lon);
                })
        };

    function getUVI(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/uvi?&appid=${APIKey}&lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,daily,alerts`)
            .then(response => response.json())
            .then(data => {
                let uviValue = data.value;
                    if (uviValue < 2) {
                        uvIndex.setAttribute('class', 'low');
                    }
                    else if (uviValue < 5) {
                        uvIndex.setAttribute('class', 'moderate')
                    }
                    else if (uviValue < 7) {
                        uvIndex.setAttribute('class', 'high');
                    }
                    else if (uviValue < 10) {
                        uvIndex.setAttribute('class', 'very-high');
                    }
                    else {
                        uvIndex.setAttribute('class', 'extreme')
                    }
                    uvIndex.innerHTML = `UV Index: ${uviValue}`;
                })
        };
    function showFiveDay(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?&lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${APIKey}`)
            .then(function(response){
                return response.json();
                })
            .then(function(data){
                $("#fiveDay").html("");
                var fiveDayForecast = data.list;
                   for (let i = 0; i < 5; i++) {
                    futureDate = moment().add(i, 'days').format("l");
                    console.log(data);
                    console.log(data.list[i].weather[0].icon);
                    futureConditionsIcon =  data.list[i].weather[0].icon;
                    futureConditionsIconEl = "http://openweathermap.org/img/w/"+ futureConditionsIcon + ".png";
                    futureHumidity = fiveDayForecast[i].main.humidity;
                    var futureTempVal = fiveDayForecast[i].main.temp;
                    tempF = futureTempVal;
                    futureWindSpeed = fiveDayForecast[i].wind.speed;
                
                
                
                    var card = $("<div class='card'>").addClass("forecast");
                    var cardDiv = $("<div>").attr("class", "card-block");
                    var TitleHeader = $("<h6>").text(futureDate).addClass("pt-2");
                    var TitleDiv = $("<div>").attr("class", "card-block");
                    var TextDiv = $("<div>").attr("class", "card-text");
                    var imgEl = $("<img>").attr("src", futureConditionsIconEl);  
                    var TempEl = $("<p>").text("Temp: " + tempF + " ºF").css("font-size", "10px");
                    var WindEl = $("<p>").text("Wind: " + futureWindSpeed + "%").css("font-size", "10px");
                    var HumidityEl = $("<p>").text("Humidity: " + futureHumidity + "%").css("font-size", "10px");
                
                    
                    TitleDiv.append(TitleHeader);
                    cardDiv.append(TitleDiv);
                    TextDiv.append(imgEl);
                    TextDiv.append(TempEl);
                    TextDiv.append(WindEl);
                    TextDiv.append(HumidityEl);
                    card.append(cardDiv);
                    cardDiv.append(TextDiv);
                    $(".five-day-forecast").append(card);
                
                
                  
                }
                
                FutureHeader = $("<h4>").text("Five Day Forecast:").attr("id", "card-deck-title");
                FutureHeader.addClass("futureforecast");
                $(".header").append(FutureHeader);
                  }
                    
                )};
                

    function saveCitySearch(citySearch) {
        if (!cities.includes(citySearch)) {
        cities.push(citySearch);
        }
        localStorage.setItem('cities', JSON.stringify(cities));
        renderCities();
        console.log(cities);
    }

    function renderCities() {
    cityBtn.textContent = '';
    console.log(cities);
    if (cities.length > 5) {
        cities = cities.slice(cities.length - 5);  
    }
    // cities = cities.slice(cities.length - 5);
    console.log(cities.length);
    cities.forEach(city => {
        let btn = document.createElement('button');
        cityBtn.prepend(btn);
        btn.setAttribute('class', 'btn btn-outline-secondary btn-block');
        btn.setAttribute('data-city', city);

        btn.innerHTML = city;
    })
}

searchBtn.addEventListener('click', getCity);
cityBtn.addEventListener('click', weatherSearch);
renderCities();
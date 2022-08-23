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
    saveCitySearch(citySearch)
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
            function getFiveDay(lat, lon) {
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${APIKey}`)
                    .then(response => response.json())
                    .then(data => {
                        forecastContainer.innerHTML = "";
                        data.daily.forEach((day, index) => {
                            if (index === 0 || index > 5) {
                                return;
                            };
                            let forecastDate = currentDate(day.dt * 1000);
                            let options = { date };
                            let forecastIcon = 'https://openweathermap.org/img/w/' + day.weather[0].icon + '.png';
                            let forecastIconDescription = day.weather[0].description || weather[0].main;
                            let forecastTemp = day.temp.day;
                            let forecastWind = day.wind_speed;
                            let forecastHumidity = day.humidity;
                            let forecastCard = document.createElement('div');
                            let cardDate = document.createElement('h3');
                            let cardIcon = document.createElement('img');
                            let cardTemp = document.createElement('p');
                            let cardWind = document.createElement('p');
                            let cardHumidity = document.createElement('p');
                            forecastContainer.append(forecastCard);
                            forecastCard.setAttribute('class', 'card');
                            forecastCard.setAttribute('class', 'my-card');
                            cardIcon.setAttribute('src', forecastIcon);
                            cardIcon.setAttribute('alt', forecastIconDesc);
                            cardIcon.setAttribute('class', 'card-icon');
                            forecastCard.append(cardDate);
                            forecastCard.append(cardIcon);
                            forecastCard.append(cardTemp);
                            forecastCard.append(cardWind);
                            forecastCard.append(cardHumidity);
                            cardDate.innerHTML = currentDate('en-US', options).format(forecastDate);
                            cardIcon.innerHTML = forecastIcon;
                            cardTemp.innerHTML = `Temperature: ${forecastTemp}°`;
                            cardWind.innerHTML = `Wind: ${forecastWind} mph`;
                            cardHumidity.innerHTML = `Humidity: ${forecastHumidity}%`;
                        })
                    })
                }};

function saveCitySearch(citySearch) {
    if (!cities.includes(citySearch)) {
        cities.push(citySearch);
    }
    localStorage.setItem('cities', JSON.stringify(cities));
    renderCities();
    console.log(cities);
}

// renders the past city names to buttons
function renderCities() {
    cityBtn.textContent = '';
    // cities = cities.slice(Math.max(cities.length - 5, 0));
    console.log(cities);
    cities = cities.slice(cities.length - 5);
    console.log(cities.length);
    cities.forEach(city => {
        let btn = document.createElement('button');
        cityBtn.prepend(btn);
        btn.setAttribute('class', 'btn btn-outline-secondary btn-block');
        btn.setAttribute('data-city', city);

        btn.innerHTML = city;
    })
}

// event listeners
searchBtn.addEventListener('click', getCity);
cityBtn.addEventListener('click', () => weatherSearch(event));
renderCities();
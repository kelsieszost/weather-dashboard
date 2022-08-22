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
};

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
            city.name.innerHTML = name;
            date.innerHTML = currentDate;
            weatherIcon.innerHTML = weatherIcon;
            temp.innerHTML = "Temperature: ${tempValue} + degrees F ";
            humidity.innerHTML = "Humidity: ${humidityValue} + %";
            weatherIcon.setAttribute("src", weatherIcon);
            getCoordinates(city);
        })
};

function getCoordinates(citySearch) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=imperial&appid=${API}`)
        .then(response => response.json())
        .then(data => {
            let lat = data.coord.lat;
                let lon = data.coord.lon;
                getUVI(lat, lon);
                getFiveDay(lat, lon);
                })
        };

        function getUVI(lat, lon) {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,daily,alerts&appid=${APIKey}`)
                .then(response => response.json())
                .then(data => {
                    let uviValue = data['current']['uvi'];
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
    cities = cities.slice(Math.max(cities.length - 5, 0));
    cities.forEach(city => {
        let btn = document.createElement('button');
        cityBtn.prepend(btn);
        btn.setAttribute('class', 'btn btn-outline-secondary btn-block');
        btn.setAttribute('data-city', city);

        btn.innerHTML = city;
    })
}

// event listeners
searchBtn.addEventListener('click', getCityName);
cityBtn.addEventListener('click', () => weatherSearch(event));
init();
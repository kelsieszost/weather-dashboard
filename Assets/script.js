var APIKey = "b3a39c328c85f0183f77ee0cb31af416";

function addResult(){

    formInput = document.getElementById("input").value;  
    searchHistory = getInfo();
    var searchCity =$("<div>") 
    searchCity.attr('id',formInput) 
    searchCity.text(formInput) 
    searchCity.addClass("h3")

    
    if (historyList.includes(formInput) === false){
        $(".history").append(searchCity)
    }
    $(".subtitle").attr("style","display:inline")
    addInfo(formInput);
    
}; 

$(".history").on('click', function(event){
    event.preventDefault();
    $(".subtitle").attr("style","display:inline")
     document.getElementById("input").value =  event.target.id;
    getResult(); 
});

document.getElementById("searchBtn").addEventListener("click", addResult);
document.getElementById("searchBtn").addEventListener('click', getResult);

function getResult(){   

    $(".five-day").empty();
    $(".city").empty()

   inputCity = document.getElementById("input").value;   
    var countryCode='US';    
    var cityCode=inputCity;       
    
    var geoLon;   
    var geoLat;
        
    var cityName =$("<h>")    
    cityName.addClass("h3")  
    var temp = $("<div>")    
    var wind = $("<div>")    
    var humidity = $("<div>")   
    var uvIndex = $("<div>")  
    var icon =$("<img>")
    icon.addClass("icon");    
    var dateTime = $("<div>")

    $(".city").addClass("list-group")
    $(".city").append(cityName)    
    $(".city").append(dateTime)    
    $(".city").append(icon)    
    $(".city").append(temp)    
    $(".city").append(wind)    
    $(".city").append(humidity)    
    $(".city").append(uvIndex)
    
    
    var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityCode + "," + countryCode + "&limit=5&appid=b3a39c328c85f0183f77ee0cb31af416"
    fetch(geoUrl)
    
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      geoLon = data[0].lon;
      geoLat = data[0].lat;

      var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + "&lon="+ geoLon + "&exclude=minutely,hourly,alerts&units=imperial&appid=b3a39c328c85f0183f77ee0cb31af416";
        
      fetch(weatherUrl)

      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data)
        
        weatherIcon= data.current.weather[0].icon;
        imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
        icon.attr('src',imgSrc)
    
        cityName.text(cityCode);
        //translate utc to date
        var date = new Date(data.current.dt * 1000);
        dateTime.text("("+ (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");

        temp.text("Temperature: "+ data.current.temp + " F");
        humidity.text("Humidity: " + data.current.humidity + " %");
        wind.text("Wind Speed: " + data.current.wind_speed + " MPH");

   
        var uvi =$("<div>")
        uvIndex.text("UV Index: ");
        uvi.text(data.current.uvi)
        uvIndex.append(uvi)
        uvIndex.addClass("d-flex")
        
        if (data.current.uvi < 3){
            uvi.attr("style","background-color:green; color:black; margin-left: 5px")
        } else if (data.current.uvi < 6){
            uvi.attr("style","background-color:yellow; color:black; margin-left: 5px")
        } else if (data.current.uvi < 8){
            uvi.attr("style","background-color:orange; color:black; margin-left: 5px")
        } else if (data.current.uvi < 11) {
            uvi.attr("style","background-color:red; color:black; margin-left: 5px")
        } else {
            uvi.attr("style","background-color:purple; color:black; margin-left: 5px")
        }

 
        for (var i=1;i<6;i++){

            var mainContainer = $("<div>")
            this["futureDate"+i] = $("<h>")
            this["futureIcon"+i] = $("<img>")
            this["futureTemp"+i] = $("<div>")
            this["futureWind"+i] = $("<div>")
            this["futureHumidity"+i] = $("<div>")

            this["forecastDay"+i] = new Date(data.daily[i].dt * 1000);     
 
            (this["futureDate"+i]).text(((this["forecastDay"+i]).getMonth()+1) + "/" + (this["forecastDay"+i]).getDate() + "/" + (this["forecastDay"+i]).getFullYear());
            (this["futureTemp"+i]).text("Temperature: "+ data.daily[i].temp.day + " F");
            (this["futureWind"+i]).text("Wind: "+ data.daily[i].wind_speed+ " MPH");
            (this["futureHumidity"+i]).text("Humidity: " + data.daily[i].humidity + " %");
            (this["weatherIcon"+i])= data.daily[i].weather[0].icon;
    
            DateimgSrc = "https://openweathermap.org/img/wn/" + (this["weatherIcon"+i]) + ".png";  
            (this["futureIcon"+i]).attr('src',DateimgSrc)

            $(".five-day").append(blueContainer)
            mainContainer.append((this["futureDate"+i]));
            mainContainer.append((this["futureIcon"+i]));
            mainContainer.append((this["futureTemp"+i]));
            mainContainer.append((this["futureWind"+i]));
            mainContainer.append((this["futureHumidity"+i]));

            mainContainer.addClass("weather-deck")
        }

      })
})
}


function getInfo() {
var currentList =localStorage.getItem("city");
if (currentList !== null ){
    newList = JSON.parse(currentList);
    return newList;
} else {
    newList = [];
}
return newList;
}

function addInfo (n) {
var addedList = getInfo();

if (searchHistory.includes(formInput) === false){
    addedList.push(n);
}

localStorage.setItem("city", JSON.stringify(addedList));
};

function renderInfo () {
var searchHistory = getInfo();
for (var i = 0; i < searchHistory.length; i++) {
    var formInput = searchHistory[i];
    var searchCity =$("<div>") 
    searchCity.attr('id',formInput) 
    searchCity.text(formInput) 
    searchCity.addClass("h4")

    $(".history").append(searchCity)
}
};

renderInfo();
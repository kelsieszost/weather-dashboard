var APIKey = "b3a39c328c85f0183f77ee0cb31af416";

varcities = [];
var currentCity;

var tableBody = document.getElementById("list-of-cities");
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

//defines searchHistory as an empty array so it can be pushed to and pulled from
let searchHistory = []

//finds the searched city's latitude and longitude to use in the second API
function findCity(city, stateCode) {
    const cityQuery = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},USA&limit=1&appid=536d3994e8038da0e188300d00649ced`

    fetch(cityQuery)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            if (data.Error) {
                $("#falseSearchText").text("No Results Found")
                return;
            }
            else {
                const cityLatitude = data[0].lat
                const cityLongitude = data[0].lon
                console.log(cityLatitude)
                //calls second API using lat/long data
                findWeather(cityLatitude, cityLongitude)
                const cityDisplay = data[0].name
                $("#cityNameDisplay").text(cityDisplay);
            }

            //pushes city name and state into local history so it can be called again for the buttons
            searchHistory.push({
                cityName: city, state: stateCode,
              })
              localStorage.setItem("citySave", JSON.stringify(searchHistory))
        })
}

//uses latitude and longitude to find the city's weather data
function findWeather(lat, lon) {
    const weatherQuery = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=536d3994e8038da0e188300d00649ced`
    fetch(weatherQuery)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            //displays the current date in the top box
            const Date = moment().format('LL');

            //lines 47-125: displays searched data
            //Todo: consolidate this with for loops
            $("#dateDisplay").text(Date);
            $("#temperatureDisplay").text("Temperature: " + data.current.temp + " °F");
            $("#humidityDisplay").text("Humidity: " + data.current.humidity + " %")
            $("#windSpeedDisplay").text("Wind speed: " + data.current.wind_speed + " mph")
            $("#UVIndexDisplay").text("UV Index: " + data.current.uvi)

            if ((parseInt(data.current.clouds))<25){
                $("#iconDisplay").addClass("fa-solid fa-sun");
            } else if ((parseInt(data.current.clouds))>75){
                $("#iconDisplay").addClass("fa-solid fa-cloud");
            } else {
                $("#iconDisplay").addClass("fa-solid fa-cloud-sun");
            }

            $("#dayOneDate").text(moment().add(1, 'days').format('LL'))
            $("#dayOneIcon").text()
            $("#dayOneTemp").text("Day Temperature: " + data.daily[0].temp.day + " °F")
            $("#dayOneHumid").text("Humidity: " + data.daily[0].humidity + "%")
            $("#dayOneWind").text("Wind Speed: " + data.daily[0].wind_speed + " mph")

            if ((parseInt(data.daily[0].clouds))<25){
                $("#dayOneIcon").addClass("fa-solid fa-sun");
            } else if ((parseInt(data.daily[0].clouds))>75){
                $("#dayOneIcon").addClass("fa-solid fa-cloud");
            } else {
                $("#dayOneIcon").addClass("fa-solid fa-cloud-sun");
            }

            $("#dayTwoDate").text(moment().add(2, 'days').format('LL'))
            $("#dayTwoTemp").text("Day Temperature: " + data.daily[1].temp.day + " °F")
            $("#dayTwoHumid").text("Humidity: " + data.daily[1].humidity + "%")
            $("#dayTwoWind").text("Wind Speed: " + data.daily[1].wind_speed + " mph")

            if ((parseInt(data.daily[1].clouds))<25){
                $("#dayTwoIcon").addClass("fa-solid fa-sun");
            } else if ((parseInt(data.daily[1].clouds))>75){
                $("#dayTwoIcon").addClass("fa-solid fa-cloud");
            } else {
                $("#dayTwoIcon").addClass("fa-solid fa-cloud-sun");
            }

            $("#dayThreeDate").text(moment().add(3, 'days').format('LL'))
            $("#dayThreeTemp").text("Day Temperature: " + data.daily[2].temp.day + " °F")
            $("#dayThreeHumid").text("Humidity: " + data.daily[2].humidity + "%")
            $("#dayThreeWind").text("Wind Speed: " + data.daily[2].wind_speed + " mph")

            if ((parseInt(data.daily[2].clouds))<25){
                $("#dayThreeIcon").addClass("fa-solid fa-sun");
            } else if ((parseInt(data.daily[2].clouds))>75){
                $("#dayThreeIcon").addClass("fa-solid fa-cloud");
            } else {
                $("#dayThreeIcon").addClass("fa-solid fa-cloud-sun");
            }

            $("#dayFourDate").text(moment().add(3, 'days').format('LL'))
            $("#dayFourTemp").text("Day Temperature: " + data.daily[3].temp.day + " °F")
            $("#dayFourHumid").text("Humidity: " + data.daily[3].humidity + "%")
            $("#dayFourWind").text("Wind Speed: " + data.daily[3].wind_speed + " mph")

            if ((parseInt(data.daily[3].clouds))<25){
                $("#dayFourIcon").addClass("fa-solid fa-sun");
            } else if ((parseInt(data.daily[3].clouds))>75){
                $("#dayFourIcon").addClass("fa-solid fa-cloud");
            } else {
                $("#dayFourIcon").addClass("fa-solid fa-cloud-sun");
            }

            $("#dayFiveDate").text(moment().add(4, 'days').format('LL'))
            $("#dayFiveTemp").text("Day Temperature: " + data.daily[4].temp.day + " °F")
            $("#dayFiveHumid").text("Humidity: " + data.daily[4].humidity + "%")
            $("#dayFiveWind").text("Wind Speed: " + data.daily[4].wind_speed + " mph")

            if ((parseInt(data.daily[4].clouds))<25){
                $("#dayFiveIcon").addClass("fa-solid fa-sun");
            } else if ((parseInt(data.daily[4].clouds))>75){
                $("#dayFiveIcon").addClass("fa-solid fa-cloud");
            } else {
                $("#dayFiveIcon").addClass("fa-solid fa-cloud-sun");
            }

            //calls getHistory function
            getHistory()  
        })
}

//takes search history and uses it to make the search-again buttons
function getHistory() {
    const history = localStorage.getItem("citySave");
    searchHistory = JSON.parse(history) || [];
    makeBttns(searchHistory)
}

//Adds a button with the name of a searched city
function makeBttns(searchHistory) {
    $("#buttonSix").text(searchHistory[0].cityName)
    $("#buttonSix").show()
    $("#buttonSix").addClass("btn btn-primary")
    $("#buttonFive").text(searchHistory[1].cityName)
    $("#buttonFive").show()
    $("#buttonFive").addClass("btn btn-primary")
    $("#buttonFour").text(searchHistory[2].cityName)
    $("#buttonFour").show()
    $("#buttonFour").addClass("btn btn-primary")
    $("#buttonThree").text(searchHistory[3].cityName)
    $("#buttonThree").show()
    $("#buttonThree").addClass("btn btn-primary")
    $("#buttonTwo").text(searchHistory[4].cityName)
    $("#buttonTwo").show()
    $("#buttonTwo").addClass("btn btn-primary")
    $("#buttonOne").text(searchHistory[5].cityName)
    $("#buttonOne").show()
    $("#buttonOne").addClass("btn btn-primary")
}

//Activates search-again buttons
$("#buttonSix").click(function(){
    findCity(searchHistory[0].cityName, searchHistory[0].state)
})
$("#buttonFive").click(function(){
    findCity(searchHistory[1].cityName, searchHistory[1].state)
})
$("#buttonFour").click(function(){
    findCity(searchHistory[2].cityName, searchHistory[2].state)
})
$("#buttonThree").click(function(){
    findCity(searchHistory[3].cityName, searchHistory[3].state)
})
$("#buttonTwo").click(function(){
    findCity(searchHistory[4].cityName, searchHistory[4].state)
})
$("#buttonOne").click(function(){
    findCity(searchHistory[5].cityName, searchHistory[5].state)
})

//Hides the search-again buttons until a search is made
$("#buttonOne").hide()
$("#buttonTwo").hide()
$("#buttonThree").hide()
$("#buttonFour").hide()
$("#buttonFive").hide()
$("#buttonSix").hide()

//Activates search when the search button is clicked
  $("#searchBtn").click(function (event) {
    event.preventDefault();
    const cityInput = $("#city-input").val();
    const stateInput = $("#state-input").val();
    findCity(cityInput, stateInput);
})
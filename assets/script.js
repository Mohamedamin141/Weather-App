var searchInput = document.getElementById("Search-input");
var searchButton = document.querySelector("#Search-btn");
var apiKey = "6060d55d954b8204ad09c74faed48885"
// var weatherIcon = " https://openweathermap.org/img/wn/10d@2x.png";
function getWheather(){
    // var ApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&limit=1&appid=${apiKey}&units=metric`;
  var city = searchInput.value.trim();
  if(!city) return;
  console.log(city)
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(Response => Response.json()).then(data => {
    console.log(data);
    displayCurrentWheather(data)
  }).catch(()=>{
    alert("Fetch Error")
  })

  
}

function getForecast(){
  var city = searchInput.value.trim();
  if(!city) return;
  console.log(city)
  
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
  .then(Response => Response.json()).then(data => {
    console.log(data);
    displayForecast(data)
  }).catch(()=>{
    alert("Fetch Error. forecast")
  })
}


var todayDate = dayjs();

function displayForecast(data){
  

  document.querySelector(".forecast-city1").innerHTML= data.city.name + data.list[7].dt_txt.split(" ")[0];
  document.querySelector(".temp-1").innerHTML= "Temp"+ ":"+  data.list[7].main.temp + "°C";
  document.querySelector(".wind-1").innerHTML= "Wind"+ ":"+ data.list[7].wind.speed + "km/h";
  document.querySelector(".hum-1").innerHTML= "Humidity"+ ":"+ data.list[7].main.humidity + "%";


  document.querySelector(".forecast-city2").innerHTML= data.city.name + data.list[15].dt_txt.split(" ")[0];
  document.querySelector(".temp-2").innerHTML= "Temp"+ ":"+  data.list[15].main.temp + "°C";
  document.querySelector(".wind-2").innerHTML= "Wind"+ ":"+ data.list[15].wind.speed + "km/h";
  document.querySelector(".hum-2").innerHTML= "Humidity"+ ":"+ data.list[15].main.humidity + "%";


  document.querySelector(".forecast-city3").innerHTML= data.city.name + data.list[24].dt_txt.split(" ")[0];
  document.querySelector(".temp-3").innerHTML= "Temp"+ ":"+  data.list[24].main.temp + "°C";
  document.querySelector(".wind-3").innerHTML= "Wind"+ ":"+ data.list[24].wind.speed + "km/h";
  document.querySelector(".hum-3").innerHTML= "Humidity"+ ":"+ data.list[24].main.humidity + "%";

  document.querySelector(".forecast-city4").innerHTML= data.city.name + data.list[33].dt_txt.split(" ")[0];
  document.querySelector(".temp-4").innerHTML= "Temp"+ ":"+  data.list[33].main.temp + "°C";
  document.querySelector(".wind-4").innerHTML= "Wind"+ ":"+ data.list[33].wind.speed + "km/h";
  document.querySelector(".hum-4").innerHTML= "Humidity"+ ":"+ data.list[33].main.humidity + "%";


  document.querySelector(".forecast-city5").innerHTML= data.city.name + data.list[39].dt_txt.split(" ")[0];
  document.querySelector(".temp-5").innerHTML= "Temp"+ ":"+  data.list[39].main.temp + "°C";
  document.querySelector(".wind-5").innerHTML= "Wind"+ ":"+ data.list[39].wind.speed + "km/h";
  document.querySelector(".hum-5").innerHTML= "Humidity"+ ":"+ data.list[39].main.humidity + "%";



  let forecastElements = ['.day1', '.day2', '.day3', '.day4', '.day5'];

  for (let i = 0; i < forecastElements.length; i++) {
    // Get the icon code from the data
    let iconCode = data.list[i * 8].weather[0].icon;
    // Create an img element and set its src attribute to the URL of the icon
    let iconImg = document.createElement('img');
    iconImg.src = `http://openweathermap.org/img/w/${iconCode}.png`;
    // Append the img element to the forecast card
    document.querySelector(forecastElements[i]).appendChild(iconImg);
  }

}


function displayCurrentWheather(data){
document.querySelector("#side-display").style.display ="block"
  document.querySelector(".name-city").innerHTML= data.name + todayDate.format("( YYYY /MM /DD)");
  document.querySelector(".today-temp").innerHTML= "Temp"+ ":"+ data.main.temp + "°C";
  document.querySelector(".today-wind").innerHTML= "Wind" + ":"+ data.wind.speed + "km/h";
  document.querySelector(".today-hum").innerHTML= "Humidity" + ":"+ data.main.humidity + "%";


  let iconCode = data.weather[0].icon;
  let iconImg = document.createElement('img');
  iconImg.classList.add("weather-img");
  iconImg.src = `http://openweathermap.org/img/w/${iconCode}.png`;
  document.querySelector('.today-temp').appendChild(iconImg);

}


// ;




// Function to add a city to the search history
function addToSearchHistory() {
  var city = searchInput.value.trim();
  // Get the current search history from local storage
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  // Add the new city to the search history
  searchHistory.push(city);
  // Store the updated search history in local storage
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  // Update the search history buttons
  updateSearchHistoryButtons();
}

// Function to update the search history buttons
function updateSearchHistoryButtons() {
  var city = searchInput.value.trim();
  // Get the current search history from local storage
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  // Get the container for the search history buttons
  let container = document.querySelector('#Search-history');
  // Clear the current buttons
  container.innerHTML = '';
  // Create a new button for each city in the search history
  for (let city of searchHistory) {
      let btn = document.createElement('button');
      btn.textContent = city;
      btn.classList.add("Search-h3")
      btn.addEventListener('click', function(event) {
        event.preventDefault();
          getWheather(city);
          getForecast(city);
      });
      container.appendChild(btn);
  }
}

// Modify your form submission event listener to add the searched city to the search history
searchButton.addEventListener("click",function(event){
event.preventDefault();
var city = searchInput.value.trim();
getWheather();
getForecast();
addToSearchHistory(city); 
});

// Call updateSearchHistoryButtons when the page loads to create buttons for cities in the search history

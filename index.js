const apiKey = "f461fa712d6891df888dbe769e97e976";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

 //first call geoCoderAPI to get longitude and lattitude 
async function getWeatherByCity(cityName){
    
    const geoCoderAPICall = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=3&appid=${apiKey}`;
    
    //fetching the latitude and logitude of the city in the search Box
    const response = await fetch(geoCoderAPICall);
    let latAndLonData = await response.json();


    console.log(latAndLonData);
    //condition to check whether the city exists or not
    if (Object.entries(latAndLonData).length === 0) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
              
    }
    else{

    
    

    let latitude = latAndLonData[0].lat;
    let longitude = latAndLonData[0].lon;
    const getWeatherAPICall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    //Making the API call to fetch the weather details
    const weatherResponse = await fetch(getWeatherAPICall)

    //all weather data to store in JSON format in this object
    let weatherData = await weatherResponse.json();
    
    


    document.querySelector(".card .weather .temp").style.visibility = 'visible'
    weatherIcon.style.visibility = 'visible'
    document.querySelector(".wind").style.visibility = 'visible'
    document.querySelector(".humidity").style.visibility = 'visible'   
  
    document.querySelector(".city").innerHTML = weatherData.name + ","+latAndLonData[0].name;
    document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%";
    document.querySelector(".wind").innerHTML = weatherData.wind.speed + "km/hr";

    if(weatherData.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(weatherData.weather[0].main == "Clear"){
        weatherIcon.src =  "images/clear.png";
    }
    else if(weatherData.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
    }
    else if(weatherData.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png"
    }
    else if(weatherData.weather[0].main == "Mist"){
         weatherIcon.src = "images/mist.png"
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

}
    
}

searchBtn.addEventListener("click", ()=>{
    getWeatherByCity(searchBox.value);
})

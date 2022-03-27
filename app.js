const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyparser.urlencoded({ extended: true }));

let city = "CITY";
let temp = "N/A";
let weathericon = "https://thumbs.dreamstime.com/b/error-isolated-icon-black-background-error-isolated-icon-black-background-simple-vector-logo-161462018.jpg";
let country = "COUNTRY";
let min = "N/A";
let max = "N/A";
let feel = "N/A";
let humidity = "N/A";
let pressure = "N/A";
let windspeed = "N/A";
let errror=[];
app.get("/", function (req, res) {
  res.render("index", {
    //  weather: null,error:null
    icons: weathericon,
    citys: city,
    countrys: country,
    tempo: temp,
    mint: min,
    maxt: max,
    feels: feel,
    press: pressure,
    humid: humidity,
    speed: windspeed,
    error:errror
  });
});

app.post("/", function (req, res) {
  city = req.body.cityName;
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q="+city +"&units=metric&appid=732651d0547abc17492c835d6eb978a7";
  // request(url,function(err,response,data){
  https.get(url, function ( response) {
    response.on("data", function (data) {
      console.log(response.statusCode);
      const weather = JSON.parse(data);
      if(response.statusCode===200){
       
        console.log(weather);
        // const status=weather.cod;
        // console.log(status);
       errror=[];
        weathericon ="https://openweathermap.org/img/wn/" +weather.weather[0].icon +"@2x.png";
        city = weather.name;
        country = weather.sys.country;
        temp = weather.main.temp;
        min = weather.main.temp_min;
        max = weather.main.temp_max;
        feel = weather.main.feels_like;
        pressure = weather.main.pressure;
        humidity = weather.main.humidity;
        windspeed = weather.wind.speed;
        res.render("index", {
          icons: weathericon,
          citys: city,
          countrys: country,
          tempo: temp,
          mint: min,
          maxt: max,
          feels: feel,
          press: pressure,
          humid: humidity,
          speed: windspeed,
          error:errror
        });
      }
      else{

         city = "CITY";
        temp = "N/A";
        weathericon = "https://thumbs.dreamstime.com/b/error-isolated-icon-black-background-error-isolated-icon-black-background-simple-vector-logo-161462018.jpg";
         country = "COUNTRY";
         min = "N/A";
         max = "N/A";
         feel = "N/A";
        humidity = "N/A";
         pressure = "N/A";
         windspeed = "N/A";
errror=[];
         console.log("ERROR");
        errror.push("ERROR: "+weather.message+"!");
        res.render("index", {
          icons: weathericon,
          citys: city,
          countrys: country,
          tempo: temp,
          mint: min,
          maxt: max,
          feels: feel,
          press: pressure,
          humid: humidity,
          speed: windspeed,
          error:errror
        });
      }
   
      });
    
  });
});

app.listen(3000, function () {
  console.log("Server is running at port 3000");
});

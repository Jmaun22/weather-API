var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var refreshButton = document.querySelector('#refresh');

/* ----------------------- SVGAnimateMotionElement.js ----------------------- */
 // Use Moment.js to display time


 window.setInterval(function () {
  var today = moment();
  $("#date").text(today.format("dddd, MMMM Do YYYY"));
  var new_date_one = moment(today, "DD-MM-YYYY").add(1, 'days');

  $("#date-day1").text(new_date_one.format("dddd, MMMM Do YYYY"));

  var new_date_two = moment(today, "DD-MM-YYYY").add(2, 'days');

  $("#date-day2").text(new_date_two.format("dddd, MMMM Do YYYY"));

  var new_date_three = moment(today, "DD-MM-YYYY").add(3, 'days');
  
  $("#date-day3").text(new_date_three.format("dddd, MMMM Do YYYY"));

  var new_date_four = moment(today, "DD-MM-YYYY").add(4, 'days');
  
  $("#date-day4").text(new_date_four.format("dddd, MMMM Do YYYY"));

  var new_date_five = moment(today, "DD-MM-YYYY").add(5, 'days');
  
  $("#date-day5").text(new_date_five.format("dddd, MMMM Do YYYY"));
  
  }, 1000);
  /* -------------------------------------------------------------------------- */


var formSubmitHandler = function (event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};

var buttonClickHandler = function (event) {
  var language = event.target.getAttribute('data-language');

  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = '';
  }
};

var getUserRepos = function (user) {

  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + user + ',us&APPID=0220452a1991091b9684145e5369c7ac'

  // var apiUrl = 'https://api.github.com/users/' + user + '/repos';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
       
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, user);

          console.log(data.coord.lat)
          console.log(data.coord.lon)
          var lat = data.coord.lat;
          var lon = data.coord.lon;

          var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=0220452a1991091b9684145e5369c7ac'

          fetch(oneCallUrl)
            .then(function (response) {
              if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                  console.log(data);

                  console.log(data.daily)

                  var lastWeather = {

                    cityName: user,
                    icon: data.current.weather[0].icon,
                    temp: data.current.temp,
                    wind: data.current.wind_speed,
                    humidity: data.current.humidity,
                    uvIdnex: data.current.uvi,
                    dayOneIcon: data.daily[0].weather[0].icon,

                    dayOneTemp: data.daily[0].temp.day,
                    dayOneWind: data.daily[0].wind_speed,
                    dayOneHumidity: data.daily[0].humidity,
                    dayTwoIcon: data.daily[1].weather[0].icon,
                    dayTwoTemp: data.daily[1].temp.day,
                    dayTwoWind: data.daily[1].wind_speed,
                    dayTwoHumidity: data.daily[1].humidity,
                    dayThreeIcon: data.daily[2].weather[0].icon,
                    dayThreeTemp: data.daily[2].temp.day,
                    dayThreeWind: data.daily[2].wind_speed,
                    dayThreeHumidity: data.daily[2].humidity,
                    dayFourIcon: data.daily[3].weather[0].icon,
                    dayFourTemp: data.daily[3].temp.day,
                    dayFourWind: data.daily[3].wind_speed,
                    dayFourHumidity: data.daily[3].humidity,
                    dayFiveIcon: data.daily[4].weather[0].icon,
                    dayFiveTemp: data.daily[4].temp.day,
                    dayFiveWind: data.daily[4].wind_speed,
                    dayFiveHumidity: data.daily[4].humidity




                  }

             

                

                  displayRepos(data, user);
                  console.log("did it work")
                  // grab and use the data here
               
              

                  localStorage.setItem("lastCityWeather", JSON.stringify(lastWeather));
                  // 
                  var lastWeather = JSON.parse(localStorage.getItem("lastCityWeather"));

                  // UV idex logic favorable, moderate and severe 3-5 is moderate, lower is favoable and severe is higher
                  var UVcolor = '';

                  if(lastWeather.uvIdnex < 3){
                    UVcolor = 'background-color: green'

                  } else if(lastWeather.uvIdnex > 3 && lastWeather.uvIdnex < 5) {
                    UVcolor = 'background-color: yellow'

                  } else if(lastWeather.uvIdnex > 5){
                    UVcolor = 'background-color: red'
                  }
                  console.log(UVcolor)



                  

                  // putting the values on the page

                  document.getElementById("city-name").innerHTML = lastWeather.cityName;
                  document.getElementById("city-icon").innerHTML = lastWeather.icon;
                  document.getElementById("city-temp").innerHTML = "Temp: " + lastWeather.temp;
                  document.getElementById("city-wind").innerHTML = "Wind Speed" + lastWeather.wind;
                  document.getElementById("city-uvIndex").style = UVcolor





                  document.getElementById("city-humidity").innerHTML = "Humidity" + lastWeather.humidity;
                  document.getElementById("city-uvIndex").innerHTML = "UVIndex" + lastWeather.uvIdnex;
                  document.getElementById("city-one-temp").innerHTML = "Temp: " + lastWeather.dayOneTemp;
                  document.getElementById("city-one-wind").innerHTML = "Wind Speed" + lastWeather.dayOneWind;
                  document.getElementById("city-one-humidity").innerHTML = "Humidity" + lastWeather.dayOneHumidity;
                  document.getElementById("city-two-temp").innerHTML = "Temp: " + lastWeather.dayTwoTemp;
                  document.getElementById("city-two-wind").innerHTML = "Wind Speed" + lastWeather.dayTwoWind;
                  document.getElementById("city-two-humidity").innerHTML = "Humidity" + lastWeather.dayTwoHumidity;
                  document.getElementById("city-three-temp").innerHTML = "Temp" + lastWeather.dayThreeTemp;
                  document.getElementById("city-three-wind").innerHTML = "Wind Speed" + lastWeather.dayThreeWind;
                  document.getElementById("city-three-humidity").innerHTML = "Humidity" + lastWeather.dayThreeHumidity;
                  document.getElementById("city-four-temp").innerHTML = "Temp" + lastWeather.dayFourTemp;
                  document.getElementById("city-four-wind").innerHTML = "WindSpeed: " + lastWeather.dayFourWind;
                  document.getElementById("city-four-humidity").innerHTML = "Humidity" + lastWeather.dayFourHumidity;
                  document.getElementById("city-five-temp").innerHTML = "Temp: " + lastWeather.dayFiveTemp;
                  document.getElementById("city-five-wind").innerHTML = "Wind Speed: " + lastWeather.dayFiveWind;
                  document.getElementById("city-five-humidity").innerHTML = "Humidity: " + lastWeather.dayFiveHumidity;

                  // document.getElementById("linkImg").innerHTML =  src='http://openweathermap.org/img/w/10d.png';
                 

                  document.getElementById('linkImg').src="http://openweathermap.org/img/w/" + lastWeather.icon + ".png";
                  document.getElementById('linkImg-day-one').src="http://openweathermap.org/img/w/" + lastWeather.dayOneIcon + ".png";
                  document.getElementById('linkImg-day-two').src="http://openweathermap.org/img/w/" + lastWeather.dayTwoIcon + ".png";
                  document.getElementById('linkImg-day-three').src="http://openweathermap.org/img/w/" + lastWeather.dayThreeIcon + ".png";
                  document.getElementById('linkImg-day-four').src="http://openweathermap.org/img/w/" + lastWeather.dayFourIcon + ".png";
                  document.getElementById('linkImg-day-five').src="http://openweathermap.org/img/w/" + lastWeather.dayFiveIcon + ".png";

                  // save city to search 
                  

                  /* -------------------------------------------------------------------------- */
                  const btn = document.createElement('button');
                  btn.innerText = lastWeather.cityName;
                  btn.classList.add('btn');
                 
                  var addButton = document.querySelector('#language-buttons');

                  addButton.appendChild(btn);



                 

                 
                 

                 

                  


                })
              }
            })


        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

// get item out of storgae
languageButtonsEl.addEventListener('click', buttonClickHandler);

document.getElementById("city-temp").innerHTML = "just work please";




/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */






var getFeaturedRepos = function (language) {
  var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No repositories found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);

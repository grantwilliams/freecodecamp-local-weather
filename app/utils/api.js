import axios from 'axios';

var GOOGLE_API_KEY = "AIzaSyB5APi4RDY_0ZT2TixD_2IJu9AZ4xik6bE"
var GOOGLE_BASE_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
var API_ID = "74eceb0c9986322baa038efe36e2f660"
var BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"

var backgrounds = {
    'cloudy': {'night': 'http://i.imgur.com/RKvJT8q.jpg', 'day': 'http://i.imgur.com/9BN14fr.jpg'},
    'hot': {'night': 'http://i.imgur.com/TUkAiY0.jpg', 'day': 'http://i.imgur.com/TUkAiY0.jpg'},
    'raining': {'night': 'http://i.imgur.com/wOig7Nu.jpg', 'day': 'http://i.imgur.com/G9Ikmxe.jpg'},
    'snowing': {'night': 'http://i.imgur.com/WFI2VlZ.jpg', 'day': 'http://i.imgur.com/F6kInOS.jpg'},
    'stormy': {'night': 'http://i.imgur.com/0cuXyGR.jpg', 'day': 'http://i.imgur.com/0cuXyGR.jpg'},
    'clear': {'night': 'http://i.imgur.com/ZuFo52Y.jpg', 'day': 'http://i.imgur.com/SI8TbKh.jpg'},
    'misty': {'night': 'http://i.imgur.com/QRs96Ux.jpg', 'day': 'http://i.imgur.com/TTu4wS5.jpg'}
}

export function geoLocate () {
    return new Promise((resolve) => {
        let position = {
            error: false
        }
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            position = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            }
            resolve(position)
        });
    } else {
        position.error = true
        resolve(position)
    }
    })
}

export var api = {
    getLocation: function () {
        return geoLocate().then(position => {
            return position
        })
    },
    getWeatherLongLat: function (coords, units) {
        return axios.get(`${BASE_URL}lat=${coords.latitude}&lon=${coords.longitude}&units=${units}&APPID=${API_ID}`)
    },
    getWeatherByCity: function (city, units) {
        return axios.get(`${BASE_URL}q=${city}&units=${units}&APPID=${API_ID}`)
    },
    getCitySuggestions: function (city) {
        return axios.get(`http://api.geonames.org/searchJSON?username=grantwilliams&q=${city}&maxRows=10`)
    },
    getCityTime: function (coords) {
        return axios.get(`http://api.geonames.org/timezoneJSON?lat=${coords.latitude}&lng=${coords.longitude}&username=grantwilliams`)
    },
    getBackgroundImage: function (weatherData, timeData) {
        var timeOfDay;
        if(timeData.cityTime.getHours() >= timeData.sunrise.getHours() && timeData.cityTime.getHours() <= timeData.sunset.getHours()) {
            timeOfDay = 'day'
        } else {
            timeOfDay = 'night'
        }
        var backgroundToUse;
        if (weatherData.data.weather[0].id >= 200 && weatherData.data.weather[0].id <= 232) {
            backgroundToUse = backgrounds['stormy'][timeOfDay];
        } else if (weatherData.data.weather[0].id >= 300 && weatherData.data.weather[0].id <= 531) {
            backgroundToUse = backgrounds['raining'][timeOfDay];
        } else if (weatherData.data.weather[0].id >= 600 && weatherData.data.weather[0].id <= 622) {
            backgroundToUse = backgrounds['snowing'][timeOfDay];
        } else if (weatherData.data.weather[0].id >= 701 && weatherData.data.weather[0].id <=721) {
            backgroundToUse = backgrounds['misty'][timeOfDay]
        } else if (weatherData.data.weather[0].id == 904) {
            backgroundToUse = backgrounds['hot'][timeOfDay];
        } else if (weatherData.data.weather[0].id >= 801 && weatherData.data.weather[0].id <= 804) {
            backgroundToUse = backgrounds['cloudy'][timeOfDay];
        } else {
            backgroundToUse = backgrounds['clear'][timeOfDay];
        }
        return backgroundToUse
    }
}

export default api;
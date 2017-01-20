import axios from 'axios';

let APIXU_KEY = "1684580502d9494c997155118171901"
let APIXU_BASE_URL = "https://api.apixu.com/v1/"

let cloudyCode = [1003, 1006, 1009]
let rainyCode = [1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1237, 1240, 1243, 1246, 1249, 1252, 1261, 1264]
let snowyCode = [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282]
let stormyCode = [1087, 1273, 1276]
let mistyCode = [1030, 1135, 1147]
let backgrounds = {
    'cloudy': {'night': 'https://i.imgur.com/RKvJT8q.jpg', 'day': 'https://i.imgur.com/9BN14fr.jpg'},
    'hot': {'night': 'https://i.imgur.com/TUkAiY0.jpg', 'day': 'https://i.imgur.com/TUkAiY0.jpg'},
    'raining': {'night': 'https://i.imgur.com/wOig7Nu.jpg', 'day': 'https://i.imgur.com/G9Ikmxe.jpg'},
    'snowing': {'night': 'https://i.imgur.com/WFI2VlZ.jpg', 'day': 'https://i.imgur.com/F6kInOS.jpg'},
    'stormy': {'night': 'https://i.imgur.com/0cuXyGR.jpg', 'day': 'https://i.imgur.com/0cuXyGR.jpg'},
    'clear': {'night': 'https://i.imgur.com/ZuFo52Y.jpg', 'day': 'https://i.imgur.com/SI8TbKh.jpg'},
    'misty': {'night': 'https://i.imgur.com/QRs96Ux.jpg', 'day': 'https://i.imgur.com/TTu4wS5.jpg'}
}

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let getOrdinal = function (date) {
    switch (date) {
        case 1:
        case 21:
        case 31:
            return 'st';
        case 2:
        case 22:
            return 'nd';
        case 3:
        case 23:
            return 'rd';
        default:
            return 'th';
    }
}

let getHour = function (dateObj) {
    let hour = dateObj.getHours()
    return hour < 10 ? `0${hour}` : hour
}

let getMinute = function (dateObj) {
    let minute = dateObj.getMinutes()
    return minute < 10 ? `0${minute}` : minute
}

export let api = {
    getWeather: function (city=undefined) {
        return axios.get(`${APIXU_BASE_URL}forecast.json?key=${APIXU_KEY}&q=${city == undefined ? 'auto:ip' : city}`).then((results) => {
            if (results.data.error) {
                return results.data
            } else {
                let sunrise = results.data.forecast.forecastday[0].astro.sunrise
                let time = {
                    now: new Date(results.data.location.localtime),
                    sunrise: new Date(`${results.data.forecast.forecastday[0].date} ${results.data.forecast.forecastday[0].astro.sunrise}`),
                    sunset: new Date(`${results.data.forecast.forecastday[0].date} ${results.data.forecast.forecastday[0].astro.sunset}`)
                }
                let timeOfDay = time.now >= time.sunrise && time.now <= time.sunset ? 'day' : 'night'
                let backgroundToUse = api.getBackgroundImage(results.data.current.condition.code, timeOfDay)
                let newState = {
                    isLoading: false,
                    currentWeather: results.data.current,
                    forecastWeather: results.data.forecast.forecastday[0],
                    location: results.data.location,
                    backgroundImage: backgroundToUse,
                    newCity: results.data.location.name,
                    localTime: time.now
                }
                return newState
            }
        })
    },
    getCitySuggestions: function (city) {
        return axios.get(`${APIXU_BASE_URL}search.json?key=${APIXU_KEY}&q=${city}`)
    },
    getBackgroundImage: function (conditionCode, timeOfDay) {
        let backgroundToUse;
        if (stormyCode.indexOf(conditionCode) > -1) {
            backgroundToUse = backgrounds['stormy'][timeOfDay];
        } else if (rainyCode.indexOf(conditionCode) > -1) {
            backgroundToUse = backgrounds['raining'][timeOfDay];
        } else if (snowyCode.indexOf(conditionCode) > -1) {
            backgroundToUse = backgrounds['snowing'][timeOfDay];
        } else if (mistyCode.indexOf(conditionCode) > -1) {
            backgroundToUse = backgrounds['misty'][timeOfDay]
        } else if (cloudyCode.indexOf(conditionCode) > -1) {
            backgroundToUse = backgrounds['cloudy'][timeOfDay];
        } else {    
            backgroundToUse = backgrounds['clear'][timeOfDay];
        }
        return backgroundToUse
    },
    getDateAsText: function (dateObj) {
        return `${getHour(dateObj)}:${getMinute(dateObj)} on ${dateObj.getDate()}${getOrdinal(dateObj.getDate())} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`
    }
}

export default api;
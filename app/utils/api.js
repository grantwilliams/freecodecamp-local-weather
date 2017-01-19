import axios from 'axios';

var APIXU_KEY = "1684580502d9494c997155118171901"
var APIXU_BASE_URL = "https://api.apixu.com/v1/"

var cloudyCode = [1003, 1006, 1009]
var rainyCode = [1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1237, 1240, 1243, 1246, 1249, 1252, 1261, 1264]
var snowyCode = [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282]
var stormyCode = [1087, 1273, 1276]
var mistyCode = [1030, 1135, 1147]
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
    getWeather: function (city=null) {
        return axios.get(`${APIXU_BASE_URL}forecast.json?key=${APIXU_KEY}&q=${city == null ? 'auto:ip' : city}`)
    },
    getCitySuggestions: function (city) {
        return axios.get(`${APIXU_BASE_URL}search.json?key=${APIXU_KEY}&q=${city}`)
    },
    getBackgroundImage: function (conditionCode, timeOfDay) {
        var backgroundToUse;
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
    }
}

export default api;
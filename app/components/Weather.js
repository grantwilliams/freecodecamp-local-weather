import React, {PropTypes} from 'react';

const Weather = ({currentWeather, forecastWeather, location, units, localTime, handleToggleUnits, }) => {
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    let deg = "\u00B0"
    let temp_unit = units == 'metric' ? 'c' : 'f'
    let wind_unit = units == 'metric' ? 'kph' : 'mph'
    return (
        <div>
            <div className="text-center">
                <h3>{`Showing weather for ${location.name}, ${location.country}`}</h3>
            </div>
            <div id="temperature" className="text-center">
                <span id="temp-text">
                    <img src={`https:${currentWeather.condition.icon}`} /> {`${currentWeather[`temp_${temp_unit}`]} ${deg}${units == 'metric' ? 'C' : 'F'}`}
                </span><button className="btn btn-primary" id="toggle-units" onClick={handleToggleUnits}> Toggle C/F </button>
            </div>
            <div id="time" className="text-center">
                {`Local time: ${localTime}`}
            </div>
            <div id="details">
                <div className="col-xs-12 col-sm-12">
                    <div id="description" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {toTitleCase(currentWeather.condition.text)}
                        </div>
                    </div>
                    <div id="cloudiness" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Cloudiness: ${currentWeather.cloud}%`}
                        </div>
                    </div>
                    <div id="temp-min" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Min temp: ${forecastWeather.day[`mintemp_${temp_unit}`]} ${deg}${units == 'metric' ? 'C' : 'F'}`}
                        </div>
                    </div>
                    <div id="temp-max" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Max temp: ${forecastWeather.day[`maxtemp_${temp_unit}`]} ${deg}${units == 'metric' ? 'C' : 'F'}`}
                        </div>
                    </div>
                    <div id="wind-speed" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Wind: ${currentWeather[`wind_${wind_unit}`]} ${units == 'metric' ? ' km/h' : ' mph'}`}
                        </div>
                    </div>
                    <div id="wind-direction" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Wind Direction: ${currentWeather.wind_degree === undefined ? "n/a" : `${currentWeather.wind_degree} ${deg}`}`}
                        </div>
                    </div>
                    <div id="humidity" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Humidity: ${currentWeather.humidity}%`}
                        </div>
                    </div>
                    <div id="pressure" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Pressure: ${currentWeather.pressure_mb} mb`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Weather.propTypes = {
    currentWeather: PropTypes.object.isRequired,
    forecastWeather: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    units: PropTypes.string.isRequired,
    localTime: PropTypes.string.isRequired,
    handleToggleUnits: PropTypes.func.isRequired
};

export default Weather;
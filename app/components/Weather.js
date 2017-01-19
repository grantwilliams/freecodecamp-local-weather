import React, {PropTypes} from 'react';

const Weather = props => {
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    let deg = "\u00B0"
    return (
        <div id="weather-details">
            <div className="text-center">
                <h3>{`Showing weather for ${props.location.name}, ${props.location.country}`}</h3>
            </div>
            <div id="temperature" className="text-center">
                <span id="temp-text">
                    <img src={props.icon} /> {`${props.currentTemperature} ${deg}${props.units == 'metric' ? 'C' : 'F'}`}
                </span><button className="btn btn-primary" id="toggle-units" onClick={props.handleToggleUnits}> Toggle C/F </button>
            </div>
            <div id="details">
                <div className="col-xs-12 col-sm-12">
                    <div id="description" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {toTitleCase(props.currentWeather.condition.text)}
                        </div>
                    </div>
                    <div id="cloudiness" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Cloudiness: ${props.currentWeather.cloud}%`}
                        </div>
                    </div>
                    <div id="temp-min" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Min temp: ${props.minTemperature} ${deg}${props.units == 'metric' ? 'C' : 'F'}`}
                        </div>
                    </div>
                    <div id="temp-max" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Max temp: ${props.maxTemperature} ${deg}${props.units == 'metric' ? 'C' : 'F'}`}
                        </div>
                    </div>
                    <div id="wind-speed" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Wind: ${props.wind} ${props.units == 'metric' ? ' km/h' : ' mph'}`}
                        </div>
                    </div>
                    <div id="wind-direction" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Wind Direction: ${props.currentWeather.wind_degree === undefined ? "n/a" : `${props.currentWeather.wind_degree} ${deg}`}`}
                        </div>
                    </div>
                    <div id="humidity" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Humidity: ${props.currentWeather.humidity}%`}
                        </div>
                    </div>
                    <div id="pressure" className="col-xs-6 col-sm-3">
                        <div className="detail-box">
                            {`Pressure: ${props.currentWeather.pressure_mb} mb`}
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
    icon: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    currentTemperature: PropTypes.number.isRequired,
    minTemperature: PropTypes.number.isRequired,
    maxTemperature: PropTypes.number.isRequired,
    units: PropTypes.string.isRequired,
    handleToggleUnits: PropTypes.func.isRequired
};

export default Weather;
import React, {PropTypes} from 'react';

const Weather = props => {
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    return (
        <div id="weather-details">
            <div className="text-center">
                <h3>Showing weather for {props.weatherDetails.name + ', ' + props.weatherDetails.sys.country}</h3>
            </div>
            <div id="temperature" className="text-center">
                <span id="temp-text">
                    <img src={"http://openweathermap.org/img/w/" + props.icon} /> {props.currentTemperature} &deg;{props.units == 'metric' ? 'C' : 'F'}
                </span><button className="btn btn-primary" id="toggle-units" onClick={props.handleToggleUnits}> Toggle C/F </button>
            </div>
            <div id="details" className="">
                <div className="col-xs-12">
                    <div id="country" className="col-xs-4">
                        <div className="detail-box">
                            {props.weatherDetails.name + ', ' + props.weatherDetails.sys.country}
                        </div>
                    </div>
                    <div id="description" className="col-xs-4">
                        <div className="detail-box">
                            {toTitleCase(props.weatherDetails.weather[0].description)}
                        </div>
                    </div>
                    <div id="temp-min" className="col-xs-4">
                        <div className="detail-box">
                            {"Min temp: " + props.weatherDetails.main.temp_min} &deg;{props.units == 'metric' ? 'C' : 'F'}
                        </div>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div id="temp-max" className="col-xs-4">
                        <div className="detail-box">
                            {"Max temp: " + props.weatherDetails.main.temp_max} &deg;{props.units == 'metric' ? 'C' : 'F'}
                        </div>
                    </div>
                    <div id="humidity" className="col-xs-4">
                        <div className="detail-box">
                            {"Humidity: " + props.weatherDetails.main.humidity + '%'}
                        </div>
                    </div>
                    <div id="cloudiness" className="col-xs-4">
                        <div className="detail-box">
                            {"Cloudiness: " + props.weatherDetails.clouds.all + '%'}
                        </div>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div id="wind-speed" className="col-xs-4">
                        <div className="detail-box">
                            {"Wind Speed: " + props.weatherDetails.wind.speed} {props.units == 'metric' ? ' meter/sec' : ' miles/hour'}
                        </div>
                    </div>
                    <div id="wind-direction" className="col-xs-4">
                        <div className="detail-box">
                            {"Wind Directions: " + props.weatherDetails.wind.deg} &deg;
                        </div>
                    </div>
                    <div id="pressure" className="col-xs-4">
                        <div className="detail-box">
                            {"Pressure: " + props.weatherDetails.main.pressure + " hPa"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Weather.propTypes = {
    weatherDetails: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    currentTemperature: PropTypes.number.isRequired,
    units: PropTypes.string.isRequired,
    handleToggleUnits: PropTypes.func.isRequired
};

export default Weather;
import React, {PropTypes} from 'react';

const Weather = props => {
    console.log(props);
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
                <div className="clearfix"></div>
                <div className="row details-row text-center">
                    <span id="temp-max" className="detail-box">{"Max temp: " + props.weatherDetails.main.temp_max} &deg;{props.units == 'metric' ? 'C' : 'F'}</span>
                    <span id="humidity" className="detail-box">{"Humidity: " + props.weatherDetails.main.humidity + '%'}</span>
                    <span id="cloudiness" className="detail-box">{"Cloudiness: " + props.weatherDetails.clouds.all + '%'}</span>
                </div>
                <div className="clearfix"></div>
                <div className="row details-row text-center">
                    <span id="wind-speed" className="detail-box">{"Wind Speed: " + props.weatherDetails.wind.speed} {props.units == 'metric' ? ' meter/sec' : ' miles/hour'}</span>
                    <span id="wind-direction" className="detail-box">{"Wind Directions: " + props.weatherDetails.wind.deg} &deg;</span>
                    <span id="pressure" className="detail-box">{"Pressure: " + props.weatherDetails.main.pressure}</span>
                </div>
            </div>
        </div>
    );
};

Weather.propTypes = {
    
};

export default Weather;
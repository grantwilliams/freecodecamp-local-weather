import React, {Component, PropTypes} from 'react';
import Loading from '../components/Loading';
import Weather from '../components/Weather';
import SearchCityContainer from './SearchCityContainer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import api from '../utils/api';
import '../styles/main.scss';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            units: 'metric',
            coords: undefined,
            weatherDetails: undefined,
            newCity: '',
            citySuggestions: [],
            backgroundImage: undefined
        }
    }

    handleToggleUnits() {
        let newUnits = this.state.units == 'metric' ? 'imperial' : 'metric'
        api.getWeatherLongLat(this.state.coords, newUnits).then(currentDetails => {
            var newState = {
                isLoading: false,
                weatherDetails: currentDetails.data,
                units: newUnits
            }
            api.getForecastLongLat(this.state.coords, newUnits).then(forecastWeatherDetails => {
                newState = {
                    ...newState,
                    weatherDetails: {
                        ...newState.weatherDetails,
                        min_temp: forecastWeatherDetails.data.list[0].temp.min,
                        max_temp: forecastWeatherDetails.data.list[0].temp.max
                    }
                }
                this.setState(newState);
            })
        })
    }

    handleChangeCity(e) {
        typeof e == 'object' ? e.preventDefault() : null;
        var newCity = typeof e == 'object' ? e.target.search.value : e
        api.getWeatherByCity(newCity, this.state.units).then(details => {
            var timeDetails;
            api.getCityTime({latitude: details.data.coord.lat, longitude: details.data.coord.lon}).then(timeDetails => {
                timeDetails = {
                    cityTime: new Date(timeDetails.data.time),
                    sunrise: new Date(timeDetails.data.sunrise),
                    sunset: new Date(timeDetails.data.sunset)
                }
                var backgroundToUse = api.getBackgroundImage(details, timeDetails)
                var newState = {
                    coords: {
                        latitude: details.data.coord.lat,
                        longitude: details.data.coord.lon
                    },
                    weatherDetails: details.data,
                    backgroundImage: backgroundToUse,
                    newCity: details.data.name
                }
                api.getForecastByCity(newCity, this.state.units).then(forecastWeatherDetails => {
                    newState = {
                        ...newState,
                        weatherDetails: {
                            ...newState.weatherDetails,
                            min_temp: forecastWeatherDetails.data.list[0].temp.min,
                            max_temp: forecastWeatherDetails.data.list[0].temp.max
                        }
                    }
                    this.setState(newState);
                })
            })
        })
    }

    componentDidMount() {
        let coords;
        api.getLocation()
        .then(position => {
            if(position.error) {
                alert("Geolocation is not supported by this browser.")
            } else {
                coords = {
                    latitude: position.latitude,
                    longitude: position.longitude
                }
                var timeDetails;
                api.getCityTime(coords).then(timeDetails => {
                    timeDetails = {
                        cityTime: new Date(timeDetails.data.time),
                        sunrise: new Date(timeDetails.data.sunrise),
                        sunset: new Date(timeDetails.data.sunset)
                    }
                    api.getWeatherLongLat(coords, this.state.units).then(currentWeatherDetails => {
                        var backgroundToUse = api.getBackgroundImage(currentWeatherDetails, timeDetails)
                        var newState = {
                            isLoading: false,
                            coords: coords,
                            weatherDetails: currentWeatherDetails.data,
                            backgroundImage: backgroundToUse
                        }
                        api.getForecastLongLat(coords, this.state.units).then(forecastWeatherDetails => {
                            newState = {
                                ...newState,
                                weatherDetails: {
                                    ...newState.weatherDetails,
                                    min_temp: forecastWeatherDetails.data.list[0].temp.min,
                                    max_temp: forecastWeatherDetails.data.list[0].temp.max
                                }
                            }
                            this.setState(newState);
                        })
                    })
                })
            }
        })
    }

    render() {
        let bgStyle = {
            backgroundImage: `url('${this.state.backgroundImage}')`
        }
        return (
            <div id="main-wrapper" className="container">
                <ReactCSSTransitionGroup
                transitionName="background"
                transitionAppear={true}
                transitionAppearTimeout={1500}
                transitionEnterTimeout={1500}
                transitionLeaveTimeout={1500} >
                    <div id="background" style={this.state.backgroundImage === undefined ? null : bgStyle} key={this.state.backgroundImage}></div>
                </ReactCSSTransitionGroup>
                <div id="title-text" className="text-center">
                    Local Weather App
                    <div id="sub-title" className="text-center">
                        FreeCodeCamp Zipline
                    </div>
                </div>
                <SearchCityContainer
                newCity={this.state.newCity}
                handleChangeCity={this.handleChangeCity.bind(this)} />
                {this.state.isLoading
                ? <Loading />
                : <ReactCSSTransitionGroup
                transitionName="weather"
                transitionAppear={true}
                transitionLeave={false}
                transitionAppearTimeout={1500}
                transitionEnterTimeout={1500}
                component="div"
                className="weather-details" >
                <Weather
                weatherDetails={this.state.weatherDetails}
                icon={this.state.weatherDetails.weather[0].icon + ".png"}
                currentTemperature={Math.floor(this.state.weatherDetails.main.temp)}
                minTemperature={Math.floor(this.state.weatherDetails.min_temp)}
                maxTemperature={Math.floor(this.state.weatherDetails.max_temp)}
                units={this.state.units}
                handleToggleUnits={this.handleToggleUnits.bind(this)}
                key={this.state.weatherDetails.name} /> 
                  </ReactCSSTransitionGroup>
                }
            </div>
        );
    }
}

AppContainer.propTypes = {

};

export default AppContainer;
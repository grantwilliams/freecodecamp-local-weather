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
        api.getWeatherLongLat(this.state.coords, newUnits)
        .then(details => {
            this.setState({
                isLoading: false,
                weatherDetails: details.data,
                units: newUnits
            });
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
                this.setState({
                    coords: {
                        latitude: details.data.coord.lat,
                        longitude: details.data.coord.lon
                    },
                    weatherDetails: details.data,
                    backgroundImage: backgroundToUse,
                    newCity: details.data.name
                });
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
                    api.getWeatherLongLat(coords, this.state.units).then(details => {
                        var backgroundToUse = api.getBackgroundImage(details, timeDetails)
                        this.setState({
                            isLoading: false,
                            coords: coords,
                            weatherDetails: details.data,
                            backgroundImage: backgroundToUse
                        });
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
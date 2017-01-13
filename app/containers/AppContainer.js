import React, {Component, PropTypes} from 'react';
import Loading from '../components/Loading';
import Weather from '../components/Weather';
import SearchCity from '../components/SearchCity';
import api from '../utils/api';
import '../main.scss';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            units: 'metric',
            coords: undefined,
            weatherDetails: undefined,
            searchValue: '',
            citySuggestions: []
        }
    }

    // componentWillMount() {
        
    // }

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

    handleOnChange(e) {
        this.setState({
            searchValue: e.target.value
        });
        api.getCitySuggestions(e.target.value).then(results => {
            var citySuggestions = results.data.geonames.map(suggestion => {
                return `${suggestion.name}, ${suggestion.countryCode}`
            })
            this.setState({
                citySuggestions: citySuggestions
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
                    searchValue: ''
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

    // componentWillReceiveProps(nextProps) {

    // }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    // componentWillUpdate(nextProps, nextState) {

    // }

    // componentDidUpdate(prevProps, prevState) {

    // }

    // componentWillUnmount() {

    // }

    render() {
        document.body.style.backgroundImage = `url(${this.state.backgroundImage})`
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundRepeat = 'no-repeat'
        return (
            <div id="main-wrapper" className="container">
                <div id="title-text" className="text-center">
                    Local Weather App
                    <div id="sub-title" className="text-center">
                        FreeCodeCamp Zipline
                    </div>
                </div>
                <SearchCity
                handleOnChange={this.handleOnChange.bind(this)}
                handleChangeCity={this.handleChangeCity.bind(this)}
                suggestions={this.state.citySuggestions}
                value={this.state.searchValue} />
                {this.state.isLoading
                ? <Loading />
                : <Weather
                  weatherDetails={this.state.weatherDetails}
                  icon={this.state.weatherDetails.weather[0].icon + ".png"}
                  currentTemperature={Math.floor(this.state.weatherDetails.main.temp)}
                  units={this.state.units}
                  handleToggleUnits={this.handleToggleUnits.bind(this)} />}
            </div>
        );
    }
}

AppContainer.propTypes = {

};

export default AppContainer;
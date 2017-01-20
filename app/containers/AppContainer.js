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
            newCity: '',
            citySuggestions: [],
            backgroundImage: undefined
        }
    }

    handleToggleUnits() {
        this.setState({
            units: this.state.units == 'metric' ? 'imperial' : 'metric'
        });
    }

    handleChangeCity(e) {
        typeof e == 'object' ? e.preventDefault() : null;
        var newCity = typeof e == 'object' ? e.target.search.value : e
        api.getWeather(newCity).then(results => {
            let sunrise = results.data.forecast.forecastday[0].astro.sunrise
            var time = {
                now: new Date(results.data.location.localtime),
                sunrise: new Date(`${results.data.forecast.forecastday[0].date} ${results.data.forecast.forecastday[0].astro.sunrise}`),
                sunset: new Date(`${results.data.forecast.forecastday[0].date} ${results.data.forecast.forecastday[0].astro.sunset}`)
            }
            var timeOfDay = time.now >= time.sunrise && time.now <= time.sunset ? 'day' : 'night'
            let backgroundToUse = api.getBackgroundImage(results.data.current.condition.code, timeOfDay)
            var newState = {
                isLoading: false,
                currentWeather: results.data.current,
                forecastWeather: results.data.forecast.forecastday[0],
                location: results.data.location,
                backgroundImage: backgroundToUse,
                newCity: results.data.location.name,
                localTime: time.now
            }
            this.setState(newState);
        })
    }

    componentDidMount() {
        api.getWeather().then(results => {
            let sunrise = results.data.forecast.forecastday[0].astro.sunrise
            var time = {
                now: new Date(results.data.location.localtime),
                sunrise: new Date(`${results.data.forecast.forecastday[0].date} ${results.data.forecast.forecastday[0].astro.sunrise}`),
                sunset: new Date(`${results.data.forecast.forecastday[0].date} ${results.data.forecast.forecastday[0].astro.sunset}`)
            }
            var timeOfDay = time.now >= time.sunrise && time.now <= time.sunset ? 'day' : 'night'
            let backgroundToUse = api.getBackgroundImage(results.data.current.condition.code, timeOfDay)
            var newState = {
                isLoading: false,
                currentWeather: results.data.current,
                forecastWeather: results.data.forecast.forecastday[0],
                location: results.data.location,
                backgroundImage: backgroundToUse,
                localTime: time.now
            }
            this.setState(newState);
        })
    }

    render() {
        let bgStyle = {
            backgroundImage: `url('${this.state.backgroundImage}')`
        }
        let temp_unit = this.state.units == 'metric' ? 'c' : 'f'
        let wind_unit = this.state.units == 'metric' ? 'kph' : 'mph'
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
                    currentWeather={this.state.currentWeather}
                    forecastWeather={this.state.forecastWeather}
                    icon={`https:${this.state.currentWeather.condition.icon}`}
                    location={this.state.location}
                    currentTemperature={Math.floor(this.state.currentWeather[`temp_${temp_unit}`])}
                    minTemperature={Math.floor(this.state.forecastWeather.day[`mintemp_${temp_unit}`])}
                    maxTemperature={Math.floor(this.state.forecastWeather.day[`maxtemp_${temp_unit}`])}
                    wind={this.state.currentWeather[`wind_${wind_unit}`]}
                    units={this.state.units}
                    localTime={api.getDateAsText(this.state.localTime)}
                    handleToggleUnits={this.handleToggleUnits.bind(this)}
                    key={this.state.location.name} /> 
                  </ReactCSSTransitionGroup>
                }
                <div className="text-center" id="source-code">
                    <a href="https://github.com/grantwilliams/freecodecamp-local-weather" target="_blank">
                        <button className="btn btn-success">
                            Source code on GitHub <i className="fa fa-github"></i>
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}

AppContainer.propTypes = {

};

export default AppContainer;
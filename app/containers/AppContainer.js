import React, {Component, PropTypes} from 'react';
import Header from '../components/Header';
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
        let newCity = typeof e == 'object' ? e.target.search.value : e
        newCity.length > 0 ? api.getWeather(newCity).then((newState) => {
            if (newState.error) {
                alert(newState.error.message)
            } else {
                this.setState({
                    ...newState,
                    currentlySearching: false
                });
            }
        }) : null
    }

    componentDidMount() {
        api.getWeather().then((newState) => {
            this.setState(newState);
        })
    }

    render() {
        return (
            <div id="main-wrapper" className="container">
                <Header backgroundImage={this.state.backgroundImage} />
                <SearchCityContainer newCity={this.state.newCity} handleChangeCity={this.handleChangeCity.bind(this)} />
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
                    location={this.state.location}
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

export default AppContainer;
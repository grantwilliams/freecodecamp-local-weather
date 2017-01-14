import React, {Component, PropTypes} from 'react';
import SearchCity from '../components/SearchCity';
import api from '../utils/api';

class SearchCityContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            citySuggestions: [],
            searchValue: '',
            currentCity: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newCity !== this.state.currentCity) {
            this.clearSearch()
        }
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

    clearSearch() {
        this.setState({
            searchValue: '',
            citySuggestions: []
        });
    }

    render() {
        return (
            <div>
                <SearchCity
                handleOnChange={this.handleOnChange.bind(this)}
                handleChangeCity={this.props.handleChangeCity}
                suggestions={this.state.citySuggestions}
                value={this.state.searchValue} />
            </div>
        );
    }
}

SearchCityContainer.propTypes = {
    newCity: PropTypes.string.isRequired,
    handleChangeCity: PropTypes.func.isRequired
};

export default SearchCityContainer;
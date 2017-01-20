import React, {Component, PropTypes} from 'react';
import SearchCity from '../components/SearchCity';
import api from '../utils/api';

class SearchCityContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            citySuggestions: [],
            searchValue: '',
            currentlySearching: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newCity !== '') {
            this.clearSearch()
        }
    }

    handleOnChange(e) {
        let searchValue = e.target.value
        this.setState({searchValue: searchValue});
        if (searchValue.length == 0) {
            this.setState({
                searchValue: '',
                currentlySearching: false
            });
        } else {
            api.getCitySuggestions(searchValue).then((results) => {
                let citySuggestions = results.data.map((suggestion, key) => {
                    return <option value={suggestion.name} key={key}>{suggestion.name}</option>
                })
                this.setState({
                    citySuggestions: citySuggestions,
                    currentlySearching: true
                });
            })
        }
    }

    clearSearch() {
        this.setState({
            searchValue: '',
            citySuggestions: [],
            currentlySearching: false
        });
    }

    render() {
        return (
            <div>
                <SearchCity
                handleOnChange={this.handleOnChange.bind(this)}
                handleChangeCity={this.props.handleChangeCity}
                suggestions={this.state.citySuggestions}
                value={this.state.searchValue}
                currentlySearching={this.state.currentlySearching} />
            </div>
        );
    }
}

SearchCityContainer.propTypes = {
    newCity: PropTypes.string.isRequired,
    handleChangeCity: PropTypes.func.isRequired
};

export default SearchCityContainer;
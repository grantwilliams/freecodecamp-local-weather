import React, {PropTypes} from 'react';

const SearchCity = ({handleOnChange, handleChangeCity, suggestions, value, currentlySearching}) => {
    return (
        <div className="row" id="search">
            <datalist id="suggestions">
                {suggestions}
            </datalist>
            <form id="search-form" className="form-group col-xs-12 col-sm-offset-3 col-sm-6" onSubmit={handleChangeCity}>
                <div className="form-group">
                    <div className="input-group">
                        <input
                        name="search"
                        className={`form-control ${currentlySearching ? 'search-spinner' : ''}`}
                        placeholder="Search weather in a different city"
                        value={value}
                        onChange={handleOnChange}
                        type="text"
                        list="suggestions" />
                        <a type="submit" className="btn input-group-addon" onClick={() => handleChangeCity(value)}><i className="fa fa-search"></i></a>
                    </div>
                </div>
            </form>
        </div>
    );
};

SearchCity.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleChangeCity: PropTypes.func.isRequired,
    suggestions: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    currentlySearching: PropTypes.bool.isRequired
};

export default SearchCity;
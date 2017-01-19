import React, {PropTypes} from 'react';

const SearchCity = props => {
    return (
        <div className="row" id="search">
            <datalist id="suggestions">
                {props.suggestions}
            </datalist>
            <form id="search-form" className="form-group col-xs-12 col-sm-offset-3 col-sm-6" onSubmit={props.handleChangeCity}>
                <div className="form-group">
                    <div className="input-group">
                        <input
                        name="search"
                        className='form-control'
                        placeholder='Search weather in a different city'
                        value={props.value}
                        onChange={props.handleOnChange}
                        type='text'
                        list="suggestions" />
                        <a type="submit" className="btn input-group-addon" onClick={() => props.handleChangeCity(props.value)}><i className="fa fa-search"></i></a>
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
    value: PropTypes.string.isRequired
};

export default SearchCity;
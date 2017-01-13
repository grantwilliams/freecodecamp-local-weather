import React, {PropTypes} from 'react';

const Loading = props => {
    return (
        <div className="loading">
            <h1>Loading <i className="fa fa-spinner fa-spin fa-1x da-fw"></i></h1>
        </div>
    );
};

Loading.propTypes = {
    
};

export default Loading;
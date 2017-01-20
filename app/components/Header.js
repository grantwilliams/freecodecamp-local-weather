import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Header = ({backgroundImage}) => {
    let bgStyle = {
        backgroundImage: `url('${backgroundImage}')`
    }
    return (
        <div>
            <ReactCSSTransitionGroup
            transitionName="background"
            transitionAppear={true}
            transitionAppearTimeout={1500}
            transitionEnterTimeout={1500}
            transitionLeaveTimeout={1500} >
                <div id="background" style={backgroundImage === undefined ? null : bgStyle} key={backgroundImage}></div>
            </ReactCSSTransitionGroup>
            <div id="title-text" className="text-center">
                Local Weather App
                <div id="sub-title" className="text-center">
                    FreeCodeCamp Zipline
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    backgroundImage: PropTypes.string
};

export default Header;
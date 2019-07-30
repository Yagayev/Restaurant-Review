import React from 'react';
import {connect} from 'react-redux';
import RestSearchActions from '../RestSearch/actions';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap'
// import './RestMapPreview.scss';
import StarRatings from 'react-star-ratings';
import {Marker, Popup} from "react-leaflet";

class RestMapPreview extends React.Component {

  render() {
    // let size = this.calcImageSize();

    // star rating taken from: https://www.npmjs.com/package/react-star-ratings
    return (
          <Marker position={[this.props.rest.lat, this.props.rest.lon]}>
            <Popup>
              <h5><a href={"/rest/"+this.props.rest._id}>{this.props.rest.name}</a></h5>
              <p>{this.props.rest.description}</p>
              <StarRatings
                  rating={this.props.rest.average_ratings.overall}
                  starRatedColor="red"
                  numberOfStars={11}
                  name='overall'
                  starDimension='15px'
                  starSpacing='5px'
              />
            </Popup>
          </Marker>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    rest: state['restSearch'].getIn(['rests', props.id]),
    id: props.id,
    token: state['login'].get('token'),
    username: state['login'].get('username')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickGoToRestEventHandler: (idx) => {
      dispatch(RestSearchActions.goToRestAction(idx))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestMapPreview);

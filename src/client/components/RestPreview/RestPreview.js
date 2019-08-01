import React from 'react';
import {connect} from 'react-redux';
import RestSearchActions from '../RestSearch/actions';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap'
// import './RestPreview.scss';
import StarRatings from 'react-star-ratings';

class RestPreview extends React.Component {


  render() {

    // star rating taken from: https://www.npmjs.com/package/react-star-ratings
    return (
        <div>
          <Card>
            <Card.Header><a href={"/rest/"+this.props.rest._id}>{this.props.rest.name}</a></Card.Header>
            <Card.Body>
              {/*<Card.Title>Special title treatment</Card.Title>*/}
              <Card.Text>
                {this.props.rest.description}
              </Card.Text>
              <Card.Text>
                Location: {this.props.rest.location}
              </Card.Text>
              <StarRatings
                  rating={this.props.rest.average_ratings.overall}
                  starRatedColor="red"
                  numberOfStars={11}
                  name='overall'
                  starDimension='25px'
              />
              <Card.Text> {this.props.rest.average_ratings.overall.toFixed(1)}/11</Card.Text>
              <Card.Text>
                Out of {this.props.rest.review_count} reviews
              </Card.Text>
              <Button
                  variant="dark"
                  size="sm"
                  href={"/rest/"+this.props.rest._id}
              >View restaurant</Button>
            </Card.Body>
          </Card>
          <br />
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(RestPreview);

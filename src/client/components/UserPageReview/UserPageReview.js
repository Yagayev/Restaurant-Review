import React from 'react';
import {connect} from 'react-redux';
// import './UserPreview.scss';
import StarRatings from 'react-star-ratings';
import { Card } from 'react-bootstrap'
import '../../utils/App.scss';


class UserPageReview extends React.Component {


  render() {

    // star rating taken from: https://www.npmjs.com/package/react-star-ratings

    if(this.props.loading){
      return (
          <h3>Loading...</h3>
      );
    }
    const restId = this.props.review.restaurant._id;
    const restName = this.props.review.restaurant.name;
    const userLink = <a href={'/rest/'+restId}>{restName}</a>;

    return (
        <div>
          <Card>
            <Card.Header>{userLink}</Card.Header>
            <Card.Body>
              <Card.Text>"{this.props.review.description}"</Card.Text>
              <div>
                <table style={{fontSize:15}} className="center">
                  <tbody>
                  <tr >
                    <th>Overall:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.overall}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='overall'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.overall}/11</th>
                  </tr>
                  <tr>
                    <th>Staff kindness:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.staff_kindness}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='staff_kindness'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.staff_kindness}/11</th>
                  </tr>
                  <tr>
                    <th>Cleanliness:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.cleaniness}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='cleaniness'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.cleaniness}/11</th>
                  </tr>
                  <tr>
                    <th>Drive thru quality:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.drive_thru_quality}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='drive_thru_quality'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.drive_thru_quality}/11</th>
                  </tr>
                  <tr>
                    <th>Delivery speed:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.delivery_speed}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='delivery_speed'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.delivery_speed}/11</th>
                  </tr>
                  <tr>
                    <th>Food quality:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.food_quality}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='food_quality'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.food_quality}/11</th>
                  </tr>
                  <tr>
                    <th>Taste:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.taste}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='taste'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.taste}/11</th>
                  </tr>
                  <tr>
                    <th>Prices:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.prices}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='prices'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.prices}/11</th>
                  </tr>
                  <tr>
                    <th>Waiting time:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.waiting_time}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='waiting_time'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.waiting_time}/11</th>
                  </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
          <br />
        </div>

    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    review: state['userPage'].getIn(['userViewing', 'reviews', props.id]),
    id: props.id,
    token: state['login'].get('token'),
    username: state['login'].get('username'),
    loading: state['userPage'].get('loading')

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onClickGoToUserEventHandler: (idx) => {
    //   dispatch(UserSearchActions.goToUserAction(idx))
    // }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPageReview);

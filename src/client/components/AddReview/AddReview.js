import React from 'react';
import '../../utils/App.scss';
import RestSearch from '../RestSearch';
import { connect } from 'react-redux';
import AddReviewActions from './actions';
import StarRatings from 'react-star-ratings';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from "primereact/button";

// import {Card} from "react-bootstrap";
import { Redirect } from 'react-router';
import LoginActions from "../Login/actions";

class AddReview extends React.Component {
    // componentDidMount() {
    //     this.props.loadRestEventHandler()
    // };
    renderRedirect = () => {
        // if (!this.props.token||
        //     !this.props.token === ''||
        //     !this.props.username||
        //     !this.props.username === ''
        // ) {
        //     return (<Redirect to='/login' />)
        // }
    };

    render() {
        console.log('Search Engine props=', this.props);
        if(this.props.submitted){
            return (
                <div>
                    <h3>Thank you for submmitting your review!</h3>
                    <Redirect to='/' />
                </div>
            )
        }
        return (
            <div>
                {this.renderRedirect()}
                <div className="app-root">

                    <div className="app-header">
                        <h3>Submitting a new review for {this.props.match.params.restName}</h3>
                        <InputTextarea
                            rows={5}
                            cols={60}
                            value={this.props.description}
                            onChange={this.props.updateDescriptionEventHandler}
                            autoResize={true}
                        />
                        <br/>


                            <div>
                                <table style={{fontSize:15}} className="center">
                                    <tbody>
                                    <tr >
                                        <th>Overall:</th>
                                        <th><StarRatings
                                            rating={this.props.ratings.overall}
                                            changeRating = {rating => this.props.updateRatingHandler('overall', rating)}
                                            starRatedColor="red"
                                            numberOfStars={11}
                                            name='overall'
                                            starDimension='20px'
                                        /></th>
                                        <th>{this.props.ratings.overall}/11</th>
                                    </tr>
                                    <tr>
                                        <th>Staff kindness:</th>
                                        <th><StarRatings
                                            rating={this.props.ratings.staff_kindness}
                                            changeRating = {rating => this.props.updateRatingHandler('staff_kindness', rating)}
                                            starRatedColor="red"
                                            numberOfStars={11}
                                            name='staff_kindness'
                                            starDimension='20px'
                                        /></th>
                                        <th>{this.props.ratings.staff_kindness}/11</th>
                                    </tr>
                                    <tr>
                                        <th>Cleanliness:</th>
                                        <th><StarRatings
                                            rating={this.props.ratings.cleaniness}
                                            changeRating = {rating => this.props.updateRatingHandler('cleaniness', rating)}
                                            starRatedColor="red"
                                            numberOfStars={11}
                                            name='cleaniness'
                                            starDimension='20px'
                                        /></th>
                                        <th>{this.props.ratings.cleaniness}/11</th>
                                    </tr>
                                    <tr>
                                        <th>Drive thru quality:</th>
                                        <th><StarRatings
                                            rating={this.props.ratings.drive_thru_quality}
                                            changeRating = {rating => this.props.updateRatingHandler('drive_thru_quality', rating)}
                                            starRatedColor="red"
                                            numberOfStars={11}
                                            name='drive_thru_quality'
                                            starDimension='20px'
                                        /></th>
                                        <th>{this.props.ratings.drive_thru_quality}/11</th>
                                    </tr>
                                    <tr>
                                        <th>Delivery speed:</th>
                                        <th><StarRatings
                                            rating={this.props.ratings.delivery_speed}
                                            changeRating = {rating => this.props.updateRatingHandler('delivery_speed', rating)}
                                            starRatedColor="red"
                                            numberOfStars={11}
                                            name='delivery_speed'
                                            starDimension='20px'
                                        /></th>
                                        <th>{this.props.ratings.delivery_speed}/11</th>
                                    </tr>
                                    <tr>
                                        <th>Food quality:</th>
                                        <th><StarRatings
                                            rating={this.props.ratings.food_quality}
                                            changeRating = {rating => this.props.updateRatingHandler('food_quality', rating)}
                                            starRatedColor="red"
                                            numberOfStars={11}
                                            name='food_quality'
                                            starDimension='20px'
                                        /></th>
                                        <th>{this.props.ratings.food_quality}/11</th>
                                    </tr>
                                    <tr>
                                        <th>Taste:</th>
                                        <th><StarRatings
                                            rating={this.props.ratings.taste}
                                            changeRating = {rating => this.props.updateRatingHandler('taste', rating)}
                                            starRatedColor="red"
                                            numberOfStars={11}
                                            name='taste'
                                            starDimension='20px'
                                        /></th>
                                        <th>{this.props.ratings.taste}/11</th>
                                    </tr>
                                    <tr>
                                        <th>Prices:</th>
                                        <th><StarRatings
                                            rating={this.props.ratings.prices}
                                            changeRating = {rating => this.props.updateRatingHandler('prices', rating)}
                                            starRatedColor="red"
                                            numberOfStars={11}
                                            name='prices'
                                            starDimension='20px'
                                        /></th>
                                        <th>{this.props.ratings.prices}/11</th>
                                    </tr>
                                    <tr>
                                        <th>Waiting time:</th>
                                        <th><StarRatings
                                            rating={this.props.ratings.waiting_time}
                                            changeRating = {rating => this.props.updateRatingHandler('waiting_time', rating)}
                                            starRatedColor="red"
                                            numberOfStars={11}
                                            name='waiting_time'
                                            starDimension='20px'
                                        /></th>
                                        <th>{this.props.ratings.waiting_time}/11</th>
                                    </tr>
                                    </tbody>
                                </table>

                                <br />
                                <Button
                                    label="Submit review"
                                    className="p-button-secondary"
                                    onClick={() => this.props.submitReviewEventHandler(propsToReview(this.props))}
                                />
                            </div>


                    </div>
                </div>
            </div>
        );
    }
}

function propsToReview(props){
    /*example query:
        {
          "restaurant": "booznakasd",
          "reviewer": "tapuz",
          "token": "5d11769317381d2fe057f051",
          "description": "decent",
          "ratings": {
            "overall": 1,
            "staff_kindness": 3,
            "cleaniness": 5,
            "drive_thru_quality": 4,
            "delivery_speed": 5,
            "food_quality": 9,
            "taste": 9,
            "prices": 7,
            "waiting_time": 11
          }
        }
         */
    return {

        restaurant: props.match.params.restName,
        description: props.description,
        ratings: props.ratings,
        reviewer: props.username,
        token: props.token,
    }
}

const mapStateToProps = (state) => {
  return {
      ratings: state['addReview'].get('ratings'),
      restName: state['addReview'].get('restName'),
      submitted: state['addReview'].get('submitted'),
      description: state['addReview'].get('description'),
      // loading: state['addReview'].get('loading'),
      username: state['login'].get('username'),
      token: state['login'].get('token')

  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    updateDescriptionEventHandler: (e) =>{
        dispatch(AddReviewActions.updateDescriptionAction(e.target.value));
    },

    // loadRestEventHandler: (searchFields) => {
    //   dispatch(RestSearchActions.loadRestAction(searchFields))
    // },
    updateRatingHandler: (key, rating) =>{
        dispatch(AddReviewActions.updateRatingAction(key, rating));
    },
    submitReviewEventHandler: (review) => {
        dispatch(AddReviewActions.submitReviewAction(review));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);

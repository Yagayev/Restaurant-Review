// TODO
// reviews will go in https://react-bootstrap.github.io/components/accordion/
// where the header will have stars and maybe start of the comment, and the rest in the body

import React from 'react';
import {connect} from "react-redux";
import './App.scss';
import { Redirect } from 'react-router';

// import { Navbar, Nav, Form , FormControl, Button  } from 'react-bootstrap'
import RestPageActions from "./actions";
import StarRatings from "react-star-ratings";
import {Button} from "primereact/components/button/Button";

class RestPage extends React.Component {

    componentDidMount = () =>{
        this.props.loadRestInfoEventHandler(this.props.match.params.id);
    };

    renderRedirect = () => {
        //TODO for some reason it always redirects

        // console.log("redirecting?", this.props.token, this.props.username,
        //     !this.props.token,
        //     !this.props.token=== '' ,
        //     !this.props.username,
        //     !this.props.username === '' , !this.props.token||
        //     !this.props.token === ''||
        //     !this.props.username||
        //     !this.props.username === '')
        // if (!this.props.token||
        //     !this.props.token === ''||
        //     !this.props.username||
        //     !this.props.username === ''
        // ) {
        //     console.log("YES!!!")
        //     return (<Redirect to='/login' />)
        // }
    };

    render = () => {
        const restId = this.props.match.params.id;
        return (
            <div>
                {this.renderRedirect()}
                <div className="app-root">
                    <div className="app-header">
                        <h2>{this.props.rest.name}</h2>
                        <h4>Location: {this.props.rest.location}</h4>
                        <div>
                            <table style={{fontSize:15}} className="center">
                                <tbody>
                                <tr >
                                    <th>Overall:</th>
                                    <th><StarRatings
                                        rating={this.props.rest.average_ratings.overall}
                                        starRatedColor="red"
                                        numberOfStars={11}
                                        name='overall'
                                        starDimension='20px'
                                    /></th>
                                    <th>{this.props.rest.average_ratings.overall.toFixed(1)}/11</th>
                                </tr>
                                <tr>
                                    <th>Staff kindness:</th>
                                    <th><StarRatings
                                        rating={this.props.rest.average_ratings.staff_kindness}
                                        starRatedColor="red"
                                        numberOfStars={11}
                                        name='staff_kindness'
                                        starDimension='20px'
                                    /></th>
                                    <th>{this.props.rest.average_ratings.staff_kindness.toFixed(1)}/11</th>
                                </tr>
                                <tr>
                                    <th>Cleanliness:</th>
                                    <th><StarRatings
                                        rating={this.props.rest.average_ratings.cleaniness}
                                        starRatedColor="red"
                                        numberOfStars={11}
                                        name='cleaniness'
                                        starDimension='20px'
                                    /></th>
                                    <th>{this.props.rest.average_ratings.cleaniness.toFixed(1)}/11</th>
                                </tr>
                                <tr>
                                    <th>Drive thru quality:</th>
                                    <th><StarRatings
                                        rating={this.props.rest.average_ratings.drive_thru_quality}
                                        starRatedColor="red"
                                        numberOfStars={11}
                                        name='drive_thru_quality'
                                        starDimension='20px'
                                    /></th>
                                    <th>{this.props.rest.average_ratings.drive_thru_quality.toFixed(1)}/11</th>
                                </tr>
                                <tr>
                                    <th>Delivery speed:</th>
                                    <th><StarRatings
                                        rating={this.props.rest.average_ratings.delivery_speed}
                                        starRatedColor="red"
                                        numberOfStars={11}
                                        name='delivery_speed'
                                        starDimension='20px'
                                    /></th>
                                    <th>{this.props.rest.average_ratings.delivery_speed.toFixed(1)}/11</th>
                                </tr>
                                <tr>
                                    <th>Food quality:</th>
                                    <th><StarRatings
                                        rating={this.props.rest.average_ratings.food_quality}
                                        starRatedColor="red"
                                        numberOfStars={11}
                                        name='food_quality'
                                        starDimension='20px'
                                    /></th>
                                    <th>{this.props.rest.average_ratings.food_quality.toFixed(1)}/11</th>
                                </tr>
                                <tr>
                                    <th>Taste:</th>
                                    <th><StarRatings
                                        rating={this.props.rest.average_ratings.taste}
                                        starRatedColor="red"
                                        numberOfStars={11}
                                        name='taste'
                                        starDimension='20px'
                                    /></th>
                                    <th>{this.props.rest.average_ratings.taste.toFixed(1)}/11</th>
                                </tr>
                                <tr>
                                    <th>Prices:</th>
                                    <th><StarRatings
                                        rating={this.props.rest.average_ratings.prices}
                                        starRatedColor="red"
                                        numberOfStars={11}
                                        name='prices'
                                        starDimension='20px'
                                    /></th>
                                    <th>{this.props.rest.average_ratings.prices.toFixed(1)}/11</th>
                                </tr>
                                <tr>
                                    <th>Waiting time:</th>
                                    <th><StarRatings
                                        rating={this.props.rest.average_ratings.waiting_time}
                                        starRatedColor="red"
                                        numberOfStars={11}
                                        name='waiting_time'
                                        starDimension='20px'
                                    /></th>
                                    <th>{this.props.rest.average_ratings.waiting_time.toFixed(1)}/11</th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        username: state['login'].get('username'),
        token: state['login'].get('token'),
        rest: state['restPage'].get('rest')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadRestInfoEventHandler: (id) =>{
            dispatch(RestPageActions.loadRestInfo(id));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestPage);
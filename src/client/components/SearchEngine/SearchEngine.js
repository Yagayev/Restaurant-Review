import React from 'react';
import '../../utils/App.scss';
import RestSearch from '../RestSearch';
import { connect } from 'react-redux';
import SearchEngineActions from './actions';
import RestSearchActions from "../RestSearch/actions";
import { Button } from 'primereact/button';
import StarRatings from 'react-star-ratings';
import {InputText} from 'primereact/inputtext';
// import {Card} from "react-bootstrap";
import { Redirect } from 'react-router';
import LoginActions from "../Login/actions";
import {Slider} from 'primereact/slider';

class SearchEngine extends React.Component {
    // componentDidMount() {
    //     this.props.loadUserEventHandler()
    // };
    renderRedirect = () => {
        if (!this.props.token||
            !this.props.token === ''||
            !this.props.username||
            !this.props.username === ''
        ) {
            return (<Redirect to='/login' />)
        }
    };

    render() {
        console.log('Search Engine props=', this.props);
        return (
            <div>
                {this.renderRedirect()}
                <div className="app-root">

                    <div className="app-header">
                        <h2>Restr</h2>
                        <InputText value={this.props.name}
                                   onChange={this.props.updateNameEventHandler}/>
                        <br/>
                        <Button
                            label="Search"
                            className="p-button-secondary"
                            onClick={() => this.props.loadRestsEventHandler(propsToParams(this.props))}
                        />
                        <div>
                            {!this.props.advanced && (
                                <Button
                                    label="Advanced"
                                    className="p-button-secondary"
                                    onClick={this.props.advancedOpenHandler}
                                />
                            )}
                        </div>
                        {this.props.advanced && (
                            <div>
                                <div>
                                    <table className="center">
                                        <tbody>
                                            <tr>
                                                <th />
                                                <th style={{fontSize:14}}>
                                                    {this.props.distanceVsScore}:{100-this.props.distanceVsScore}
                                                </th>
                                                <th />
                                            </tr>
                                            <tr>
                                                <th style={{fontSize:14}}>Closer</th>
                                                <th style={{width: '90%'}}><Slider value={this.props.distanceVsScore}
                                                            onChange={this.props.updateDistanceVsScoreEventHandler} />
                                                </th>
                                                <th style={{fontSize:14}}>Better</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

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
                                    label="Close advanced"
                                    className="p-button-danger p-button-rounded"
                                    onClick={this.props.advancedCloseHandler}
                                />
                            </div>
                        )}
                        <div>
                            {!this.props.viewOnMap && (
                                <Button
                                    label="View on map"
                                    className="p-button-secondary"
                                    onClick={this.props.viewMapSetEventHandler}
                                />
                            )}
                            {this.props.viewOnMap && (
                                <Button
                                    label="Close map"
                                    className="p-button-secondary"
                                    onClick={this.props.viewMapUnsetEventHandler}
                                />
                            )}
                        </div>
                    </div>
                    <RestSearch/>
                </div>
            </div>
        );
    }
}

function propsToParams(props){
    return {
        params: {
            name: props.name,
            ratings: props.ratings
        },
        username: props.username,
        token: props.token,
        distanceVsScore: props.distanceVsScore
    }
}

const mapStateToProps = (state) => {
  return {
      name: state['searchEngine'].get('name'),
      advanced: state['searchEngine'].get('advanced'),
      ratings: state['searchEngine'].get('ratings'),
      distanceVsScore: state['searchEngine'].get('distanceVsScore'),
      username: state['login'].get('username'),
      token: state['login'].get('token'),
      viewOnMap: state['searchEngine'].get('viewOnMap')

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNameEventHandler: (e) => {
        console.log("updateNameEventHandler, e=", e);
      dispatch(SearchEngineActions.updateNameAction(e.target.value));
    },
    loadRestsEventHandler: (searchFields) => {
      dispatch(RestSearchActions.loadRestsAction(searchFields))
    },
    updateDistanceVsScoreEventHandler(e){
        dispatch(SearchEngineActions.updateDistanceVsScoreAction(e.value))
    },
    advancedOpenHandler: () => {
      dispatch(SearchEngineActions.advancedOpenAction());
    },
    advancedCloseHandler: () => {
      dispatch(SearchEngineActions.advancedCloseAction());
    },
    updateRatingHandler: (key, rating) =>{
        dispatch(SearchEngineActions.updateRatingAction(key, rating));
    },
    loadUserEventHandler: () =>{
      dispatch(LoginActions.loadUserAction());
    },
    viewMapSetEventHandler: () =>{
        dispatch(SearchEngineActions.viewMapSetAction());
    },
    viewMapUnsetEventHandler: () =>{
      dispatch(SearchEngineActions.viewMapUnsetAction());
    },

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine);

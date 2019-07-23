// TODO
// reviews will go in https://react-bootstrap.github.io/components/accordion/
// where the header will have stars and maybe start of the comment, and the rest in the body

import React from 'react';
import {connect} from "react-redux";
import '../../utils/App.scss';
import { Redirect } from 'react-router';

// import { Navbar, Nav, Form , FormControl, Button  } from 'react-bootstrap'
import UserPageActions from "./actions";
import StarRatings from "react-star-ratings";
import UserPageReview from "../UserPageReview";
// import {Button} from "primereact/button";
import { Button } from 'react-bootstrap';
import {getFromStorage} from "../../utils/storage";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount = () =>{
        // const token = getFromStorage('restorant_review_token');
        // const username = getFromStorage('restorant_review_username');
        this.props.loadUserInfoEventHandler(this.props.token, this.props.username, this.props.match.params.username);
    };

    renderRedirect = () => {
        if (!this.props.token||
            !this.props.token === ''||
            !this.props.username||
            !this.props.username === ''
        ) {
            return (<Redirect to='/login' />)
        }
    };

    render = () => {
        if(this.props.loading){
            return (
                <h3>Loading...</h3>
            )
        }
        return (
            <div>
                {this.renderRedirect()}
                <div className="app-root">
                    <div className="app-header">
                        <h2>{this.props.userViewing.username}</h2>
                        <h4>Location: {this.props.userViewing.location}</h4>
                        <div>
                            {this.props.userViewing.hasWritingPermissions &&(
                                <Button
                                    variant="light"
                                    size="sm"
                                    href={"/editDetails"}
                                >Edit Details</Button>
                            )}
                        </div>
                    </div>
                    <div>
                       <h3>All of {this.props.userViewing.username}'s reviews:</h3>
                    </div>
                    <div>
                        {/*<p>{JSON.stringify(this.props.userViewing.reviews)}</p>*/}
                            {this.props.userViewing.reviews.map((dto, idx) => {
                                return <UserPageReview
                                    key={'review-' + dto.id + idx}
                                    id={idx}
                                    dto={dto}
                                    />;
                            })}
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
        loading: state['userPage'].get('loading'),
        userViewing: state['userPage'].get('userViewing'),

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserInfoEventHandler: (token, username, usertoview) =>{
            dispatch(UserPageActions.loadUserInfo(token, username, usertoview));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
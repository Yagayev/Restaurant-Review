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
import { Button, ListGroup} from 'react-bootstrap';
import {getFromStorage} from "../../utils/storage";
import {InputText} from "primereact/components/inputtext/InputText";

class UserSearch extends React.Component {

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
        // console.log("props users:", this.props.users[0])
        return (
            <div>
                {this.renderRedirect()}
                <div className="app-root">
                    <div className="app-header">
                        <h2>Search users</h2>
                        <InputText
                            id="in"
                            value={this.props.searchQuery}
                            placeholder="Search for user"
                            onChange={(e)=> this.props.searchQueryEventHandler(this.props.token, this.props.username, e.target.value)} />
                    </div>
                    <div>

                        <ListGroup>
                            {this.props.users.map((user) => {

                                // let user = this.props.users[idx];
                                // console.log("mapping", user, idx);
                                return(
                                    <ListGroup.Item action
                                                    variant="light"
                                                    href={"/user/"+user}
                                                    key={user}>
                                        {user}
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
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
        searchQuery: state['userSearch'].get('searchQuery'),
        users: state['userSearch'].get('users')

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchQueryEventHandler: (token, username, searchQuery) =>{
            dispatch(UserPageActions.userSearchQueryAction(token, username, searchQuery));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
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
import { FileUpload } from 'primereact/fileupload';

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

    upload = e => {
        const [ file ] = e.target.files || e.dataTransfer.files;
        this.props.onUpload(file);
    }

    render = () => {
        console.log("user page =", this.props.userViewing);
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
                        <img src={this.props.userViewing.profile_image.url} height={400}/>
                        <h2>{this.props.userViewing.username}</h2>
                        <h4>Location: {this.props.userViewing.location}</h4>

                        {this.props.userViewing.hasWritingPermissions &&(
                            <div>
                                <Button
                                    variant="light"
                                    size="sm"
                                    href={"/editDetails"}
                                >Edit Details</Button>
                                <br />
                                <br />
                                <iframe width="0" height="0" border="0" name="dummyframe"
                                        id="dummyframe"
                                        onLoad={()=> this.props.loadUserInfoEventHandler(this.props.token, this.props.username, this.props.match.params.username)}
                                        style={{"display": "none"}}/>
                                <form action='/api/images/profile'
                                      method="post"
                                      encType="multipart/form-data"
                                      style={{fontSize:12}}
                                      target="dummyframe"
                                      // onsubmit = {()=>{this.props.loadUserInfoEventHandler(this.props.token, this.props.username, this.props.match.params.username)}}
                                      id="form1">
                                    <input type='file' name='image' placeholder='Upload new profile picture'/>
                                    <input type="hidden" id="userId" name="username" value={this.props.username} />
                                    <input type="hidden" id="tokenId" name="token" value={this.props.token} />
                                    <input type="submit" />
                                </form>
                                {/*<input type='file'*/}
                                {/*       name='image'*/}
                                {/*       onChange={*/}
                                {/*           (e)=> this.props.updateFileEventHandler(e.target.files)*/}
                                {/*       }*/}
                                {/*       placeholder='Upload new profile picture'/>*/}
                                {/*<Button*/}
                                {/*    variant="light"*/}
                                {/*    size="sm"*/}
                                {/*    onClick={*/}
                                {/*        ()=>this.props.uploadRequestEventHandler(this.props.new_image, this.props.username, this.props.token)*/}
                                {/*    }>Submit</Button>*/}

                            </div>
                        )}


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
        new_image: state['userPage'].get('new_image'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserInfoEventHandler: (token, username, usertoview) =>{
            dispatch(UserPageActions.loadUserInfo(token, username, usertoview));
        },
        updateFileEventHandler: (f) =>{
            dispatch(UserPageActions.updateFileAction(f));
        },
        uploadRequestEventHandler: (f, username, token) =>{
            dispatch(UserPageActions.uploadRequestAction(f, username, token));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
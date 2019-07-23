import React from 'react';
import '../../utils/App.scss';
// import Gallery from '../Gallery';
import { connect } from 'react-redux';
import UpdateUserDetailsActions from './actions';
import GalleryActions from '../Gallery/actions';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Redirect } from 'react-router';


class UpdateUserDetails extends React.Component {
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
    console.log('update user details: props=', this.props);
      // if (this.props.token != '') {
      //     console
      //     return <App />;
      // }
    return (
        <div>
            {this.renderRedirect()}
            <div className="app-root">

                <div className="app-header">
                    <h3>Updating {this.props.username} user details</h3>

                    <InputText
                      id="inUser"
                      value={this.props.newUsername}
                      placeholder="New username"
                      onChange={this.props.updateUsernameEventHandler} />
                    <br />
                    <InputText
                        id="inLoc"
                        value={this.props.location}
                        placeholder="New location"
                        onChange={this.props.updateLocationEventHandler} />
                    <br />
                    <Password
                        value={this.props.password}
                        placeholder="New password"
                        feedback={false}
                        onChange={this.props.updatePasswordEventHandler} />
                    <br />
                    <Button
                        label="Submit changes"
                        className="p-button-secondary"
                        onClick={
                            () => this.props.submitDetailsEventHandler( this.props.username,
                                                                        this.props.token,
                                                                        this.props.newUsername,
                                                                        this.props.location,
                                                                        this.props.password )}/>
                    {
                        (this.props.message !== '') ? (
                            <p>{this.props.message}</p>
                        ) : (null)
                    }
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
      newUsername: state['updateUserDetails'].get('newUsername'),
      location: state['updateUserDetails'].get('location'),
      submitted: state['updateUserDetails'].get('submitted'),
      password: state['updateUserDetails'].get('password'),
      message: state['updateUserDetails'].get('message'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsernameEventHandler: (e) =>{
      dispatch(UpdateUserDetailsActions.updateNewUsernameAction(e.target.value));
    },
      updateLocationEventHandler: (e) =>{
          dispatch(UpdateUserDetailsActions.updateNewLocationAction(e.target.value));
      },
    updatePasswordEventHandler: (e) =>{
      dispatch(UpdateUserDetailsActions.updatePasswordAction(e.target.value));
    },
    submitDetailsEventHandler: (username, token, newUsername, location, password)  => {
      dispatch(UpdateUserDetailsActions.submitDetailsEventAction(username, token, newUsername, location, password));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserDetails);

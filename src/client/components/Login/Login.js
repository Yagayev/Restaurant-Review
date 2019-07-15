import React from 'react';
import './Login.scss';
// import Gallery from '../Gallery';
import { connect } from 'react-redux';
import LoginActions from './actions';
import GalleryActions from '../Gallery/actions';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Redirect } from 'react-router';


class Login extends React.Component {
    renderRedirect = () => {
        if (this.props.token&&
            this.props.token !== ''&&
            this.props.username&&
            this.props.username !== ''
        ) {
            return (<Redirect to='/' />)
        }
    };

    componentDidMount() {
        this.props.loadUserEventHandler()
    };



  render() {
    console.log('login: props=', this.props);
      // if (this.props.token != '') {
      //     console
      //     return <App />;
      // }
    return (
        <div>
            {this.renderRedirect()}
            <div className="app-root">

                <div className="app-header">
                    <h3>Please log in or sign up</h3>

              <InputText
                  id="in"
                  value={this.props.username}
                  placeholder="Username"
                  onChange={this.props.updateUsernameEventHandler} />
              {/*<label htmlFor="in">Username</label>*/}

                    <br />
                    <Password
                        value={this.props.password}
                        placeholder="Password"
                        feedback={false}
                        onChange={this.props.updatePasswordEventHandler} />
                    <br />
                    <Button
                        label="Log in"
                        className="p-button-raised p-button-rounded"
                        onClick={() => this.props.LoginEventHandler(this.props.username, this.props.password)}
                    />
                    <br />
                    <Button
                        label="Sign up"
                        className="p-button-raised p-button-rounded"
                        onClick={() => this.props.SignupEventHandler(this.props.username, this.props.password)}
                    />
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
      password: state['login'].get('password'),
      message: state['login'].get('message'),
      token: state['login'].get('token')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      loadTagsEventHandler: () => {
          dispatch(LoginActions.loadTagsAction());
      },
    updateTagEventHandler: (e) => {
      dispatch(LoginActions.updateTagAction(e.value));
    },
    loadImagesEventHandler: (tag) => {
      dispatch(GalleryActions.loadImagesAction(tag));
    },
    updateUsernameEventHandler: (e) =>{
      dispatch(LoginActions.updateUsernameAction(e.target.value));
    },
    updatePasswordEventHandler: (e) =>{
      dispatch(LoginActions.updatePasswordAction(e.target.value));
    },
    LoginEventHandler: (username, password)  => {
      dispatch(LoginActions.loginEventAction(username, password));
    },
    SignupEventHandler: (username, password)  => {
      dispatch(LoginActions.signupEventAction(username, password));
    },
    loadUserEventHandler: () =>{
        dispatch(LoginActions.loadUserAction());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

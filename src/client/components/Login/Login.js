import React from 'react';
import './Login.scss';
// import Gallery from '../Gallery';
import { connect } from 'react-redux';
import LoginActions from './actions';
import GalleryActions from '../Gallery/actions';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Password} from 'primereact/password';
import {getFromStorage, setInStorage} from '../../utils/storage';
import { Redirect } from 'react-router';
import App from '../App';

const storage_token_key_name = 'restorant_review_token';

class Login extends React.Component {
    renderRedirect = () => {
        if (this.props.token != '') {
            return <Redirect to='/app' />
        }
    }

    componentDidMount() {
        const token = getFromStorage(storage_token_key_name);
        if(token){
            //varify token

        }
        else{

        }

    }



  render() {
    console.log('render: props=', this.props);
      if (this.props.token != '') {
          console
          return <App />;
      }
    return (
      <div className="app-root">

        <div className="app-header">
          <h2>Sign in</h2>
          <span className="p-float-label">
              <InputText
                id="in"
                value={this.props.username}
                onChange={this.props.updateUsernameEventHandler} />
              <label htmlFor="in">Username</label>
          </span>
          <br />
          <Password
            value={this.props.password}
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
                (this.props.message != '') ? (
                    <p>{this.props.message}</p>
                ) : (null)
            }

          {/*<Dropdown*/}
          {/*    value={this.props.tag}*/}
          {/*    onChange={this.props.updateTagEventHandler}*/}
          {/*    options={this.props.tags}*/}
          {/*    placeholder="insert a tag"*/}
          {/*    editable={true}*/}
          {/*  />*/}
          {/*<Button*/}
          {/*    label="Search"*/}
          {/*    className="p-button-raised p-button-rounded"*/}
          {/*    onClick={() => this.props.loadImagesEventHandler(this.props.tag)}*/}
          {/*/>*/}
        </div>
        {/*<Gallery/>*/}
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
      dispatch(GalleryActions.loadImagesAction(tag))
    },
    updateUsernameEventHandler: (e) =>{
      dispatch(LoginActions.updateUsernameAction(e.target.value))
    },
    updatePasswordEventHandler: (e) =>{
      dispatch(LoginActions.updatePasswordAction(e.target.value))
    },
    LoginEventHandler: (username, password)  => {
      dispatch(LoginActions.loginEventAction(username, password))
    },
    SignupEventHandler: (username, password)  => {
      dispatch(LoginActions.signupEventAction(username, password))
    }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

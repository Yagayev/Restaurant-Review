import React from 'react';
import '../../utils/App.scss';
import { connect } from 'react-redux';
import LoginActions from './actions';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Redirect } from 'react-router';
import {TabView,TabPanel} from 'primereact/tabview';
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";


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
        this.props.loadUserEventHandler();
        this.props.loadLocationsEventHandler();
    };
    suggestLocations(event) {
        let results = this.props.locations.filter((location) => {
            return location.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.props.updateSuggestionsEventHandler(results);
        // this.props.suggestedLocations = results ;
    }
    renderMarker = () =>{
        if(this.props.coords.lat&&this.props.coords.lng){
            return(
                <Marker position={[this.props.coords.lat, this.props.coords.lng]}>
                </Marker>
            )
        }
    };

  render() {
    // console.log('login: props=', this.props);
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
                    <TabView activeIndex={this.props.signupOrLogin}
                             onTabChange={this.props.loginOrSignupEventHandler}
                             className="app-header">
                        <TabPanel header="Login"
                                  className="app-header">
                            <div className="app-header">
                                <InputText
                                    id="in"
                                    value={this.props.username}
                                    placeholder="Username"
                                    onChange={this.props.updateUsernameEventHandler} />
                                <br />
                                <Password
                                    value={this.props.password}
                                    placeholder="Password"
                                    feedback={false}
                                    onChange={this.props.updatePasswordEventHandler} />
                                <br />
                                <Button
                                    label="Log in"
                                    // className="p-button-secondary"
                                    onClick={() => this.props.LoginEventHandler(this.props.username, this.props.password)}
                                />
                                <br />
                                {
                                    (this.props.message !== '') ? (
                                        <p>{this.props.message}</p>
                                    ) : (null)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel header="Sign Up"
                                  className="app-header">
                            <div className="app-header">
                                <InputText
                                    id="in"
                                    value={this.props.username}
                                    placeholder="Username"
                                    onChange={this.props.updateUsernameEventHandler} />
                                <br />
                                <Password
                                    value={this.props.password}
                                    placeholder="Password"
                                    feedback={false}
                                    onChange={this.props.updatePasswordEventHandler} />
                                <br />
                                <AutoComplete value={this.props.loc}
                                              placeholder="Location"
                                              suggestions={this.props.suggestedLocations}
                                              completeMethod={this.suggestLocations.bind(this)}
                                              onChange={this.props.updateLocEventHandler}/>
                                <br />
                                <h5>Please mark your location:</h5>
                                <div>
                                    <LeafletMap
                                        center={[31.262184, 34.803913]}
                                        zoom={12}
                                        maxZoom={19}
                                        attributionControl={true}
                                        zoomControl={true}
                                        doubleClickZoom={true}
                                        scrollWheelZoom={true}
                                        dragging={true}
                                        animate={true}
                                        easeLinearity={0.9}
                                        onClick={this.props.updateCoordsEventHandler}
                                    >
                                        <TileLayer
                                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                        />

                                        {this.renderMarker()}

                                    </LeafletMap>
                                </div>
                                <Button
                                    label="Sign up"
                                    // className="p-button-secondary"
                                    onClick={() => this.props.SignupEventHandler(this.props.username,
                                        this.props.password,
                                        this.props.loc,
                                        this.props.coords.lat,
                                        this.props.coords.lng)}
                                />
                                {
                                    (this.props.message !== '') ? (
                                        <p>{this.props.message}</p>
                                    ) : (null)
                                }
                            </div>

                        </TabPanel>
                    </TabView>
                  {/*<InputText*/}
                  {/*    id="in"*/}
                  {/*    value={this.props.username}*/}
                  {/*    placeholder="Username"*/}
                  {/*    onChange={this.props.updateUsernameEventHandler} />*/}
                  {/*  <br />*/}
                  {/*  <Password*/}
                  {/*      value={this.props.password}*/}
                  {/*      placeholder="Password"*/}
                  {/*      feedback={false}*/}
                  {/*      onChange={this.props.updatePasswordEventHandler} />*/}
                  {/*  <br />*/}
                  {/*  <Button*/}
                  {/*      label="Log in"*/}
                  {/*      className="p-button-secondary"*/}
                  {/*      onClick={() => this.props.LoginEventHandler(this.props.username, this.props.password)}*/}
                  {/*  />*/}
                  {/*  <br />*/}
                  {/*  <Button*/}
                  {/*      label="Sign up"*/}
                  {/*      className="p-button-secondary"*/}
                  {/*      onClick={() => this.props.SignupEventHandler(this.props.username, this.props.password)}*/}
                  {/*  />*/}
                  {/*  {*/}
                  {/*      (this.props.message !== '') ? (*/}
                  {/*          <p>{this.props.message}</p>*/}
                  {/*      ) : (null)*/}
                  {/*  }*/}

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
      token: state['login'].get('token'),
      signupOrLogin: state['login'].get('signupOrLogin'),
      coords: state['login'].get('coords'),
      locations: state['login'].get('locations'),
      suggestedLocations: state['login'].get('suggestedLocations'),
      loc: state['login'].get('loc'),


  }
};

const mapDispatchToProps = (dispatch) => {
  return {

      updateUsernameEventHandler: (e) =>{
          dispatch(LoginActions.updateUsernameAction(e.target.value));
      },
    updatePasswordEventHandler: (e) =>{
      dispatch(LoginActions.updatePasswordAction(e.target.value));
    },
    LoginEventHandler: (username, password)  => {
      dispatch(LoginActions.loginEventAction(username, password));
    },
    SignupEventHandler: (username, password, location, lat, lon)  => {
      dispatch(LoginActions.signupEventAction(username, password, location, lat, lon));
    },
    loadUserEventHandler: () =>{
        dispatch(LoginActions.loadUserAction());
    },

      updateCoordsEventHandler: (e) =>{
          dispatch(LoginActions.updateCoordsAction(e.latlng));
      },
      loadLocationsEventHandler: () =>{
          dispatch(LoginActions.loadLocationsAction());
      },
      updateLocEventHandler: (e) => {
          dispatch(LoginActions.updateLocAction(e.target.value));
      },
      updateSuggestionsEventHandler: (suggestions) =>{
          dispatch(LoginActions.updateSuggestionAction(suggestions));
      },

      loginOrSignupEventHandler: (e) =>{
          dispatch(LoginActions.setLoginSignup(e.index));
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

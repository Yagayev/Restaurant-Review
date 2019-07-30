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
import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import SearchEngineActions from "../SearchEngine/actions";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";


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
    componentDidMount() {
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
    console.log('update user details: props=', this.props);
      // if (this.props.token != '') {
      //     console
      //     return <App />;
      // }
        console.log("update page, submittd?", this.props.submitted);
        if(this.props.submitted){
            return (<Redirect to='/' />)
        }
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
                    <AutoComplete value={this.props.loc}
                                  placeholder="Location"
                                  suggestions={this.props.suggestedLocations}
                                  completeMethod={this.suggestLocations.bind(this)}
                                  onChange={this.props.updateLocEventHandler}/>
                    <br />
                    <Password
                        value={this.props.password}
                        placeholder="New password"
                        feedback={false}
                        onChange={this.props.updatePasswordEventHandler} />
                    <br />

                    <h5>Location:</h5>
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
                        label="Submit changes"
                        className="p-button-secondary"
                        onClick={
                            () => this.props.submitDetailsEventHandler( this.props.username,
                                                                        this.props.token,
                                                                        this.props.newUsername,
                                                                        this.props.loc,
                                                                        this.props.coords,
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
      // location: state['updateUserDetails'].get('location'),
      submitted: state['updateUserDetails'].get('submitted'),
      password: state['updateUserDetails'].get('password'),
      message: state['updateUserDetails'].get('message'),
      coords: state['updateUserDetails'].get('coords'),
      locations: state['updateUserDetails'].get('locations'),
      suggestedLocations: state['updateUserDetails'].get('suggestedLocations'),
      loc: state['updateUserDetails'].get('loc'),
      // redirect: state['updateUserDetails'].get('redirect'),
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
      updateCoordsEventHandler: (e) =>{
        dispatch(UpdateUserDetailsActions.updateCoordsAction(e.latlng));
    },
    submitDetailsEventHandler: (username, token, newUsername, location, coords, password)  => {
      dispatch(UpdateUserDetailsActions.submitDetailsEventAction(username, token, newUsername, location, coords, password));
    },
      loadLocationsEventHandler: () =>{
          dispatch(UpdateUserDetailsActions.loadLocationsAction());
      },
      updateLocEventHandler: (e) => {
          dispatch(UpdateUserDetailsActions.updateLocAction(e.target.value));
      },
      updateSuggestionsEventHandler: (suggestions) =>{
          dispatch(UpdateUserDetailsActions.updateSuggestionAction(suggestions));
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserDetails);

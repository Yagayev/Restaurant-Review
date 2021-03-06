import React from 'react';
import '../../utils/App.scss';
// import Gallery from '../Gallery';
import { connect } from 'react-redux';
import UpdateUserDetailsActions from './actions';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Redirect } from 'react-router';
import {InputTextarea} from "primereact/components/inputtextarea/InputTextarea";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';


class SubmitRest extends React.Component {
    renderRedirect = () => {
        if (!this.props.token||
            !this.props.token === ''||
            !this.props.username||
            !this.props.username === ''
        ) {
            return (<Redirect to='/login' />)
        }
    };

    renderMarker = () =>{
        if(this.props.coords.lat&&this.props.coords.lng){
            return(
                <Marker position={[this.props.coords.lat, this.props.coords.lng]}>
                </Marker>
            )
        }
    };


  render() {
    // console.log('update user details: props=', this.props);
      // if (this.props.token != '') {
      //     console
      //     return <App />;
      // }
        // console.log("rendering submit rest, props.submitted =", this.props.submitted);
      if(this.props.submitted){
          return (
              <Redirect to={'/'} />
          )
      }
    return (
        <div>
            {this.renderRedirect()}
            <div className="app-root">

                <div className="app-header">
                    <h3>Submit a new restaurant</h3>

                    <InputText
                      id="inName"
                      value={this.props.name}
                      placeholder="Name"
                      onChange={this.props.updateNameEventHandler} />
                    <br />
                    <InputText
                        id="inLoc"
                        value={this.props.location}
                        placeholder="Location"
                        onChange={this.props.updateLocationEventHandler} />
                    <br />
                    <InputTextarea
                        placeholder="Description"
                        rows={5}
                        cols={40}
                        value={this.props.description}
                        onChange={this.props.updateDescriptionEventHandler}
                        autoResize={true}
                    />
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

                    <br />
                    <Button
                        label="Submit restaurant"
                        className="p-button-secondary"
                        onClick={
                            () => this.props.submitRestEventHandler( this.props.username,
                                                                        this.props.token,
                                                                        this.props.name,
                                                                        this.props.location,
                                                                        this.props.coords,
                                                                        this.props.description )}/>
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
      name: state['submitRest'].get('name'),
      location: state['submitRest'].get('location'),
      description: state['submitRest'].get('description'),
      submitted: state['submitRest'].get('submitted'),
      coords: state['submitRest'].get('coords'),
      // redirect: state['updateUserDetails'].get('redirect'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      updateNameEventHandler: (e) =>{
      dispatch(UpdateUserDetailsActions.updateNameAction(e.target.value));
    },
      updateLocationEventHandler: (e) =>{
          dispatch(UpdateUserDetailsActions.updateNewLocationAction(e.target.value));
      },
      updateDescriptionEventHandler: (e) =>{
      dispatch(UpdateUserDetailsActions.updateDescriptionAction(e.target.value));
    },
    updateCoordsEventHandler: (e)  => {
      dispatch(UpdateUserDetailsActions.updateCoordsAction(e.latlng));
    },
    submitRestEventHandler: (username, token, name, location, coords, description)  => {
      dispatch(UpdateUserDetailsActions.submitRestAction(username, token, name, location, coords, description));
    },

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitRest);

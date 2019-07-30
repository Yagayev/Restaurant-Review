import React from 'react';
import { Lightbox } from 'react-modal-image';
// import Image from '../Image';
// import './Gallery.scss';
import {connect} from 'react-redux';
import RestSearchActions from '../RestSearch/actions';
import RestPreview from '../RestPreview'
import RestMapPreview from '../RestMapPreview'
import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";



class RestSearch extends React.Component {


  static getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }


  // componentDidMount() {
  //   this.props.updateGalleryWidthEventHandler(RestSearch.getGalleryWidth());
  // }
  renderMap() {
    return(
        <div>
          <LeafletMap
              className="full-size-map"
              center={[this.props.lat, this.props.lng]}
              zoom={13}
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
            {/*<Marker position={[this.props.rest.lat, this.props.rest.lon]}>*/}
            {/*</Marker>*/}
            {this.props.rests.map((dto, idx) => {return (
                <RestMapPreview
                  key={'map-preview-' + dto.id + idx}
                  id={idx}
                  dto={dto}/>
            )})}

          </LeafletMap>
        </div>
    )
  }

  render() {
    if(this.props.viewOnMap){
      return this.renderMap()
    }
    return (
      <div className="rest-search-root">
        {/*{this.props.viewOnMap && (*/}
        {/*    <div>*/}
        {/*      {this.renderMap()}*/}
        {/*      <br />*/}
        {/*    </div>)*/}
        {/*}*/}
        {this.props.rests.map((dto, idx) => {
          return <RestPreview
            key={'image-' + dto.id + idx}
            id={idx}
            dto={dto}
            />;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    rests: state['restSearch'].get('rests'),
    lat: state['restSearch'].get('lat'),
    lng: state['restSearch'].get('lng'),
    token: state['login'].get('token'),
    username: state['login'].get('username'),
    viewOnMap: state['searchEngine'].get('viewOnMap')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // goToRestEventHandler: (idx) => {
    //   dispatch(RestSearchActions.goToRest(idx))
    // },
    // loadRestsEventHandler: (searchFields) => {
    //   dispatch(RestSearchActions.loadRestsAction(searchFields))
    // }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestSearch);

import React from 'react';
import { Lightbox } from 'react-modal-image';
// import Image from '../Image';
// import './Gallery.scss';
import {connect} from 'react-redux';
import RestSearchActions from '../RestSearch/actions';

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

  render() {
    return (
      <div className="rest-search-root">
        {this.props.rests.map((dto, idx) => {
          return <Image
            key={'image-' + dto.id + idx}
            id={idx}
            dto={dto}
            handleGoToRest={idx => this.props.goToRestEventHandler(idx)}
            galleryWidth={this.props.galleryWidth}/>;
        })}
        {this.props.openLightBox && (
          <Lightbox
            medium={Image.urlFromDto(this.props.images.get(this.props.activeImage))}
            large={Image.urlFromDto(this.props.images.get(this.props.activeImage))}
            onClose={() => this.props.applyCloseLightBoxEventHandler(this.props.activeImage)}
          />)}

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    rests: state['restSearch'].get('rests'),
    token: state['login'].get('token'),
    username: state['login'].get('username')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToRestEventHandler: (idx) => {
      dispatch(RestSearchActions.goToRest(idx))
    },
    loadRestsEventHandler: (searchFields) => {
      dispatch(RestSearchActions.loadRestsAction(searchFields))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestSearch);

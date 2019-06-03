import React from 'react';
import {connect} from 'react-redux';
import GalleryActions from '../Gallery/actions';
import {Button} from 'primereact/button';

import './Image.scss';

class Image extends React.Component {
  calcImageSize() {
    const galleryWidth = this.props.galleryWidth;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    return galleryWidth / imagesPerRow;
  }

  static urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  render() {
    let size = this.calcImageSize();
    return (
      <div
        className="image-root"
        style={{
          backgroundImage: `url(${Image.urlFromDto(this.props.image)})`,
          filter: this.props.activeFilter,
          width: size + 'px',
          height: size + 'px'
        }}
      >
        <div>
          <Button
              icon="pi pi-clone"
            onClick={() => this.props.onClickClone(this.props.id)}/>
          <Button
              icon="pi pi-filter"
            onClick={() => this.props.onClickApplyFilter(this.props.id)}/>
          <Button
              icon="pi pi-th-large"
            onClick={() => this.props.onClickOpenLightBox(this.props.id)}/>
          <Button
              icon="pi pi-trash"
            onClick={() => this.props.onClickDelete(this.props.id)}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    image: state['gallery'].getIn(['images', props.id]),
    id: props.id,
    size: state['app'].get('size'),
    activeFilter: state['gallery'].getIn(['activeFilter', props.id]),
    galleryWidth: state['gallery'].get('galleryWidth')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickClone: (idx) => {
      dispatch(GalleryActions.cloneAction(idx))
    },
    onClickApplyFilter: (idx) => {
      dispatch(GalleryActions.applyFilterAction(idx))
    },
    onClickDelete: (idx) => {
      dispatch(GalleryActions.deleteAction(idx))
    },
    onClickOpenLightBox: (idx) => {
      dispatch(GalleryActions.setActiveImage(idx))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Image);

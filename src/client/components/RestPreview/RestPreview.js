import React from 'react';
import {connect} from 'react-redux';
import GalleryActions from '../Gallery/actions';
import {Button} from 'primereact/button';
import { Card } from 'react-bootstrap'
// import './RestPreview.scss';
import StarRatings from './react-star-ratings';

class RestPreview extends React.Component {
  // calcImageSize() {
  //   const galleryWidth = this.props.galleryWidth;
  //   const targetSize = 200;
  //   const imagesPerRow = Math.round(galleryWidth / targetSize);
  //   return galleryWidth / imagesPerRow;
  // }
  //
  // static urlFromDto(dto) {
  //   return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  // }

  render() {
    // let size = this.calcImageSize();

    // star rating taken from: https://www.npmjs.com/package/react-star-ratings
    return (
        <div>
          <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
              <StarRatings
                  rating={this.state.rating}
                  starRatedColor="red"
                  changeRating={this.changeRating}
                  numberOfStars={11}
                  name='rating'
              />
              <Button variant="Dark">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>


      // <div
      //   className="image-root"
      //   style={{
      //     backgroundImage: `url(${RestPreview.urlFromDto(this.props.image)})`,
      //     filter: this.props.activeFilter,
      //     width: size + 'px',
      //     height: size + 'px'
      //   }}
      // >
      //   <div>
      //     <Button
      //         icon="pi pi-clone"
      //       onClick={() => this.props.onClickCloneEventHandler(this.props.id)}/>
      //     <Button
      //         icon="pi pi-filter"
      //       onClick={() => this.props.onClickApplyFilterEventHandler(this.props.id)}/>
      //     <Button
      //         icon="pi pi-th-large"
      //       onClick={() => this.props.onClickOpenLightBoxEventHandler(this.props.id)}/>
      //     <Button
      //         icon="pi pi-trash"
      //       onClick={() => this.props.onClickDeleteEventHandler(this.props.id)}/>
      //   </div>
      // </div>
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
    onClickCloneEventHandler: (idx) => {
      dispatch(GalleryActions.cloneAction(idx))
    },
    onClickApplyFilterEventHandler: (idx) => {
      dispatch(GalleryActions.applyFilterAction(idx))
    },
    onClickDeleteEventHandler: (idx) => {
      dispatch(GalleryActions.deleteAction(idx))
    },
    onClickOpenLightBoxEventHandler: (idx) => {
      dispatch(GalleryActions.setActiveImage(idx))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestPreview);

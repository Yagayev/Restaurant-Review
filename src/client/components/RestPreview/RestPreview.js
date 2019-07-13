import React from 'react';
import {connect} from 'react-redux';
import RestSearchActions from '../RestSearch/actions';
import {Button} from 'react-bootstrap';
import { Card } from 'react-bootstrap'
// import './RestPreview.scss';
import StarRatings from 'react-star-ratings';

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
            <Card.Header>{this.props.rest.name}</Card.Header>
            <Card.Body>
              {/*<Card.Title>Special title treatment</Card.Title>*/}
              <Card.Text>
                Location: {this.props.rest.location}
              </Card.Text>
              <StarRatings
                  rating={this.props.rest.average_ratings.overall}
                  starRatedColor="red"
                  numberOfStars={11}
                  name='overall'
                  starDimension='25px'
              />
              <Card.Text> {this.props.rest.average_ratings.overall.toFixed(2)}/11</Card.Text>
              <Button
                  variant="dark"
                  size="sm"
                  onClick={() => this.props.onClickGoToRestEventHandler(this.props.id)}
              >View restaurant</Button>
            </Card.Body>
          </Card>
          <br />
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
    rest: state['restSearch'].getIn(['rests', props.id]),
    id: props.id,
    token: state['login'].get('token'),
    username: state['login'].get('username')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickGoToRestEventHandler: (idx) => {
      dispatch(RestSearchActions.goToRestAction(idx))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestPreview);

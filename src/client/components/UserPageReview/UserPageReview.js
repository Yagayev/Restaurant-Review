import React from 'react';
import {connect} from 'react-redux';
// import './UserPreview.scss';
import StarRatings from 'react-star-ratings';
import {Button, Card} from 'react-bootstrap'
import '../../utils/App.scss';
import UserPageActions from "../UserPage/actions";
import {Lightbox} from 'primereact/lightbox';


class UserPageReview extends React.Component {


  render() {

    // star rating taken from: https://www.npmjs.com/package/react-star-ratings

    if(this.props.loading){
      return (
          <h3>Loading...</h3>
      );
    }
    const restId = this.props.review.restaurant._id;
    const restName = this.props.review.restaurant.name;
    const restLink = <a href={'/rest/'+restId}>{restName}</a>;
    let description = null;
    if (this.props.review.description!==''){
      description = (<Card.Text>{'\"'+this.props.review.description+'\"'}</Card.Text>)
    }

    return (
        <div>
          <Card>
            <Card.Header>{restLink}</Card.Header>
            <Card.Body>
              {description}

              <div>
                <table style={{fontSize:15}} className="center">
                  <tbody>
                  <tr >
                    <th>Overall:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.overall}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='overall'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.overall}/11</th>
                  </tr>
                  <tr>
                    <th>Staff kindness:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.staff_kindness}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='staff_kindness'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.staff_kindness}/11</th>
                  </tr>
                  <tr>
                    <th>Cleanliness:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.cleaniness}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='cleaniness'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.cleaniness}/11</th>
                  </tr>
                  <tr>
                    <th>Drive thru quality:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.drive_thru_quality}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='drive_thru_quality'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.drive_thru_quality}/11</th>
                  </tr>
                  <tr>
                    <th>Delivery speed:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.delivery_speed}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='delivery_speed'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.delivery_speed}/11</th>
                  </tr>
                  <tr>
                    <th>Food quality:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.food_quality}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='food_quality'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.food_quality}/11</th>
                  </tr>
                  <tr>
                    <th>Taste:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.taste}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='taste'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.taste}/11</th>
                  </tr>
                  <tr>
                    <th>Prices:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.prices}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='prices'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.prices}/11</th>
                  </tr>
                  <tr>
                    <th>Waiting time:</th>
                    <th><StarRatings
                        rating={this.props.review.ratings.waiting_time}
                        starRatedColor="red"
                        numberOfStars={11}
                        name='waiting_time'
                        starDimension='20px'
                    /></th>
                    <th>{this.props.review.ratings.waiting_time}/11</th>
                  </tr>
                  </tbody>
                </table>
              </div>

              {
                this.props.review.photos && this.props.review.photos.map((dto, idx) => {
                  return <img src={dto.url}
                              className='image-preview'
                              key={'review-photo-preview' + dto.id + idx}
                              id={idx}
                              dto={dto}
                  />
                  // <Lightbox type="content"
                  //                  style={{'display': 'inline-block'}}
                  //     // className="lightbox"
                  //                  target={<img src={dto.url}
                  //                               className='image-preview'
                  //                               key={'review-photo-preview' + dto.id + idx}
                  //                               id={idx}
                  //                               dto={dto}
                  //                  />}>
                  //   <img src={dto.url}
                  //        key={'review-photo-full' + dto.id + idx}
                  //        id={idx}
                  //        dto={dto}
                  //   />
                  // </Lightbox>

                })
              }
              {this.props.hasWritingPermissions && (
                <div>
                  <br />
                  <h6>Add another photo:</h6>
                  <iframe width="0" height="0" border="0" name={"dummyframe"+this.props.id}
                          id={"dummyframe"+this.props.id}
                          onLoad={()=> this.props.loadUserInfoEventHandler(this.props.token, this.props.username, this.props.username)}
                          style={{"display": "none"}}/>
                  <form action='/api/images/review'
                        method="post"
                        target={"dummyframe"+this.props.id}
                        encType="multipart/form-data"
                        style={{fontSize:12}}
                      // onsubmit = {()=>{this.props.loadUserInfoEventHandler(this.props.token, this.props.username, this.props.match.params.username)}}
                        id="form1">
                    <input type='file' name='image' placeholder='Upload new profile picture'/>
                    <input type="hidden" id="userId" name="username" value={this.props.username} />
                    <input type="hidden" id="tokenId" name="token" value={this.props.token} />
                    <input type="hidden" id="tokenId" name="reviewid" value={this.props.review._id} />
                    <input type="submit" />
                  </form>

                  <br />
                  <Button
                      variant="dark"
                      size="sm"
                      href={"/addreview/"+this.props.review.restaurant.name}
                  >Edit review</Button>
                  <a>    </a>
                  <Button
                      variant="danger"
                      size="sm"
                      onClick={()=>
                          this.props.deleteReviewEventHandler(this.props.token,
                                                              this.props.username,
                                                              this.props.review._id,
                                                              this.props.review.restaurant._id)
                      }
                  >Delete review</Button>
                </div>
              )}
            </Card.Body>
          </Card>
          <br />
        </div>

    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    review: state['userPage'].getIn(['userViewing', 'reviews', props.id]),
    id: props.id,
    token: state['login'].get('token'),
    username: state['login'].get('username'),
    loading: state['userPage'].get('loading'),
    hasWritingPermissions: state['userPage'].getIn(['userViewing', 'hasWritingPermissions'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onClickGoToUserEventHandler: (idx) => {
    //   dispatch(UserSearchActions.goToUserAction(idx))
    // }
    deleteReviewEventHandler: (token, username, reviewid, restid) => {
      dispatch(UserPageActions.deleteReviewAction(token, username, reviewid, restid));
    },
    loadUserInfoEventHandler: (token, username, usertoview) =>{
      dispatch(UserPageActions.loadUserInfo(token, username, usertoview));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPageReview);

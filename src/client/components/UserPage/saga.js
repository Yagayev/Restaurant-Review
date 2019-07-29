import { UserPageActionsConstants } from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import UserPageActions from './actions'


function* loadUserInfo(action){
    console.log('loadUserInfo=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'token': action.payload.token,
                    'username': action.payload.username,
                    'usertoview': action.payload.usertoview
                }
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(UserPageActions.loadUserInfoSuccessAction(json));
    } catch (e) {
        yield put(UserPageActions.loadUserInfoFailureAction(e.message));
    }
}



function* deleteReview(action){
    console.log('delete review=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'token': action.payload.token,
                    'username': action.payload.username,
                    'reviewid': action.payload.reviewid,
                    'restid': action.payload.restid
                }
            });

        const json = yield call([res, 'json']); //retrieve body of response
        console.log("return delete review,", json);
        yield put(UserPageActions.loadUserInfo(action.payload.token, action.payload.username, action.payload.username));
    } catch (e) {
        yield put(UserPageActions.loadUserInfoFailureAction(e.message));
    }
}
//
// function createUploadFileChannel(endpoint, payload) {
//     var {file, username, token} = payload;
//     return eventChannel(emitter => {
//             const xhr = new XMLHttpRequest();
//             xhr.responseType = "json";
//
//             const onFailure = (e) => {
//                 emitter({err: new Error('Upload failed')});
//                 emitter(END);
//             };
//
//             xhr.upload.addEventListener("error", onFailure);
//             xhr.upload.addEventListener("abort", onFailure);
//             xhr.onreadystatechange = () => {
//                 const {readyState, status} = xhr;
//                 if (readyState === 4) {
//                     if (status === 200) {
//                         emitter({success: true, response: xhr.response});
//                         emitter(END);
//                     } else {
//                         onFailure(null);
//                     }
//                 }
//             };
//
//             xhr.open("POST", endpoint, true);
//
//             let formData = new FormData();
//             formData.append('filename', file.filename);
//             formData.append('buffer', file.data);
//             formData.append('username', username);
//             formData.append('token', token);
//             xhr.send(formData);
//
//             return () => {
//                 xhr.upload.removeEventListener("error", onFailure);
//                 xhr.upload.removeEventListener("abort", onFailure);
//                 xhr.onreadystatechange = null;
//                 xhr.abort();
//             };
//         },
//         buffers.sliding(2));
// }
//
// function* uploadRequest(action) {
//     console.log('uploadRequest=', action);
//
//     const channel = yield call(createUploadFileChannel, '/api/upload/file', action.payload);
//     const result = yield take(channel);
//
//     if (result.success)
//         action.payload.imageURL = result.response.url.replace(/\\/g,"/");
//     yield put({type: UserPageActionsConstants.UPLOAD_SUCCESS, payload: {...action}});
//     if (result.err)
//         yield put({type: UserPageActionsConstants.UPLOAD_FAILURE, payload: {file: action.payload.file, err: result.err}});
// }

// export function* uploadFile(action) {
//     const channel = yield call(fetch, action.uri, {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             token: action.payload.token,
//             username: action.payload.username,
//             file: action.payload.file
//         })
//     });
//     while (true) {
//         const { progress = 0, err, success } = yield take(channel);
//         if (err) {
//             yield put(uploadFailure(file, err));
//             return;
//         }
//         if (success) {
//             yield put(uploadSuccess(file));
//             return;
//         }
//         yield put(uploadProgress(file, progress));
//     }
// }


function* UserPageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(UserPageActionsConstants.LOAD_USER_INFO, loadUserInfo);
    yield takeEvery(UserPageActionsConstants.DELETE_USER_REVIEW, deleteReview);
    // yield takeEvery(UserPageActionsConstants.UPLOAD_REQUEST, uploadRequest);
}

export default UserPageSaga;

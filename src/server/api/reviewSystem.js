let User = require('../model/user');
let UserSession = require('../model/userSession');
let Review = require('../model/Review');
let Restaurant = require('../model/Restaurant');

/*TODO for this file:
* move some of the functionality to more appropriate files(maybe refactor this and signin.js into 3 files)
* add checks that every request consists only legal requests(assume malicious client)
* possibly - to change the rest upload to only new rests, or perhaps allow both new and update but under different URIs.
* */


module.exports = (app) => {
    app.post('/api/reviews/uploadReview', function(req, res) {
        /*example query:
        {
          "restaurant": "booznakasd",
          "reviewer": "tapuz",
          "token": "5d11769317381d2fe057f051",
          "description": "decent",
          "ratings": {
            "overall": 1,
            "staff_kindness": 3,
            "cleaniness": 5,
            "drive_thru_quality": 4,
            "delivery_speed": 5,
            "food_quality": 9,
            "taste": 9,
            "prices": 7,
            "waiting_time": 11
          }
        }
         */

        const {body} = req;
        const err = verifyAllReviewFields(res, body);
        if(err){
            return err;
        }
        // verify user
        verifySession(body.token, body.reviewer, res, (user)=>{
            // find matching review to user and restaurant
            Restaurant.findOne({name: body.restaurant}, (err0, rest)=>{
                if(err0){
                    return res.send({
                        success: false,
                        message: 'Error 1119: Server error'
                    });
                }
                Review.findOneAndUpdate({
                        reviewer: user,
                        restaurant: rest
                    },
                    {
                        viewer: user,
                        restaurant: rest,
                        ratings: body.ratings,
                        description: body.description
                    },
                    {   //settings
                        upsert: true, //if exists update, else create
                        new: true
                    },
                    (err, docs) =>{
                        if(err){
                            res.send({
                                success: false,
                                message: 'Error 1120: Server error'
                            });
                        }
                        else{
                            updateRestRatings(rest.id);
                            return res.send({
                                success: true,
                                message: 'Review of \"' + body.reviewer + '\" for \"' + body.restaurant + '\" successfully created/updated',
                            });
                        }
                    })
            });


            // add to restaurant's reviews and update restaurant's review averages
        });

    });
    app.post('/api/reviews/newRestaurant', function(req, res) {
        const {body} = req;

        // 2 versions:
        // create if not exist, update if does
        Restaurant.findOneAndUpdate({
                name: body.name
            },
            {$set:{
                name: body.name,
                location: body.location
            }},
            { upsert: true},
            (err) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error 1103: Server error'
                    });
                } else {
                    return res.send({
                        success: true,
                        message: 'Restaurant \"' + body.name + '\"  successfully created',
                    });
                }
            });

        //create if not exist, return error if does
        // Restaurant.find({
        //     name: body.name
        // }, (err, docs) =>{
        //     if(err) {
        //         return res.send({
        //             success: false,
        //             message: 'Error 1103: Server error'
        //         });
        //     }
        //
        //     if(!docs || docs.length == 0){
        //         //if not exists create
        //         const newRest = new Restaurant();
        //         newRest.name = body.name;
        //         newRest.location = body.location;
        //         newRest.save((err, seesion) => {
        //             if (err) {
        //                 return res.send({
        //                     success: false,
        //                     message: 'Error 1104: Server error'
        //                 });
        //             }
        //             return res.send({
        //                 success: true,
        //                 message: 'Restaurant \"' + body.name + '\"  successfully created',
        //                 token: seesion.id
        //             });
        //         });
        //     }
        //     else{
        //         res.send({
        //             success: false,
        //             message: 'Error 1104: Restaurant \"'+body.name+'\" already exists'
        //         });
        //     }
        // });



    });

    app.post('/api/reviews/findRestaurants', function(req, res) {
        /* example query:
        {
          "params":{
            "name": "t",
            "ratings": {
              "overall": 5
            },
          "username": "tapuz",
          "token": "5d11769317381d2fe057f051",
          "distanceVsScore": 0
        }
}*/
        const {body} = req;
        let {params, distanceVsScore, sortBy, token, username} = body;
        console.log(req);
        verifySession(token, username, res, (user) => {
            Restaurant.find(paramsToFilter(params), (err, docs) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error 1130: Server error'
                    });
                }
                var sorted = sortRests(distanceVsScore, docs, user);
                return res.send(sorted);
            })
        });
    });

    app.get('/api/account/viewUser', function(req, res) {
        /* example:
        {header: {
        Content-Type: application/json
            username: tapuz
            token: 5d11769317381d2fe057f051
            usertoview: tapuz
            }
        }
        */
        let {headers} = req;
        let {token, username, usertoview} = headers;
        console.log("looking up:"+ usertoview,token, username);
        let userToView = usertoview;
        verifySession(token, username, res, (user) => {
            User.findOne({username: userToView}, (err, u)=>{
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error 1135: Server error'
                    });
                }
                if(!u){
                    return res.send({
                        success: false,
                        message: 'Error 1136: user '+ userToView +' does not exist'
                    });
                }
                var retUser =  u.toObject();
                delete retUser.password;

                let writePermissions = userToView===username;
                retUser.hasWritingPermissions = writePermissions;
                Review.find({reviewer: retUser._id})
                    // .populate('reviewer') //probably redundant because it's the same user?
                    .populate('restaurant')
                    .exec((err2, docs)=>{
                    if (err2) {
                        return res.send({
                            success: false,
                            message: 'Error 1137: Server error'
                        });
                    }
                    retUser.reviews = docs;
                    console.log(retUser);
                    return res.send({
                        success: true,
                        user: retUser
                    });
                });
            });

        });
    });
    app.get('/api/reviews/viewRestaurant', function(req, res) {
        let {headers} = req;
        let {restid} = headers;
        Restaurant.findOne({_id: restid}, (err, r)=>{
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error 1138: Server error'
                });
            }
            if(!r){
                return res.send({
                    success: false,
                    message: 'Error 1139: user '+ userToView +' does not exist'
                });
            }
            var retRest =  r.toObject();
            Review.find({restaurant: restid})
            // .populate('reviewer') //probably redundant because it's the same user?
                .populate('reviewer')
                .exec((err, docs)=>{
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Error 1140: Server error'
                        });
                    }
                    console.log(docs);
                    let reviews = new Array();



                    docs.map((review)=>{
                        let r = review.toObject();

                        delete r.reviewer.password;
                        reviews.push(r);
                    });

                    retRest.reviews = reviews;
                    // console.log(retRest);
                    return res.send({
                        success: true,
                        rest: retRest
                    });

                });
            });

        });
    app.post('/api/account/updateDetails', function(req, res) {
        // verify user
        let {body} = req;
        let {token, username, updates} = body;

        verifySession(token, username, res, (user)=>{
            if(updates.password){
                updates.password = user.generateHash(updates.password);
            }
            User.updateOne({_id: user._id}, {$set: updates}, (err, docs)=>{
                if(err){
                    return res.send({
                        success: false,
                        message: 'Error 1141: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'successfully updated '+username
                });
            });
        });
    });
}



function verifySession(token, username, res, continuation) {
    UserSession.find({
        _id: token,
    })
        .populate('user')
        .exec((err, sessions) =>{
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error 1100: Server error'
                });
            }
            if (sessions.length != 1) {
                console.log("sessions:", sessions);
                return res.send({
                    success: false,
                    message: 'Error 1101: Not a valid session'
                });
            }
            if(sessions[0].user.username !== username){
                return res.send({
                    success: false,
                    message: 'Error 1102: username mismatch'
                });
            }
            return continuation(sessions[0].user);
        })
}

function verifyAllReviewFields(res, body){
    if(!body.reviewer||!validStr(body.reviewer)){
        return res.send({
            success: false,
            message: 'Error 1200: illigal username'
        });
    }

    if(!body.restaurant||!validStr(body.restaurant)){
        return res.send({
            success: false,
            message: 'Error 1201: illigal restaurant'
        });
    }
    // description is not required, but if it is there it must be valid
    if(body.description&&!validStr(body.description)){
        return res.send({
            success: false,
            message: 'Error 1202: illigal description'
        });
    }
    if(body.ratings
        &&validNum(body.ratings.overall)
        &&validNum(body.ratings.staff_kindness)
        &&validNum(body.ratings.cleaniness)
        &&validNum(body.ratings.drive_thru_quality)
        &&validNum(body.ratings.delivery_speed)
        &&validNum(body.ratings.food_quality)
        &&validNum(body.ratings.taste)
        &&validNum(body.ratings.prices)
        &&validNum(body.ratings.waiting_time)
    ){
        //ratings are valid
        return false; //no error
    }
    return res.send({
        success: false,
        message: 'Error 1203: ratings are not valid'
    });
}

function validStr(str){
    // require:
    // at least 4 chars long
    // allowed:
    // letters
    // numbers
    // ! @ !@#$%^&*()
    return str.match("^[A-Z, .!@#$%^\\&\\*\\(\\)a-z0-9]{4}[A-Z, .!@#$%^\\&\\*\\(\\)a-z0-9]*");
}

function validNum(num){

    return num
        && typeof(num) === "number"
        && num >=0
        && num <= 11; //this go up to eleven
}

function paramsToFilter(params){
    var filter = {};
    // if(!params){
    //     return filter;
    // }
    if(params.name){
        filter.name = {
            "$regex": params.name,
            "$options": "i"
        };
    }
    if(params.ratings){
        Object.keys(params.ratings).map(function(key, index) {
            filter["average_ratings."+key] = {
                '$gte': params.ratings[key]
            };
        });
    }
    if(params.location){
        fliter.location = params.location;
    }
    return filter;

}

var ratings_dict = {   overall: {
            type: Number,
            default: 0
        },
        staff_kindness: {
            type: Number,
            default: 0
        },
        cleaniness: {
            type: Number,
            default: 0
        },
        drive_thru_quality: {
            type: Number,
            default: 0
        },
        delivery_speed: {
            type: Number,
            default: 0
        },
        food_quality: {
            type: Number,
            default: 0
        },
        taste: {
            type: Number,
            default: 0
        },
        prices: {
            type: Number,
            default: 0
        },
        waiting_time: {
            type: Number,
            default: 0
        }
    };
async function updateRestRatings(id) {
    var reviews = await Review.find({"restaurant": id});
    if (!reviews||reviews.length===0){
        return;
    }
    var ratings = {};
    const len = reviews.length;
    Object.keys(ratings_dict).map(function(key, index) {
        ratings[key] = reviews.reduce((accumulator, review) => {
            return accumulator + review.ratings[key];
        }, 0);
        ratings[key] = ratings[key]/len;
    });
    Restaurant.updateOne({_id: id}, {$set: {average_ratings: ratings}}, (err, docs) => {
        return;
        // only works when there is a callback
        // otherwise it does not update
        // it does work to use:
        // ratings["average_ratings"+key] on setting, and passing {$set: ratings}
    });

}

function sortRests(distanceVsScore, docs, user) {
    var score = (rest)=>{
        let distance = getDistance(user,rest);
        let score = rest.average_ratings.overall;
        return 5*(1-distanceVsScore) * score - distanceVsScore * distance;
    };
    var sorter = (a,b) => score(b)-score(a);
    return docs.sort(sorter);
}

function getDistance(pointA, pointB){
    //TODO messure the distance
    return 0;
}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

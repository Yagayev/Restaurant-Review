let User = require('../model/User');
let UserSession = require('../model/UserSession');
let Review = require('../model/Review');
let Restaurant = require('../model/Restaurant');
let Locations = require('../model/Locations');

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");



/*TODO for this file:
* move some of the functionality to more appropriate files(maybe refactor this and signin.js into 3 files)
* add checks that every request consists only legal requests(assume malicious client)
* */

// those are placeholders, replace with actual clodinary details
cloudinary.config({
    cloud_name: 'dfdtghlqz',
    api_key: 458841873635211,
    api_secret: '0lSymMcWVO6DAg_QM7TfJuff0F4'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "restr",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 800, height: 800, crop: "limit" }]
});
const parser = multer({ storage: storage });

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
        // console.log("submit review body", body);
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
                        description: body.description,
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
                            // console.log("restid:", rest.id);
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

    app.get('/api/reviews/deleteReview', function(req, res) {
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

        const {headers} = req;
        const {token, username, reviewid, restid} = headers;

        // verify user
        verifySession(token, username, res, (user) => {
            // find matching review to user and restaurant


            Review.findOneAndDelete({_id: reviewid, 'reviewer': user}, (err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error 1180: Server error'
                    });
                }
                doc.photos.map((img) => {
                    cloudinary.v2.uploader.destroy(img.public_id);
                });

                updateRestRatings(restid);
                // console.log("restid2:", restid);
                return res.send({
                    success: true,
                    message: 'Review ' + reviewid + ' of ' + username + 'for successfully deleted',
                });

            });
        });
    });

    app.post('/api/reviews/newRestaurant', function(req, res) {
        const {body} = req;

        // 2 versions:
        // create if not exist, update if does
        // Restaurant.findOneAndUpdate({
        //         name: body.name
        //     },
        //     {$set:{
        //         name: body.name,
        //         location: body.location,
        //         description: body.description
        //     }},
        //     { upsert: true},
        //     (err) => {
        //         if (err) {
        //             return res.send({
        //                 success: false,
        //                 message: 'Error 1103: Server error'
        //             });
        //         } else {
        //             return res.send({
        //                 success: true,
        //                 message: 'Restaurant \"' + body.name + '\"  successfully created',
        //             });
        //         }
        //     });
        // second version:
        //create if not exist, return error if does
        Restaurant.find({
            name: body.name
        }, (err, docs) =>{
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error 1103: Server error'
                });
            }

            if(!docs || docs.length == 0){
                //if not exists create
                const newRest = new Restaurant();
                newRest.name = body.name;
                newRest.location = body.location;
                newRest.description = body.description;
                newRest.lat = body.lat;
                newRest.lon= body.lon;
                updateLocations(body.location);
                newRest.save((err, seesion) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Error 1104: Server error'
                        });
                    }
                    return res.send({
                        success: true,
                        message: 'Restaurant \"' + body.name + '\"  successfully created',
                        token: seesion.id
                    });
                });
            }
            else{
                res.send({
                    success: false,
                    message: 'Error 1104: Restaurant \"'+body.name+'\" already exists'
                });
            }
        });



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
        const { searchCriteria } = body;
        let {params, distanceVsScore, sortBy, token, username} = searchCriteria;
        verifySession(token, username, res, (user) => {
            if(params.location){
                updateLocations(params.location);
            }
            Restaurant.find(paramsToFilter(params), (err, docs) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error 1130: Server error'
                    });
                }
                var sorted = sortRests(distanceVsScore, docs, user);
                return res.send({
                    rests: sorted,
                    lng: user.lon,
                    lat: user.lat
                });
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
        // console.log("looking up:"+ usertoview,token, username);
        let userToView = usertoview;
        verifySession(token, username, res, (user) => {
            User.findOne({username: userToView})
                // .populate('profile_image')
                .exec((err, u)=>{
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
                        // console.log(retUser);
                        return res.send({
                            success: true,
                            user: retUser
                        });
                    });
            });

        });
    });

    app.get('/api/account/userSearch', function(req, res) {
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
        let {token, username, searchquery} = headers;
        // console.log("looking up:"+ usertoview,token, username);



        verifySession(token, username, res, (user) => {
            User.find({username: {"$regex": searchquery, "$options": "i" }}, (err, users)=>{
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error 1182: Server error'
                    });
                }

                var retUsers = [];
                users.map((x)=>{
                    if(!retUsers.includes(x.username)){
                        retUsers.push(x.username);
                    }
                });
                return res.send({
                    success: true,
                    users: retUsers
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
                    // console.log(docs);
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
            if(body.location){
                updateLocations(body.location);
            }
            if(updates.username){
                User.find({
                    username: updates.username
                }, (err, existingUsers) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Error 1060: Server error'
                        });
                    } else if (existingUsers.length > 0) {
                        return res.send({
                            success: false,
                            message: 'Error 1061: Username taken'
                        });
                    }
                    User.updateOne({_id: user._id}, {$set: updates}, (err, docs) => {
                        if (err) {
                            return res.send({
                                success: false,
                                message: 'Error 1162: Server error'
                            });
                        }
                        return res.send({
                            success: true,
                            message: 'successfully updated ' + username
                        });
                    });
                });

            }
            else{
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
            }

        });
    });

    app.post('/api/images/profile', parser.single("image"), (req, res) => {
         // console.log(req); // to see what is returned to you
        const {username, token} = req.body;
        verifySession(token, username, res, (user) =>{
            User.findOneAndUpdate({_id: user._id},
                {$set: {'profile_image.public_id': req.file.public_id, 'profile_image.url': req.file.url }},
                (err, docs) => {
                    cloudinary.v2.uploader.destroy(user.profile_image.public_id);
                    res.end();
                })
        });
    });

    app.post('/api/images/review', parser.single("image"), (req, res) => {
        // console.log(req.body); // to see what is returned to you
        const {username, token, reviewid} = req.body;
        verifySession(token, username, res, (user) =>{
            Review.findOneAndUpdate({_id: reviewid, reviewer: user._id},
                {$push: {
                    photos: {
                        public_id: req.file.public_id,
                        url: req.file.url
                    }
                }},
                (err, docs) => {
                    res.end();
                })
        });
    });

    app.get('/api/reviews/locations', function(req, res){
        Locations
            .findOne()
            .then(doc => {
                if (doc === null) {
                    let newDoc = new Locations();
                    res.json([]);
                }
                else{
                    res.json(doc.locations);
                    res.end();
                }
                
            });
    });

    app.get('/api/account/logout', function(req, res)  {
        let {headers} = req;
        let {token, username} = headers;
        verifySession(token, username, res, (user)=>{
            UserSession.findOneAndDelete(
                {
                    _id: token,
                    user: user._id
                },
                (err) =>{
                    // console.log("deleted?", err);
                }
            )
        })

    });
    // app.get('/api/reviews/findReview', (req, res) => {
    //     const {headers} = req;
    //     const {token, username, restName} = headers;
    //     console.log(token, username, restName);
    //     verifySession(token, username, res, (user)=> {
    //         Restaurant.findOne({name: restName},
    //             (err, rest) =>{
    //                 Review.findOne(
    //                     {
    //                         reviewer: user._id,
    //                         restaurant: rest._id
    //                     },
    //                     (err, doc) => {
    //                         console.log("err", err, "\n\n doc", doc);
    //                         if(err){
    //                             return res.end();
    //                         }
    //                         return res.send(doc);
    //                     }
    //                 )
    //             });
    //
    //     });
    //
    // })

    app.get('/api/reviews/findReview', (req, res) => {
        const {headers} = req;
        const {token, username, restname} = headers;
        // console.log(token, username, restname);

        verifySession(token, username, res, (user)=> {
            Restaurant.findOne({name: restname},
                (err, rest) => {
                    if (err || !rest) {
                        return res.end;
                    }
                    Review.findOne(
                        {
                            reviewer: user._id,
                            restaurant: rest._id
                        },
                        (err, doc) => {
                            // console.log("err", err, "\n\n doc", doc);
                            if (err) {
                                return res.end();
                            }
                            return res.send(doc);
                        }
                    )
                });

        });

        // verifySession(token, username, res, (user)=> {
        //     Review.findOne(
        //         {
        //             'reviewer.username': username,
        //             'restaurant.name': restname
        //         },
        //         (err, doc) => {
        //             console.log("err", err, "\n\n doc", doc);
        //             if(err){
        //                 return res.end();
        //             }
        //             return res.send(doc);
        //         }
        //     )
        // });

    })
};



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
                // console.log("sessions:", sessions);
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
            message: 'Error 1200: illigal username '+body.reviewer
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
    // at least 3 chars long
    // allowed:
    // letters
    // numbers
    // ! @ !@#$%^&*()
    return str.match("^[A-Z, .!@#$%^\\&\\*\\(\\)a-z0-9]{3}[A-Z, .!@#$%^\\&\\*\\(\\)a-z0-9]*");
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
    if(params.location){
        filter.location = {
            "$regex": params.location,
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

    return filter;
}

var ratings_dict = {
    overall: {
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
    Restaurant.updateOne({_id: id}, {$set: {average_ratings: ratings, review_count: len}}, (err, docs) => {
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
        var closeness = 0;
        if(distance){
            closeness = 1/distance
        }

        let rating = rest.average_ratings.overall;
        // let finalScore = 5*(100-distanceVsScore) * rating - distanceVsScore * distance;
        let finalScore = 5*distanceVsScore * rating - (100-distanceVsScore) * distance;

        // console.log("calculating:", "rest:", rest.lon, rest.lat, "user:", user.lon, user.lat, "d/r/score:", distance, rating, finalScore);
        return finalScore;
    };
    var sorter = (a,b) => score(b)-score(a);
    return docs.sort(sorter);
}

function getDistance(pointA, pointB){
    if(!pointA.lon || pointA.lon === 0 ||
        !pointA.lat || pointA.lat === 0 ||
        !pointB.lon || pointB.lon === 0 ||
        !pointB.lat || pointB.lat === 0){
        return false;
    }

    return getDistanceFromLatLonInKm(pointA.lat, pointA.lon, pointB.lat, pointB.lon);
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
};


async function updateLocations(currLocation) {
    Locations
        .findOne()
        .then(doc => {
            if (doc === null) {
                let newDoc = new Locations();
                newDoc.locations.push(currLocation);
                newDoc.save(_handleError);
            }
            else if (!doc.locations.includes(currLocation)) {
                doc.locations.push(currLocation);
                doc.save(_handleError);
            }
        });
}

let _handleError = function(err){
    if (err) return console.log(err);
};

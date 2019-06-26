let User = require('../model/user');
let UserSession = require('../model/userSession');
let Review = require('../model/Review');
let Restaurant = require('../model/Restaurant');

module.exports = (app) => {
    app.post('/api/reviews/uploadReview', function(req, res) {
        const {body} = req;
        const err = verifyAllReviewFields(res, body);
        if(err){
            return err;
        }
        console.log(body);
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
        const {body} = req;

        let {params, sortby} = body;
        Restaurant.find(paramsToFilter(params), (err, docs)=>{
            if(err){
                return res.send({
                    success: false,
                    message: 'Error 1130: Server error'
                });
            }
            return res.send(docs);
        })
    });
    app.get('/api/account/viewUser', function(req, res) {
        //TODO
    });
    app.get('/api/account/viewRestaurant', function(req, res) {
        //TODO
    });
    app.get('/api/account/updateDetails', function(req, res) {
        // verify user
        //TODO
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
            filter.average_ratings[key] = {
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
    console.log('updating ratings to:', id, ratings);
    Restaurant.updateOne({_id: id}, {$set: {average_ratings: ratings}}, (err, docs) => {
        return;
        // only works when there is a callback
        // otherwise it does not update
        // it does work to use:
        // ratings["average_ratings"+key] on setting, and passing {$set: ratings}
    });

}


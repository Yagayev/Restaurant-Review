let User = require('../model/user');
let UserSession = require('../model/userSession');


module.exports = (app) => {
    // console.log("signin: ", app);
    app.post('/api/account/signup', function(req, res) {

        const {body} = req;
        const {
            username,
            password
        } = body;
        console.log("signup serversid: username:", username, "password:",password, "body:", body.username, body['password']);
        if(!username){
            return res.send({
                success: false,
                message: 'Error 1001: no username'
            })
        }
        if(!password){
            return res.send({
                success: false,
                message: 'Error 1002: no password'
            })
        }

        User.find({
            username: username
        }, (err, existingUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error 1003: Server error'
                });
            } else if (existingUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error 1004: Username taken'
                });
            }
            // Save the new user
            const newUser = new User();
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
            console.log("saving user:", newUser);
            newUser.save((err, seesion) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error 1005: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Successfully signed up',
                    token: seesion.id
                });

            });
        });
        // next();
    });

    app.post('/api/account/login', function(req, res)  {
        const {body} = req;
        const {
            username,
            password
        } = body;
        if(!username){
            return res.send({
                success: false,
                message: 'Error 1006: no username'
            })
        }
        if(!password){
            return res.send({
                success: false,
                message: 'Error 1007: no password'
            })
        }

        User.find({
            username: username
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error 1008: Server error'
                });
            } else if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error 1009: Username does not exist'
                });
            }
            let user = users[0];
            if (!user.validPassword(password)){
                return res.send({
                    success: false,
                    message: 'Error 1010: Wrong password'
                });
            }

            var userSession = new UserSession();
            userSession.user = user.id;
            userSession.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error 1011: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Successfully logged in',
                    token: user.id
                });
            });

        });
        // next();
    });

    app.post('/api/account/verify', (req, res, next) => {
        let { query } = req;
        let { token } = query;

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) =>{
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error 1012: Server error'
                });
            }
            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error 1013: Not a valid session'
                });
            }
            return res.send({
                success: true,
                message: "The session is valid"
            });
        });
        next();
    });

    app.post('/api/account/logout', function(req, res, next)  {
        let { query } = req;
        let { token } = query;
        //TODO correct this to findOneAndDelete
        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        },
        {
            $set: {isDeleted: true}
        },
        null,
        (err, sessions) =>{
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error 1014: Server error'
                });
            }
            return res.send({
                success: true,
                message: "The session is valid"
            });
        });
        next();
    });

};

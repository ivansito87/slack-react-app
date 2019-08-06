const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const authWare = require("../../middleware/authware");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = function (app) {

    app.post("/user/register", function (req, res) {
        const requiredFields = ['email', 'password', 'first_name', 'last_name'];
        const missingField = requiredFields.find(field => !(field in req.body));
    
        if (missingField) {
            return res.status(422).json({
                code: 422,
                reason: 'ValidationError',
                message: 'Missing field',
                location: missingField
            });
        }

        const explicityTrimmedFields = ['email', 'password'];
        const nonTrimmedField = explicityTrimmedFields.find(
            field => req.body[field].trim() !== req.body[field]
        );

        if (nonTrimmedField) {
            return res.status(422).json({
                code: 422,
                reason: 'ValidationError',
                message: 'Cannot start or end with whitespace',
                location: nonTrimmedField
            });
        }

        User.findOne({email:req.body.email})
        .then(dbuser =>{
            console.log("from db user", dbuser);
            if(dbuser){
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Email already taken',
                    location: 'email'
                });
            }
            return Promise.resolve(124);
        })
        .then( function(result) {
            return  User.create(req.body);
        })
        .then(function (result) {
            res.json({message: "user created successfull at database!"});
        }).catch(function (err) {
            res.status(500).json({error: err.message});
        });

        
    });

    app.post("/user/login", function (req, res) {
        const {email, password} = req.body;
        User.findOne({email: email}).then(function (dbUser) {
            console.log("dbUser", dbUser);
            if (!dbUser) return res.status(401).json({message: "email or password is incorrect."});
            if (dbUser.comparePassword(password)) {
                const token = jwt.sign({
                    data: dbUser._id
                }, SECRET_KEY);
                res.json({
                    id: dbUser._id,
                    first_name: dbUser.first_name,
                    last_name: dbUser.last_name,
                    email: dbUser.email,
                    token: token
                });
            } else {
                res.status(401).json({message: "email or password is incorrect."});
            }
        }).catch(function (error) {
            console.log("server login error")
            res.json({error: error.message});
        })
    });


    app.get("/user/all", function (req, res) {
        User.find({}).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/user/:email", function (req, res) {
        console.log(req.params.email);
        User.findOne({email: req.params.email}).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/api/protected", authWare, function (req, res) {
        const user = req.user;
        res.json({message: user.name + ", you should only see this if you're authenticated."});
    });

    app.get("/api/public", function (req, res) {
        res.json({
            message: "This is just boring, public data."
        });
    });

    app.get("/user/logout", function (req, res) {
        // req.logout(); // <--- we will recieve the server from the client on the req.body
        res.end();
    });

};

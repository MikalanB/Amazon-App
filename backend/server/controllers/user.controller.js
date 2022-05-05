const User = require('../models/user.model');
require('dotenv').config();
const jwt = require("jsonwebtoken");
console.log("waaazaaa")

module.exports.findAll = (req, res) => {
    User.find({})
        .populate("order_id")
        .then(results => res.json(results))
        .catch(err => res.status(400).json({
            message: "that didn't work!", err
        }))
}

module.exports.createUser = (req, res) => {
    User.find({email:req.body.email})
    .then(userEmail=>{
        console.log("This is a new user", userEmail)
        if(userEmail.length ===0){ //this means the email is not yet taken and we can create a user with this email
            User.create(req.body)
            .then(user => {
                //when the .then() happens that means taht the user from the form was successsfully created and is stored in that variable "user" which has info about the user that was just put into the db, including the field _id
                const userToken= jwt.sign({
                    id: user._id,
                    firstName: user.firstName
                }, process.env.SECRET_KEY);
        
                //respond with a cookie called "usertoken" which contains the JWT from above called userTokenJWT AND also respond with json with info abou the user who just got created
                res
                    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                        httpOnly: true
                    })
                    .json({ msg: "success!", user: user });
            })
            .catch(err => res.json(err));
        }else{
            //else --> the email is already taken so we will send back an error message
            res.json({errors: {email:{message:"Email is taken!"}}})
        }
    })
    .catch(err=>console.log("errr!", err))


}

module.exports.findOne = (req, res) => {
    User.findOne({_id: req.params._id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({
            message: "that didn't work!", err
        }))
}
module.exports.deleteOne = (req, res) => {
    User.deleteOne({_id: req.params._id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({
            message: "that didn't work!", err
        }))
}

module.exports.updateOne = (req, res) => {
    User.updateOne({_id: req.params._id}, req.body)
        .then(results => res.json(results))
        .catch(err => res.status(400).json({
            message: "that didn't work!", err
        }))
}

module.exports.login = (req, res) => {
    login = async(req, res) => {
        const user = await User.findOne({ email: req.body.email }); //see if the user exists in db

        if(user === null) {
            // email not found in users collection
            return res.json({error: "User not found. Who YOU?!"})
        }
    
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
    
        if(!correctPassword) {
            // password wasn't a match!
            return res.json({error: "Password is incorrect!"})
        }
    
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id,
            firstName: user.firstName
        }, process.env.SECRET_KEY);
    
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie("usertoken");
    res.json({ msg: "success!" });
}

module.exports.getLoggedInUser = (req, res) => {
    console.log("getting logged in user!!")
    //use the info stored in the cookie to get the id of the logged in user and query the db to find a user with that id, and return with info about the logged in user
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
    // decodedJWT.payload.id
    console.log(decodedJWT)
    User.findOne({_id: decodedJWT.payload.id })
        .then(foundUser=>{
            res.json({results: foundUser})
        })
        .catch(err=>{
            res.json(err)
        })
}

module.exports.findOrders = (req, res) => {
    User.find({order_id: req.params.order_id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({ message: "Unable to find any orders."}))
}
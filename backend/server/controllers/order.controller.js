const Order = require('../models/order.model');

module.exports.findAll = (req, res) => {
    Order.find({})
        .populate("user_id")
        .then(results => res.json(results))
        .catch(err => res.status(400).json({
            message: "that didn't work!", err
        }))
}

module.exports.createOrder = (req, res) => {
    Order.create(req.body)
        .then(results => res.json(results))
        .catch(err => res.status(400).json({ message: "Unable to create order in database."})) 
}

module.exports.findOne = (req, res) => {
    Order.findOne({_id: req.params._id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({
            message: "that didn't work!", err
        }))
}
module.exports.deleteOne = (req, res) => {
    Order.deleteOne({_id: req.params._id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({
            message: "that didn't work!", err
        }))
}

module.exports.updateOne = (req, res) => {
    Order.updateOne({_id: req.params._id}, req.body)
        .then(results => res.json(results))
        .catch(err => res.status(400).json({
            message: "that didn't work!", err
        }))
}

module.exports.findUserOrders = (req, res) => {
    Order.find({user_id: req.params.user_id})
            .populate("user_id")
            .then(results => res.json(results))
            .catch(err => res.status(400).json({ message: "Unable to find any orders."}))
}
const OrderController = require('../controllers/order.controller');

module.exports = app => {
    app.get("/api/orders/all", OrderController.findAll);
    app.post("/api/orders/create", OrderController.createOrder)
    app.get("/api/orders/:_id", OrderController.findOne)
    app.delete("/api/orders/:_id", OrderController.deleteOne)
    app.put("/api/orders/:_id", OrderController.updateOne)
}
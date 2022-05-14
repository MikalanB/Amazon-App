const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get("/api/users/all", UserController.findAll);
    app.post("/api/users/create", UserController.createUser)
    app.post("/api/users/login", UserController.login)
    app.get("/api/users/getLoggedInUser", authenticate, UserController.getLoggedInUser)
    app.get("/api/users/logout", UserController.logout)
    app.put("/api/users/:_id", UserController.updateOne)
    // app.get("/api/users/:_id", UserController.findOne)
    // app.delete("/api/users/:_id", UserController.deleteOne)

    // show all the orders for a user
    app.get("/api/users/orders/:order_id", UserController.findOrders);
}
const StripeController = require("../controllers/stripe.controller");

module.exports = app => {
    app.post("/api/payment", StripeController.payment)

}
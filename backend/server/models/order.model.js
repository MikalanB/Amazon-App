const mongoose = require('mongoose');
// const conn1 = mongoose.createConnection("mongodb://localhost/orders", {useNewUrlParser: true, useUnifiedTopology: true});
// conn1.on("error", err => console.log("Unable to establish a connection"))
// conn1.once("open", () => console.log("Connection established"))

const OrderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: [true, "An order ID has to be provided to tie the order information to."]
    },

    order_date: {
        type: Date,
        default: Date.now()
    },

    items_ordered: {
        type: Array,
    },

    deliveryAddress: {
        type: Array,
        required: [true, "A Delivery Address has to be provided."]
    },

    order_total: {
        type: String,
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})



module.exports = mongoose.model("Order", OrderSchema)
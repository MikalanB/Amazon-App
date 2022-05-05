const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:  {
        type: String,
        required: [true, "You need to provide a title."],
        minLength: [3, "Title need to be atleast 3 characters"]
    },
    price: {
        type: Number,
        // required: [true, "You have to provide a price of the product."],
        minLength: [1, "Price need to be more than $1"]
    },
    description: {
        type: String,
        // required: [true, "You need to provide a description"],
        minLength: [10, "Description need to be at least 10 characters long"]
    }, 
    brand: {
        type: String,
        // required: [true, "You need to provide a brand name"],
        minLength: [2, "Brand name need to be at least 2 characters long"]
    }, 

    category: {
        type: String,
        required: [true, "You need to provide a category"],
        minLength: [2, "Category need to be at least 2 characters long"]
    },

    productImgURL:  {
        type: Array,
        required: [true, "You need to provide a product image URL"],
        minLength: [2, "You need to provide at least 2 images!"]
    },

    rating: {
        type: Number,
    },

    prime: {
        type: Boolean,
        // required: [true, "You need to establish if this will be Prime Eligible or Not"]
    }, 
    quantity: {
        type: Number,
        required: [true, "An amount is required"],
        default: 0
    }
}, {timestamps: true})

// const Product = mongoose.model("Product", ProductSchema)
module.exports = mongoose.model("Product", ProductSchema)
const mongoose = require('mongoose');
const WishlistSchema = new mongoose.Schema({
    
    title: {
    type: String,
    required: true,
    
    },
    author: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },

});

const Wishlist = mongoose.model("Wishlist", WishlistSchema)
module.exports = Wishlist;
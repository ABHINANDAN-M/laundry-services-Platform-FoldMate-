const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    washer_id : {
        type : mongoose.Schema.ObjectId,
        ref : 'Washer',
        required : true
    },
    user_id : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    order_id : {
        type : mongoose.Schema.ObjectId,
        ref : 'Order',
        required : true
    },
    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5

    }, 
    comment :{
        type : String,
        default : ''
    },
    image : { //optional : user-uploded image with review
        type : [String],
        default: []
    },
    isVerified : { 
        type : Boolean,
        default : false  //set to true after checking purchase history
    }

}, {
    timestamps : true
});

const ReviewModel = mongoose.model('Review',reviewSchema);
module.exports = ReviewModel;
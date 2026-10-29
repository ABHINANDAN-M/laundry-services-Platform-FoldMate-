const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address_line : {
        type : String,
        default : ""
    },
    city :{
        type : String, 
        deafult : ""
    },
    state : {
        type : String,
        deafult : ""
    },
    pincode : {
        type: String,   
    },
    country : {
        type :String,
    },
    mobile : {
        type : Number,
        default : null
    }
},{
    timestamps : true
})

const AddressModel = mongoose.model("Address", addressSchema)
module.exports = AddressModel
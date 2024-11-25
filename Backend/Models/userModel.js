const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    contactNumber:{
        type:String,
        required:true
    },
    URL: { type: String, default: '' },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'listings' }],
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'listings' }],
});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;
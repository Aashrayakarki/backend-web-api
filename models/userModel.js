const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fname:{
        type: String,
        required: true,
    },

    lname:{
        type: String,
        required: true,
    },

    phone:{
        type: Number,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
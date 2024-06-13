const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true
    },
    exerciseTime: {
        type: Number,
        required: true,
    },
    exerciseCalories: {
        type: Number,
        required: true,
    },
    exerciseLevel: {
        type: String,
        required: true,
    },
    exerciseVideo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Exercise = mongoose.model('exercises', exerciseSchema)
module.exports= Exercise;


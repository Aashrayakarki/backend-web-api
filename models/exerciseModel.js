const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true
    },
    exerciseTime: {
        type: String,
        required: true,
    },
    exerciseCalories: {
        type: String,
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
})

const Exercise = mongoose.model('exercises', exerciseSchema)
module.exports= Exercise;


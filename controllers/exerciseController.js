const Exercise = require('../models/exerciseModel');
const path = require('path');
const fs = require('fs');

const createExercise = async (req, res) => {    


    console.log(req.body);
    console.log
    const { exerciseName, exerciseTime, exerciseCalories, exerciseLevel } = req.body;
    

    if (!exerciseName || !exerciseTime || !exerciseCalories || !exerciseLevel){
        return res.status(400).json({
            "success": false,
            "message": "Please enter all the fields"
        });
    }


    // validate if there is video
    if (!req.files || !req.files.exerciseVideo) {

        return res.status(400).json({
            "success": false,
            "message": "Please upload a video!!"
        });
    }

    const {exerciseVideo} = req.files;









    //upload video
    //1. Generate new video name
    const videoName = `${Date.now()}-${exerciseVideo.name}`

    //2. Make an upload path (/path/upload - directory)
    const videoUploadPath = path.join(__dirname, `../public/products/${videoName}`);

    //3. Move to that directory (await, try-catch)
    try {
        await exerciseVideo.mv(videoUploadPath)

        //Save to database
        const newExercise = new Exercise({
            exerciseName: exerciseName,
            exerciseCalories: exerciseCalories,
            exerciseTime: exerciseTime,
            exerciseLevel: exerciseLevel,
            exerciseVideo: videoName
        })
        const exercise = await newExercise.save()
        res.status(201).json({
            "success": true,
            "message": "Exercise created successfully",
            "data": exercise
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
};

//Fetch all exercises
const getAllExercises = async (req, res) => {
    try {
        const allExercises = await Exercise.find({})
        res.status(200).json({
            "success": true,
            "message": "All exercises fetched successfully",
            "data": allExercises
        })
    } catch (error) {
            console.log(error)
            res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
}

module.exports = {
    createExercise,
    getAllExercises
}
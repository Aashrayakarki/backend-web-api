const Exercise = require('../models/exerciseModel');
const path = require('path');
const fs = require('fs');

const createExercise = async (req, res) => {    
    console.log(req.body);
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

//Fetch single exercise
const getSingleExercise = async (req, res) => {
    const exerciseId = req.params.id;
    try {
        const singleExercise = await Exercise.findById(exerciseId)
        if (!singleExercise) {
            return res.status(400).json({
                "success": false,
                "message": "Product not found"
            })
        }

        res.status(201).json({
            "success": true,
            "message": "Product fetched successfully",
            "data": singleExercise
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

//delete exercise
const deleteExercise = async (req, res) => {
    try {
        await Exercise.findByIdAndDelete(req.params.id)
        res.status(201).json({
            "success": true,
            "message": "Exercise deleted successfully"
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

const updateExercise = async (req, res) => {
    try {
        // if there is image
        if (req.files && req.files.exerciseVideo) {
            // destructuring
            const { exerciseVideo } = req.files;
            // upload image to /public/products folder
            // 1. Generate new image name (abc.png) -> (213456-abc.png)
            const videoName = `${Date.now()}-${exerciseVideo.name}`
            // 2. Make a upload path (/path/uplad - directory)
            const videoUploadPath = path.join(__dirname, `../public/products/${videoName}`)
            // Move to folder
            await exerciseVideo.mv(videoUploadPath)
            // req.params (id), req.body(updated data - pn,pp,pc,pd), req.files (image)
            // add new field to req.body (productImage -> name)
            req.body.exerciseVideo = videoName; // image uploaded (generated name)
            // if image is uploaded and req.body is assingned
            if(req.body.exerciseVideo){
                // Finding existing product
                const existingExercise = await Exercise.findById(req.params.id)
                // Searching in the directory/folder
                const oldVideoPath = path.join(__dirname, `../public/products/${existingExercise.exerciseVideo}`)
                // delete from filesystem
                fs.unlinkSync(oldVideoPath)
            }
        }
        // Update the data
        const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            success : true,
            message : "Product updated!",
            product :  updatedExercise
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error
        })
    }
}

const paginationExercises = async (req, res) => {
    const pageNo = parseInt(req.query.page) || 1; // Parse page number as an integer
    const resultPerPage = 3; // Number of results per page

    try {
        const totalExercises = await Exercise.countDocuments(); // Get the total number of exercises
        const allExercises = await Exercise.find({})
            .skip((pageNo - 1) * resultPerPage)
            .limit(resultPerPage);

        // Check if the page number is valid
        if (allExercises.length === 0 && pageNo !== 1) {
            return res.status(400).json({
                success: false,
                message: "No exercises found",
            });
        }

        // Send response with pagination data
        res.status(200).json({
            success: true,
            message: "Exercises fetched successfully",
            data: allExercises,
            pagination: {
                totalExercises: totalExercises,
                currentPage: pageNo,
                totalPages: Math.ceil(totalExercises / resultPerPage),
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
};

module.exports = {
    createExercise,
    getAllExercises,
    getSingleExercise,
    updateExercise,
    deleteExercise,
    paginationExercises
}
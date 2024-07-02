const path = require('path');
const fs = require('fs');
const Meal = require('../models/mealModel');

const createMeal = async (req, res) => {    


    console.log(req.body);
    console.log
    const { mealName, mealTime, mealCalories} = req.body;

    if (!mealName || !mealTime || !mealCalories){
        return res.status(400).json({
            "success": false,
            "message": "Please enter all the fields"
        });
    }

    // validate if there is video
    if (!req.files || !req.files.mealImage) {

        return res.status(400).json({
            "success": false,
            "message": "Please upload a video!!"
        });
    }

    const {mealImage} = req.files;

    const imageName = `${Date.now()}-${mealImage.name}`

    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`);

    try {
        await mealImage.mv(imageUploadPath)

        const newMeal = new Meal({
            mealName: mealName,
            mealCalories: mealCalories,
            mealTime: mealTime,
            mealImage: mealImage
        })
        const meal = await newMeal.save()
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

module.exports = {
    createMeal,
}
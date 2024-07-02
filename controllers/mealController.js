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

const getAllMeals = async (req, res) => {
    try {
        const allMeals = await Meal.find({})
        res.status(200).json({
            "success": true,
            "message": "All meals fetched successfully",
            "data": allMeals
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

const getSingleMeal = async (req, res) => {
    const mealId = req.params.id;
    try {
        const singleMeal = await Meal.findById(mealId)
        if (!singleMeal) {
            return res.status(400).json({
                "success": false,
                "message": "Meal not found"
            })
        }

        res.status(201).json({
            "success": true,
            "message": "Meal fetched successfully",
            "data": singleMeal
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

const deleteMeal = async (req, res) => {
    try {
        await Meal.findByIdAndDelete(req.params.id)
        res.status(201).json({
            "success": true,
            "message": "Meal deleted successfully"
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

const updatedMeal = async (req, res) => {
    try {
        if (req.files && req.files.mealImage) {
            const { mealImage } = req.files;

            const imageName = `${Date.now()}-${mealImage.name}`

            const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)

            await mealImage.mv(imageUploadPath)

            req.body.mealImage = imageName; 

            if(req.body.mealImage){
                const existingMeal = await Meal.findById(req.params.id)
                const oldImagepath = path.join(__dirname, `../public/products/${existingMeal.mealImage}`)

                fs.unlinkSync(oldImagepath)
            }
        }
        
        const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            success : true,
            message : "Product updated!",
            product :  updatedMeal
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
    
};

module.exports = {
    createMeal,
    getAllMeals,
    getSingleMeal,
    deleteMeal,
    updateMeal
}
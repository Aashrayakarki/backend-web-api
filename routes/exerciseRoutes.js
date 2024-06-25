const express = require('express');
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");

// POST request to create exercise
router.post('/create', exerciseController.createExercise);

// GET request to fetch all exercises
router.get('/get_all_exercises', exerciseController.getAllExercises);

// GET request to fetch single exercise
router.get('/get_exercise/:id', exerciseController.getSingleExercise);

module.exports = router;
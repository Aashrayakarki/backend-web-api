const express = require('express');
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");
const { adminGuard, authGuard } = require('../middleware/authGuard');

// POST request to create exercise
router.post('/create', exerciseController.createExercise);

// GET request to fetch all exercises
router.get('/get_all_exercises', exerciseController.getAllExercises);

// GET request to fetch single exercise
router.get('/get_exercise/:id', exerciseController.getSingleExercise);

// PUT request to update exercise
router.put('/update/:id', adminGuard, exerciseController.updateExercise);

// DELETE request to delete exercise
router.delete('/delete/:id', adminGuard, exerciseController.deleteExercise);

// Pagination
router.get('/pagination_exercise', exerciseController.paginationExercises);

module.exports = router;
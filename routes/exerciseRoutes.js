const express = require('express');
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");
const { adminGuard, authGuard } = require('../middleware/authGuard');

// POST request to create exercise
router.post('/create', exerciseController.createExercise);

// GET request to fetch all exercises
router.get('/get_all_exercises', authGuard, exerciseController.getAllExercises);

// GET request to fetch single exercise
router.get('/get_exercise/:id', authGuard, exerciseController.getSingleExercise);

// PUT request to update exercise
router.put('/update_exercise/:id', adminGuard, exerciseController.updateExercise);

// DELETE request to delete exercise
router.delete('/delete/:id', exerciseController.deleteExercise);

// Pagination
router.get('/pagination_exercises', exerciseController.paginationExercises);

module.exports = router;
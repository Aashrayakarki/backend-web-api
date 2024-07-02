const router = require("./exerciseRoutes");
const mealController = require("../controllers/mealController");

//POST request to create meal
router.post('/create/meal', mealController.createMeal);

//GET request to fetch all meals
router.get('/get_all_meals', mealController.getAllMeals);

//GET request to fetch single meal
router.get('/get_meal/:id', mealController.getSingleMeal);

//PUT request to update meal
router.put('/update_meal/:id', mealController.updateMeal);

//DELETE request to delete meal
router.delete('/delete_meal/:id', mealController.deleteMeal);

//Pagination
router.get('/pagination_meals', mealController.paginationMeals);
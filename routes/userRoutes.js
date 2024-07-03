const router = require('express').Router();
const userController = require('../controllers/userController.js');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/get_single_user/:_id', userController.getSingleUser);

module.exports = router;
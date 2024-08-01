const router = require('express').Router();
const userController = require('../controllers/userController.js');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/get_single_user/:id', userController.getSingleUser);
router.put('/update_profile/:id', userController.updateUser);
router.post('/forgot_password',userController.forgotPassword)
router.post('/verify_otp',userController.verifyOtpAndSetPassword)

module.exports = router
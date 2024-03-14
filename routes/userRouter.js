const express = require ('express');
const { loginController,registerController } = require('../controllers/userController');

const router = express.Router();

router.post('/logIn',loginController);
router.post('/userRegister',registerController);


module.exports = router
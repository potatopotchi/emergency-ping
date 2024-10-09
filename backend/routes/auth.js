const express = require('express');
const { signUpUser, signInUser, refreshUserToken } = require('../controllers/authController');


const router = express.Router();

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.post('/refresh', refreshUserToken);


module.exports = router;

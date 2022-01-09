const express = require('express');
const router = express.Router();

const { signUp, logIn, logOut, refreshToken } = require('../controllers/auth.controller');

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);
router.post('/refresh-token', refreshToken);

module.exports = router;
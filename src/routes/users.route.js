var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users.controller')

router.get('/', auth.checkAuth, getUsers);
router.get('/:id', auth.checkAuth, getUserById);
router.post('/', auth.checkAuth, createUser);
router.put('/:id',  auth.checkAuth, updateUser);
router.delete('/:id', auth.checkAuth, deleteUser);

module.exports = router;

var express = require('express');
var router = express.Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users.controller')

router.get('/:id', getUserById);
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

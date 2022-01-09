const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const { getTypes, getTypeById, createType, updateType, deleteType } = require('../controllers/types.controller');

router.get('/', auth.checkAuth, getTypes);
router.get('/:id', auth.checkAuth, getTypeById);
router.post('/', auth.checkAuth, createType);
router.put('/:id', auth.checkAuth, updateType);
router.delete('/:id', auth.checkAuth, deleteType);

module.exports = router;
const express = require('express');
const router = express.Router();

const { getTypes, getTypeById, createType, updateType, deleteType } = require('../controllers/types.controller');

router.get('/', getTypes);
router.get('/:id', getTypeById);
router.post('/', createType);
router.put('/:id', updateType);
router.delete('/:id', deleteType);

module.exports = router;
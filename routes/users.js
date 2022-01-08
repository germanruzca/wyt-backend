var express = require('express');
var router = express.Router();

const User = require('../src/database/models/users.model');

/* GET users listing. */
router.post('/', async function(req, res, next) {

  const { name } = req.body;
  try {
    const result = await User.create({"nombre": name});

    res.json(result);
  } catch (error) {
    console.log(error)
  }
});

router.get('/',async function (req, res, nect) {
  try {
    const result = await User.findAll();
    res.json(result);
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;

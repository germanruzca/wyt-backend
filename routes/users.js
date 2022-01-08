var express = require('express');
var router = express.Router();

const User = require('../src/models/users.model');

/* GET users listing. */
router.post('/', async function(req, res, next) {

  const  user = req.body;
  user.slug = ``;
  try {
    const result = await User.create(user);

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

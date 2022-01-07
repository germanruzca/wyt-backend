var express = require('express');
var router = express.Router();


router.get('/:post', (req,res, next) => {
  const { id, name } = req.body;
  const { post } = req.params;

  res.send(`Hola ${name}!, con el id ${id} y el post ${post}`);
})

module.exports = router;
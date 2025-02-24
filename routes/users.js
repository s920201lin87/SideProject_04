var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('請按/account 查看 清單');
  next();
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/account', function(req, res, next) {
  res.render('list');
});
router.get('/account/create',(req,res,next)=>{
  res.render('create')
})

module.exports = router;
